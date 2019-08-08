<template>
  <div id="shippingOrder">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12>
                <v-btn color="success" @click="handleDownload()" flat>
                  <i class="fa fa-file-excel"></i>&nbsp;
                  Exportar
                </v-btn>
        </v-flex>
      </v-layout>
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
      disabled: false,
      modalLoader: false,
      saveLoader: false,
      admin: true,
      selectedTab: null,
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
    this.getOrders();
  },
  methods: {
    getOrders() {
      var url = "ship-order";
      if (
        localStorage.getItem("role") == '"2"' ||
        localStorage.getItem("role") == '"3"'
      ) {
        var country = localStorage.getItem("country");
        country = country.replace(/[ '"]+/g, "");
        var url = "ship-order";
        this.admin = true;
      }
      axios.get(url).then(response => {
        this.complex.items = response.data.items;
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
          "Precio Copa",
        ];
        const filterVal = [
          "date",
          "tracking",
          { city: "clients" },
          { shipper: "clients" },
          { number: "clients" },
          { phone: "clients" },
          "tealca_office",
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
</style>