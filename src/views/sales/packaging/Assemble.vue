<template>
  <div id="Assemble">
    <v-container grid-list-md>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">Guia Master</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2">Paquetes</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">Confirmar</v-stepper-step>
          <v-divider></v-divider>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-layout wrap>
              <v-flex lg6 md6 sm12 xs12>
                <v-btn color="info" @click="dialog.selectPackage = true">Seleccionar Guia Master</v-btn>
                <h4 v-if="form.package">Fecha de salida: {{ form.package.out_date }}</h4>
                <h4 v-if="form.package">Destino: {{ form.package.arriving_place }}</h4>
                <h4 v-if="form.package">Fecha de Creación: {{ form.package.created }}</h4>
                <h4 v-if="form.package">Origen: {{ form.package.out_place }}</h4>
                <h4 v-if="form.package">Cantidad de Paquetes: {{ form.package.tracking_.length }}</h4>
                <h4 v-if="form.package">Guia Master: {{ form.package.tracking }}</h4>
              </v-flex>
            </v-layout>

            <v-layout wrap>
              <v-flex lg6 md6 sm12 xs12>
                <v-btn flat disabled>Regresar</v-btn>
                <v-btn color="primary" @click="e1 = 2" :disabled="disabledBtn.modality">Continuar</v-btn>
              </v-flex>
            </v-layout>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-form ref="clientForm" lazy-validation>
              <v-layout wrap row>
                <v-btn color="primary"  @click="dialog.caja= true">Crear Caja</v-btn>
              </v-layout>
              <table>
                <thead>
                  <tr>
                    <th>Paquete N°</th>
                    <th>Descripción del bien</th>
                    <th>Categorización</th>
                    <th>Item asegurado</th>
                    <th>Costo del producto</th>
                    <th>Unidades</th>
                    <th>Peso</th>
                    <th>Seguro</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="( items, index ) in form.products">
                    <td>{{ items.package }}</td>
                    <td>{{ items.description }}</td>

                    <td>
                      {{ items.category_name }}
                      <br />
                      <small>{{ items.subcategory_name }}</small>
                    </td>
                    <td v-if="items.ensurance == 0">NO</td>
                    <td v-if="items.ensurance == 1">SI</td>
                    <td
                      v-if="items.product_price != undefined"
                    >{{ items.product_price }} {{ form.details.currency_ensurance }}</td>
                    <td>{{ items.qty }} Und</td>
                    <td>{{ items.weight }} Kg</td>

                    <td>{{ items.price_ensurance }}</td>
                    <td style="text-align: right">
                      <v-btn
                        depressed
                        outline
                        icon
                        fab
                        dark
                        color="red"
                        small
                        @click="removeProduct( index )"
                      >
                        <v-icon>fa fa-times</v-icon>
                      </v-btn>
                    </td>
                  </tr>

                  <tr v-if="form.products.length > 0">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style="background: rgb( 230,230,230 ); text-align: right">
                      <strong>Total Seguro:</strong>
                    </td>
                    <td
                      style="background: rgb( 230,230,230 ); text-align: right"
                    >{{ form.details.total_ensurance }}</td>
                    <td
                      style="background: rgb( 230,230,230 );"
                    >{{ form.details.currency_ensurance }}</td>
                  </tr>
                </tbody>
              </table>
              <v-layout>
                <v-flex lg6 md6 sm12 xs12>
                  <v-btn flat @click="e1 = 1">Regresar</v-btn>
                  <v-btn color="primary" :disabled="disabledBtn.firsStep" @click="e1 = 3">Continuar</v-btn>
                  <v-btn
                    color="error"
                    @click="resetClientFields()"
                    v-if="disabled.clientField"
                  >Restablecer</v-btn>
                </v-flex>
                <v-flex lg3 md3 sm12 xs12 style="text-align: right">
                  <v-btn color="success" flat @click="dialog.searchClient = true">
                    <i class="fa fa-search"></i>&nbsp;
                   Asignar Encomienda a Caja
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-form ref="addAfiliateForm">
              <v-layout wrap row>
                <v-flex lg6 md6 sm12 xs12>
                  <v-text-field
                    :rules="onlyText"
                    @keyup="blurValidateAfiliate()"
                    :disabled="disabled.afiliateField"
                    v-model="form.afiliates.destination_name"
                    label="Destinatario"
                  ></v-text-field>
                </v-flex>
                <v-flex lg6 md6 sm12 xs12>
                  <v-text-field
                    @keyup="blurValidateAfiliate()"
                    v-model="form.afiliates.attention"
                    :rules="onlyText"
                    label="Atención"
                  ></v-text-field>
                </v-flex>
                <v-flex md2 lg2 sm4 xs4>
                  <v-select
                    @input="blurValidateAfiliate()"
                    label="Documento"
                    :items="basic.doc_types"
                    v-model="form.afiliates.doc_type"
                    item-text="text"
                    item-value="value"
                    :disabled="disabled.afiliateField"
                    :rules="[v => !!v || 'Campo requerido']"
                  ></v-select>
                </v-flex>
                <v-flex md4 lg4 sm9 xs9>
                  <v-text-field
                    @keyup="blurValidateAfiliate()"
                    :disabled="disabled.afiliateField"
                    v-model="form.afiliates.number"
                    :rules="onlyText"
                    label="Número"
                  ></v-text-field>
                </v-flex>
                <v-flex lg6 md6 sm12 xs12>
                  <v-text-field
                    @keyup="blurValidateAfiliate()"
                    v-model="form.afiliates.address"
                    :rules="onlyText"
                    label="Dirección"
                  ></v-text-field>
                </v-flex>
                <v-flex lg4 md4 sm12 xs12>
                  <v-select
                    @input="blurValidateAfiliate(); getCurrencies()"
                    label="País"
                    :rules="[v => !!v || 'Campo requerido']"
                    :items="basic.countries"
                    v-model="form.afiliates.country"
                    item-text="label"
                    autocomplete
                    item-value="value"
                  ></v-select>
                </v-flex>
                <v-flex lg4 md4 sm12 xs12 v-if="form.afiliates.country == 'Venezuela'">
                  <v-select
                    @input="blurValidateAfiliate(); getOfficeTealca()"
                    label="Ciudad"
                    :rules="[v => !!v || 'Campo requerido']"
                    :items="basic.citys"
                    v-model="form.afiliates.city"
                    autocomplete
                    item-text="state"
                    item-value="state"
                  ></v-select>
                </v-flex>
                <v-flex lg4 md4 sm12 xs12 v-else>
                  <v-text-field
                    @keyup="blurValidateAfiliate() "
                    v-model="form.afiliates.city"
                    :rules="onlyText"
                    label="Ciudad"
                  ></v-text-field>
                </v-flex>
                <v-flex lg4 md4 sm12 xs12 v-if="form.afiliates.country == 'Venezuela'">
                  <v-select
                    @input="blurValidateAfiliate(); selectOfficeTealca()"
                    label="Oficina Tealca"
                    :rules="[v => !!v || 'Campo requerido']"
                    :items="basic.office_tealca"
                    v-model="form.details.tealca_office"
                    autocomplete
                    item-text="label"
                    item-value="value"
                  ></v-select>
                </v-flex>
                <v-flex lg12 md12 sm12 xs12 v-if="form.details.tealca_direction">
                  <p>{{form.details.tealca_direction }}</p>
                </v-flex>
                <v-flex lg4 md4 sm12 xs12>
                  <v-text-field
                    @keyup="blurValidateAfiliate()"
                    v-model="form.afiliates.phone"
                    :rules="[v => !!v || 'Campo requerido']"
                    label="Número telefónico"
                  ></v-text-field>
                </v-flex>
                <v-flex lg6 md6 sm12 xs12>
                  <v-text-field
                    @keyup="blurValidateAfiliate()"
                    v-model="form.afiliates.email"
                    label="Correo Electrónico"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex lg6 md6 sm12 xs12>
                  <v-btn flat @click="e1 = 2">Regresar</v-btn>
                  <v-btn
                    color="primary"
                    :disabled="disabledBtn.secondStep"
                    @click="e1 = 4; getCurrencies(); getTaxesSelected()"
                  >Continuar</v-btn>
                  <v-btn
                    color="error"
                    @click="resetAfiliateFields()"
                    v-if="disabled.afiliateField"
                  >Restablecer</v-btn>
                </v-flex>

                <v-flex lg3 md3 sm12 xs12 style="text-align: right">
                  <v-btn
                    color="success"
                    v-if="form.client.id !== null"
                    @click="dialog.searchAfiliate = true; getAfiliated()"
                    flat
                  >
                    <i class="fa fa-search"></i>&nbsp;
                    Buscar Afiliados
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>

    <v-dialog v-model="dialog.selectPackage" scrollable max-width="800px">
      <v-card>
        <v-card-text>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Tracking</th>
                  <th>Fecha de salida</th>
                  <th>Salida</th>
                  <th>Fecha de Llegada</th>
                  <th>Llegada</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="items in request.package">
                  <td>{{ items.tracking }}</td>
                  <td>{{ items.out_date }}</td>
                  <td>{{ items.out_place }}</td>
                  <td>{{ items.arriving_date }}</td>
                  <td>{{ items.arriving_place }}</td>
                  <td>
                    <v-btn
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="success"
                      small
                      @click="addPackage( items.id, items, items.out_date )"
                    >
                      <v-icon>fa fa-plus</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
            <div style="text-align: center; padding: 0.75rem" v-if="request.package.length === 0">
              <h4>
                <i class="fa fa-exclamation-circle"></i>&nbsp;
                No hay datos para mostrar
              </h4>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click.native="dialog.selectPackage = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.caja" persistent max-width="1024px">
      <v-card>
        <v-card-title>
          <v-layout row>
            <v-flex lg-10 xs-10 md-10>
              <span class="headline" v-if="isEdit == false">Nueva Caja</span>
              <span class="headline" v-if="isEdit">Editar Caja</span>
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
                    :items="basicCaja.type"
                    v-model="type"
                    :rules="[v => !!v || 'Campo requerido']"
                    item-text="label"
                    item-value="value"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm4 md4>
                  <v-select
                    label="Tipo"
                    :items="basicCaja.typeC"
                    v-model="type"
                    :rules="[v => !!v || 'Campo requerido']"
                    item-text="label"
                    item-value="value"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm4 md4>
                  <v-text-field
                    v-model="tracking"
                    disabled
                    label="Peso"
                    :rules="[v => !!v || 'Campo requerido']"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4 md4>
                  <v-text-field
                    v-model="tracking"
                    disabled
                    label="Peso Volumetrico"
                    :rules="[v => !!v || 'Campo requerido']"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click.native="basic.caja = false">Cerrar</v-btn>
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
    
    <!--Fin Precio Final -->
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
import tealcaofficeList from "@/api/tealca";

