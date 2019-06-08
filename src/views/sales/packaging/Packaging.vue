<template>
  <div id="Package">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12>
          <v-toolbar card color="white">
            <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Buscar..."
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
            ></v-text-field>
            <v-btn
              color="success"
              @click="isEdit = false; clearInputs(); basic.dialog = true; setTracking()"
              flat
            >
              <i class="fa fa-plus"></i>&nbsp;Agregar
            </v-btn>
          </v-toolbar>
          <v-tabs v-model="selectedTab">
            <v-tab ripple href="#tab-1">Pendientes</v-tab>
            <v-tab ripple href="#tab-2">Enviados</v-tab>
            <v-tab ripple href="#tab-3">Completados</v-tab>
          </v-tabs>
          <v-tabs-items v-model="selectedTab">
            <v-tab-item id="tab-1">
              <v-data-table
                :headers="complex.headers"
                :search="search"
                :items="complex.items"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                item-key="name"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.tracking }}</td>
                  <td>{{ props.item.status | statusFilter }}</td>
                  <td>{{ props.item.type | typeFilter }}</td>
                  <td>{{ props.item.out_date }}</td>
                  <td>{{ props.item.out_place }}</td>
                  <td>{{ props.item.arriving_date }}</td>
                  <td>{{ props.item.arriving_place }}</td>
                  <td>
                    <v-btn
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="primary"
                      small
                      @click="edit( props.item.id )"
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="primary"
                      small
                      @click="packagelist( props.item.id )"
                    >
                      <v-icon style="margin: 0px 5px 0px 40px;">printer</v-icon>
                    </v-btn>
                    <v-btn
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="red"
                      small
                      @click="remove( props.item.id )"
                      v-if="props.item.tracking_.length == 0"
                    >
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-tab-item>
            <v-tab-item id="tab-2">Diseño 2</v-tab-item>
            <v-tab-item id="tab-3">Diseño 3</v-tab-item>
          </v-tabs-items>

          <v-progress-circular
            indeterminate
            :size="40"
            v-if="generalLoader == true"
            style="position: fixed; bottom: 10%; right: 5%;"
            color="primary"
          ></v-progress-circular>
          <v-dialog v-model="basic.dialog" persistent max-width="1024px">
            <v-card>
              <v-card-title>
                <v-layout row>
                  <v-flex lg-10 xs-10 md-10>
                    <span class="headline" v-if="isEdit == false">Nuevo Seguro</span>
                    <span class="headline" v-if="isEdit">Editar Seguro</span>
                  </v-flex>
                  <v-flex lg-2 xs-2 md-2 style="text-align: right">
                    <v-progress-circular
                      indeterminate
                      v-if="modalLoader == true"
                      :size="30"
                      color="primary"
                    ></v-progress-circular>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <v-divider></v-divider>
              <v-form ref="form">
                <v-card-text style="padding: 10px">
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm4 md4>
                        <v-text-field
                          v-model="tracking"
                          disabled
                          label="Guia Master"
                          :rules="[v => !!v || 'Campo requerido']"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm4 md4>
                        <v-select
                          label="Tipo de paquete"
                          :items="basic.type"
                          v-model="type"
                          :rules="[v => !!v || 'Campo requerido']"
                          item-text="label"
                          item-value="value"
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 sm4 md4>
                        <v-select
                          label="Estado actual"
                          :rules="[v => !!v || 'Campo requerido']"
                          :items="basic.status"
                          v-model="status"
                          item-text="text"
                          item-value="value"
                        ></v-select>
                      </v-flex>

                      <v-flex xs12 sm4 md4>
                        <v-select
                          label="País de salida"
                          :items="basic.countries"
                          v-model="out_place"
                          :rules="[v => !!v || 'Campo requerido']"
                          item-text="value"
                          item-value="value"
                        ></v-select>
                      </v-flex>

                      <v-flex xs12 sm4 md4>
                        <v-select
                          label="País de llegada"
                          :items="basic.countries"
                          v-model="arriving_place"
                          :rules="[v => !!v || 'Campo requerido']"
                          item-text="value"
                          item-value="value"
                        ></v-select>
                      </v-flex>

                      <v-flex xs12 sm4 md4>
                        <v-select
                          label="Oficina de Tealca"
                          :items="basic.tealca_office"
                          v-model="tealca_office"
                          item-text="text"
                          item-value="value"
                        ></v-select>
                      </v-flex>

                      <v-flex xs12 sm6 md6>
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
                              label="Fecha de salida"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="out_date" @input="menu2 = false" locale="es-es"></v-date-picker>
                        </v-menu>
                      </v-flex>

                      <v-flex xs12 sm6 md6>
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
                              label="Fecha de llegada"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="arriving_date"
                            @input="menu1 = false"
                            locale="es-es"
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" @click.native="basic.dialog = false">Cerrar</v-btn>
                  <v-btn
                    color="success"
                    :loading="saveLoader"
                    :disabled="saveLoader"
                    @click="save()"
                  >Guardar</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
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
    <v-icon></v-icon>
  </div>
</template>

<script>
import axios from "@/api/config";
import countriesList from "@/api/paisesymonedas";

