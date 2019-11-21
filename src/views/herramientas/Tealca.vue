<template>
  <div id="shippingOrder">
    <v-container class="grey lighten-5">
      <v-row no-gutters>
        <v-col cols="12">
          <h4>Selecciona las fechas que deseas obtener información</h4>
        </v-col>
        <v-col cols="12" xs="4">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="out_date"
                :rules="[v => !!v || 'Campo requerido']"
                label="Fecha de Inicio"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="out_date" @input="menu2 = false" locale="es-es"></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" xs="4">
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="arriving_date"
                :rules="[v => !!v || 'Campo requerido']"
                label="Fecha Final"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="arriving_date" @input="menu1 = false" locale="es-es"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" xs="12">
          <v-btn color="success" @click="getOrders()" flat>
            <i class="fa fa-search"></i>&nbsp;
            Buscar
          </v-btn>

          <v-btn color="success" @click="handleDownload()" flat :disabled="this.downloadLoading">
            <i class="fa fa-file-excel"></i>&nbsp;
            Exportar
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" v-if="loading">
          Cargando
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar :timeout="3000" top right :color="snackbar.color" v-model="snackbar.show">
      <p style="margin: 0">
        <i :class="snackbar.icon"></i>
        &nbsp;
        {{ snackbar.text }}
      </p>
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "@/api/config";
import countriesList from "@/api/paisesymonedas";

export default {
  data() {
    return {
      search: "",
      loading: false,
      disabled: false,
      modalLoader: false,
      saveLoader: false,
      admin: true,
      downloadLoading: true,
      selectedTab: null,
      arriving_date: "",
      out_date: "",
      snackbar: {
        show: false,
        text: "",
        color: "",
        icon: ""
      },
      onlyEmail: [
        v => /.+@.+/.test(v) || "Formato de correo electrónico no válido"
      ],
      onlyText: [
        v => !!v || "Campo requerido",
        v => isNaN(v) || "Campo solo debe contener letras"
      ],
      onlyNumbers: [
        v => !!v || "Campo requerido",
        v => !isNaN(v) || "Campo solo debe contener números"
      ],
      basic: {
        dialogClient: false,
        dialogAfiliate: false,
        doc_types: [
          { value: "1", text: "PTP" },
          { value: "2", text: "DNI" },
          { value: "3", text: "Pasaporte" },
          { value: "4", text: "C.E." },
          { value: "5", text: "C.I." }
        ],
        countries: countriesList.pais
      },
      client: {
        id: null,
        shipper: "",
        doc_type: "",
        number: "",
        contact_person: "",
        address: "",
        country: "",
        city: "",
        phone: "",
        email: ""
      },
      afiliated: {
        id: null,
        destination_name: "",
        doc_type: "",
        number: "",
        attention: "",
        address: "",
        country: "",
        city: "",
        phone: "",
        email: ""
      },
      snackbar: {
        show: false,
        text: "",
        color: "",
        icon: ""
      },
      complex: {
        headers: [
          {
            text: "Fecha de recepción",
            value: "fecha"
          },
          {
            text: "Tracking",
            value: "tracking"
          },
          {
            text: "Guia Master",
            value: "package.tracking"
          },
          {
            text: "Remitente",
            value: "clients.shipper"
          },
          {
            text: "Destinatario",
            value: "client_afiliated.destination_name"
          },
          {
            text: "Fecha de salida",
            value: "out_date"
          },
          {
            text: "",
            value: ""
          }
        ],
        items: [],
        itemsenviados: [],
        itemscompletadas: []
      }
    };
  },
  created() {
    //this.getOrders();
  },
  methods: {
    getOrders() {
      var url =
        "ship-order?datestart=" +
        this.out_date +
        "&dateend=" +
        this.arriving_date;
      if (
        localStorage.getItem("role") == '"2"' ||
        localStorage.getItem("role") == '"3"'
      ) {
        var country = localStorage.getItem("country");
        country = country.replace(/[ '"]+/g, "");
        var url = "ship-order";
        this.admin = true;
      }
      this.loading = true;
      axios.get(url).then(response => {
        this.complex.items = response.data.items;
        this.loading = false;
        this.downloadLoading = false;
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = [
          "Fecha",
          "N Tracking - Guia",
          "Ciudad",
          "Nombre y Apellido",
          "DNI/Pasaporte/Cedula",
          "Telefono",
          "Ciudad donde envia",
          "Codigo Tealca Oficina",
          "Peso Peruven",
          "Descripción Encomienda",
          "Total Boleta Dolares",
          "Moneda de Boleta",
          "Total Boleta Seguro",
          "Moneda de Seguro",
          "Nombre y Apellido",
          "Telefono",
          "Cedula",
          "Precio Tealca",
          "Precio Copa"
        ];
        const filterVal = [
          "created",
          "tracking",
          { city: "clients" },
          { shipper: "clients" },
          { number: "clients" },
          { phone: "clients" },
          "tealca_office",
          "tealca_code",
          "actual_weight",
          "productos",
          "total",
          "currency",
          "total_ensurance",
          "currency_ensurance",
          { attention: "client_afiliated" },
          { phone: "client_afiliated" },
          { number: "client_afiliated" },
          "tealca",
          "copa"
        ];
        const data = this.formatJson(filterVal, this.complex.items);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "envios-list"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else if (this.isObject(j)) {
            let val = "";
            Object.keys(j).forEach(function(key) {
              let object = j[key];
              let value = key;
              
              val = v[object][value] + " " + val;
            });
           
            return val;
          } else {
            return v[j];
          }
        })
      );
    },
    isObject(value) {
      return value && typeof value === "object" && value.constructor === Object;
    }
  }
};

</script>

<style scoped>
.hover:hover {
  background: rgb(210, 210, 210);
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid blue;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: blue transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>