export default {
  data() {
    return {
      countryUser: localStorage.getItem("country"),
      weight: 2900,
      modality: "",
      menu1: false,
      menu2: false,
      e1: 0,
      saveLoader: false,
      ensurance: 0,
      taxes: [],
      taxesSelected: [],
      volumetricForm: 0,
      search: {
        client: "",
        afiliated: "",
        package: ""
      },
      snackbar: {
        show: false,
        text: "",
        color: "",
        icon: ""
      },
      disabledBtn: {
        firsStep: true,
        secondStep: true,
        thirStep: true,
        addClient: true,
        addAfiliate: true,
        modality: true,
        addPackage: true,
        goBackBeforeSave: false
      },
      request: {
        client: [],
        afiliates: [],
        package: []
      },
      disabled: {
        clientField: false,
        afiliateField: false,
        orderform: true
      },
      loading: {
        searchClient: false,
        searchAfiliate: false,
        getSubcategories: false,
        saveBtn: false,
        searchPackage: false
      },
      dialog: {
        searchClient: false,
        searchAfiliate: false,
        addProduct: false,
        selectPackage: false,
        addWeight: false,
        caja: false
      },
      checkboxes: {
        afiliate: false,
        client: false,
        valueAfiliate: false,
        valueClient: false
      },
      productToInsert: {
        package: "",
        product_type: "",
        description: "",
        category_name: "",
        subcategory_name: "",
        category: "",
        subcategory: "",
        qty: "",
        weight: "",
        price: "",
        price_ensurance: "",
        subtotal: "",
        kilo_id: "",
        kilo_value: "",
        ensurance: 0,
        ensurance_value: "",
        product_price: "",
        height: 0,
        width: 0,
        length: 0
      },
      weightToInsert: {
        product_type: "",
        actual_weight: "",
        weight: "",
        price: "",
        height: 0,
        width: 0,
        length: 0,
        kilo_id: "",
        kilo_value: "",
        product_price: 0
      },
      onlyNumbers: [
        v => !!v || "Campo requerido",
        v => !isNaN(v) || "Campo solo debe contener números"
      ],
      onlyText: [v => !!v || "Campo requerido"],
      onlyEmail: [
        v => /.+@.+/.test(v) || "Formato de correo electrónico no válido"
      ],
      form: {
        client: {
          id: null,
          shipper: "",
          contact_person: "",
          doc_type: "",
          number: "",
          address: "",
          country: "",
          city: "",
          phone: "",
          email: ""
        },
        package: "",
        afiliates: {
          id: null,
          doc_type: "",
          number: "",
          destination_name: "",
          attention: "",
          address: "",
          clients_id: "",
          country: "",
          city: "",
          phone: "",
          email: ""
        },
        products: [],
        weight: [],
        details: {
          ensurance: "",
          tracking: "",
          out_date: "",
          reason: "",
          modality: "",
          currency: "",
          tealca_office: "",
          tealca_direction: "",
          tealca_code: "",
          currency: "",
          total_ensurance: "",
          currency_ensurance: "",
          product_type: "",
          kilo_value: "",
          kilo_id: "",
          weight: "",
          actual_weight: "",
          height: "",
          width: "",
          length: ""
        },

        total: 0
      },
      basic: {
        taxes: [],
        countries: countriesList.pais,
        citys: tealcaofficeList.tealca,
        money: [],
        office_tealca: [],
        doc_types: [
          { value: "1", text: "PTP" },
          { value: "2", text: "DNI" },
          { value: "3", text: "Pasaporte" },
          { value: "4", text: "C.E." },
          { value: "5", text: "C.I." }
        ],
        product_type: [
          { value: 1, text: "Por Kilos" },
          { value: 3, text: "Kilo volumétrico" },
          { value: 2, text: "Manual" }
        ],
        product_element: [
          { value: 1, text: "Incluido" },
          { value: 2, text: "Separado" }
        ],
        categories: [],
        subCategories: [],
        measureUnits: [],
        modality: [
          { value: "1", text: "Pago en el origen" },
          { value: "2", text: "Cobro en destino" }
        ],
        ensurance: [{ value: 0, text: "No" }, { value: 1, text: "Si" }],
        kilos: []
      },
      basicCaja: {
        dialog: false,
        type: [
          { value: "0", label: "Lote" },
          { value: "1", label: "Caja" },
          { value: "2", label: "Paleta" },
          { value: "3", label: "Bulto" }
        ],
        typeC: [
          { value: "A", label: "A" },
          { value: "B", label: "B" },
          { value: "C", label: "C" },
          { value: "D", label: "D" }
        ],
        status: [
          { value: "0", text: "Inicio" },
          { value: "1", text: "En Camino" },
          { value: "2", text: "Finalizado" }
        ]
      }
    };
  },
  filters: {
    doc_typesFilter(doc_types) {
      const item_type = {
        1: "PTP",
        2: "DNI",
        3: "Pasaporte",
        4: "C.E.",
        5: "C.I."
      };
      return item_type[doc_types];
    }
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Modalidad";
        case 2:
          return "Origen";
        case 3:
          return "Destino";
        case 4:
          return "Detalles";
        case 5:
          return "Confirmar";
        default:
          return "Confirmar";
      }
    }
  },
  watch: {
    modality: function(val) {
      this.form.details.modality = val;

      this.blurStepOne();
    },
    ensurance: function(str) {
      this.form.details.ensurance = str;
      this.blurStepOne();
    },
    taxes: function() {
      this.blurStepOne();
    }
  },
  mounted() {
    this.getTaxonomies();
    this.getTaxes();
  },
  created() {
    this.getPackage();
    this.setTracking();
  },
  methods: {
    blurStepOne() {
      if (
        this.form.details.modality != "" &&
        this.form.package.package_id != "" &&
        this.taxes.length > 0
      ) {
        this.disabledBtn.modality = false;
      } else {
        this.disabledBtn.modality = true;
      }
    },
    addPackage(id, tracking, out_date) {
      console.log(tracking);
      this.form.package = tracking;
      this.dialog.selectPackage = false;
      this.disabledBtn.modality = false;
    },
    getPackage() {
      var url = "package?ordered=1";
      if (
        localStorage.getItem("role") == '"2"' ||
        localStorage.getItem("role") == '"3"'
      ) {
        var country = localStorage.getItem("country");
        country = country.replace(/[ '"]+/g, "");
        var url = "package?ordered=1&country=" + country;
      }
      axios.get(url).then(response => {
        if (response.data.status) {
          this.request.package = response.data.items;
          this.disabledBtn.addPackage = false;
        } else {
          this.request.afiliates = [];
          this.disabledBtn.addAfiliate = true;
          this.snackbar = {
            show: true,
            text: response.data.msg,
            color: "error",
            icon: "fa fa-exclamation-triangle"
          };
        }
        this.loading.searchPackage = false;
      });
    }
  }
};
</script>

<style scoped>
.table-responsive table {
  width: 100%;
}
th {
  padding: 10px;
  background: rgb(230, 230, 230);
}
.search-btn {
  display: block;
  width: 100%;
  padding: 0.95rem;
  border-bottom: solid 2px transparent;
  background: #fff;
  color: #555;
  outline: none;
  transition: ease 0.3s;
}
.search-btn:hover {
  background: rgb(230, 230, 230);
}
td {
  padding: 7px;
}
@media (max-width: 495px) {
  .table-responsive table {
    overflow-x: scroll;
  }
}
</style>