export default {
  data() {
    return {
      search: "",
      isEdit: false,
      id: null,
      selectedTab: null,
      value: "",
      type: "",
      arriving_place: "",
      arriving_date: "",
      tracking: "",
      out_date: "",
      status: "",
      tealca_office: "",
      tealca_code: "",
      out_place: "",
      menu1: false,
      menu2: false,
      appEvents: [],
      complex: {
        headers: [
          {
            text: "Guia Master",
            value: "tracking"
          },
          {
            text: "Estado del paquete",
            value: "status"
          },
          {
            text: "Tipo de paquete",
            value: "type"
          },
          {
            text: "Fecha de salida",
            value: "out_date"
          },
          {
            text: "Lugar de salida",
            value: "out_place"
          },
          {
            text: "Fecha de llegada",
            value: "arriving_date"
          },
          {
            text: "Lugar de llegada",
            value: "arriving_place"
          },
          {
            text: "Acciones",
            value: ""
          }
        ],
        items: []
      },
      snackbar: {
        show: false,
        text: "",
        color: "",
        icon: ""
      },
      basic: {
        dialog: false,
        type: [
          { value: "0", label: "Lote" },
          { value: "1", label: "Caja" },
          { value: "2", label: "Paleta" },
          { value: "3", label: "Bulto" }
        ],
        countries: countriesList.pais,
        tealca_office: [
          { value: "1", text: "Oficina Tealca 1" },
          { value: "2", text: "Oficina Tealca 2" },
          { value: "3", text: "Oficina Tealca 3" },
          { value: "4", text: "Oficina Tealca 4" },
          { value: "5", text: "Oficina Tealca 5" },
          { value: "6", text: "Oficina Tealca 6" },
          { value: "7", text: "Oficina Tealca 7" },
          { value: "8", text: "Oficina Tealca 8" },
          { value: "9", text: "Oficina Tealca 9" },
          { value: "10", text: "Oficina Tealca 10" }
        ],
        status: [
          { value: "0", text: "Inicio" },
          { value: "1", text: "En Camino" },
          { value: "2", text: "Finalizado" }
        ]
      },
      saveLoader: false,
      removeLoader: false,
      generalLoader: false,
      modalLoader: false,
      disabled: false
    };
  },
  filters: {
    statusFilter(status) {
      const item_type = {
        0: "Inicio",
        1: "En Camino",
        2: "Finalizado"
      };
      return item_type[status];
    },
    typeFilter(type) {
      const item_type = {
        0: "Lote",
        1: "Caja",
        2: "Paleta",
        3: "Bulto"
      };
      return item_type[type];
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    setTracking() {
      axios.get("package/get-tracking").then(response => {
        this.tracking = response.data.tracking;
      });
    },
    getList() {
      this.generalLoader = true;
      var url = "package";
      if (
        localStorage.getItem("role") == '"2"' ||
        localStorage.getItem("role") == '"3"'
      ) {
        var country = localStorage.getItem("country");
        country = country.replace(/[ '"]+/g, "");
        var url = "package?country=" + country;
      }
      axios
        .get(url)
        .then(response => {
          this.complex.items = response.data.items;
          this.generalLoader = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    remove(id) {
      this.$confirm("¿Realmente quieres eliminar este elemento?").then(res => {
        if (res) {
          this.generalLoader = true;
          axios
            .delete("package/" + id)
            .then(response => {
              this.snackbar = {
                show: true,
                text: response.data.response,
                color: "success",
                icon: "fa fa-check"
              };
              this.getList();
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    edit(id) {
      this.isEdit = true;
      this.basic.dialog = true;
      this.modalLoader = true;
      this.disabled = true;
      axios
        .get("package/" + id)
        .then(response => {
          this.id = response.data.data.id;
          this.tracking = response.data.data.tracking;
          this.arriving_place = response.data.data.arriving_place;
          this.arriving_date = response.data.data.arriving_date;
          this.out_date = response.data.data.out_date;
          this.status = response.data.data.status;
          this.type = response.data.data.type;
          this.tealca_office = response.data.data.tealca_office;
          this.tealca_code = response.data.data.tealca_code;
          this.out_place = response.data.data.out_place;
          this.modalLoader = false;
          this.disabled = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    packagelist(id) {
      window.open(
        "https://www.enviosperuven.com/api/printer-packagelist/" + id,
        "_blank"
      );
    },
    clearInputs() {
      this.type = "";
      this.arriving_place = "";
      this.arriving_date = "";
      this.tracking = "";
      this.out_date = "";
      this.status = "";
      this.tealca_office = "";
      this.tealca_code = "";
      this.out_place = "";
      this.$refs.form.resetValidation();
    },
    save(id = null) {
      if (this.$refs.form.validate()) {
        var data = {
          type: this.type,
          arriving_place: this.arriving_place,
          arriving_date: this.arriving_date,
          tracking: this.tracking,
          out_date: this.out_date,
          status: this.status,
          tealca_office: this.tealca_office,
          out_place: this.out_place
        };
        this.saveLoader = true;
        if (!this.isEdit) {
          axios
            .post("package/", data)
            .then(response => {
              this.snackbar = {
                show: true,
                text: "Seguro agregado con éxito",
                color: "success",
                icon: "fa fa-check"
              };
              this.saveLoader = false;
              this.basic.dialog = false;
              this.name = "";
              this.description = "";
              this.value = "";
              this.getList();
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          axios
            .put("package/" + this.id, data)
            .then(response => {
              this.snackbar = {
                show: true,
                text: "Seguro editado con éxito",
                color: "success",
                icon: "fa fa-check"
              };
              this.saveLoader = false;
              this.getList();
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    }
  }
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>