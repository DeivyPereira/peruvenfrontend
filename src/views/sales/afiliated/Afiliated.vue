<template>
  <div id="Clients">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12>
          
          <v-dialog v-model="basic.dialog" max-width="800px">
              <v-stepper v-model="e1">
                <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1">Seleccione el cliente</v-stepper-step>
                    <v-divider></v-divider>
                    <v-stepper-step :complete="e1 > 2" step="2">Complete el formulario</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-form ref="findClientForm" @submit="getClient()">
                            <v-layout wrap>
                                <v-flex lg11 md11 sm11 xs11>
                                    <v-text-field 
                                        :loading="loading.searchClient"
                                        v-model="searchClient.client"
                                        :rules="[v => !!v || 'Campo requerido']"
                                        label="Nombre o documento del cliente">
                                    </v-text-field>
                                </v-flex>
                                <v-flex lg1 md1 sm1 xs1>
                                    <button type="submit" class="search-btn">
                                        <i class="fa fa-search"></i>
                                    </button>
                                </v-flex>
                            </v-layout>
                        </v-form>
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Documento</th>
                                        <th>Nombre</th>
                                        <th>Contacto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="items in client" :key="items.id">
                                        <td>{{ items.doc_type | doc_typesFilter }} {{ items.number }}</td>
                                        <td>{{ items.shipper }}</td>
                                        <td>{{ items.phone }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style="text-align: center; padding: 0.75rem" v-if="client.length === 0">
                                <h4>
                                    <i class="fa fa-exclamation-circle"></i>&nbsp;
                                    Realice su búsqueda  
                                </h4>
                            </div>
                        </div>
                        <v-layout>
                            <v-flex lg6 md6 sm12 xs12>
                                <v-btn flat disabled>
                                    Regresar
                                </v-btn>
                                <v-btn color="primary" :disabled="disabledBtn.goToForm" @click="e1 = 2">
                                    Continuar
                                </v-btn>
                            </v-flex>
                            <v-flex style="text-align: right" lg6 md6 sm12 xs12>
                                <v-btn color="error" 
                                    @click.native="basic.dialog = false">
                                    Cerrar
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                            <v-form 
                                ref="form"
                                lazy-validation>
                                
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                    <v-flex xs4 sm2 md2>
                                        <v-select
                                        label="Documento"
                                        :items="basic.doc_types"
                                        v-model="form.doc_type"
                                        item-text="text"
                                        item-value="value"     
                                        :rules="[v => !!v || 'Campo requerido']"
                                        ></v-select>
                                    </v-flex>
                                    <v-flex xs9 sm4 md4>
                                        <v-text-field v-model="form.number" 
                                        :disabled="disabled" 
                                        :rules="[v => !!v || 'Campo requerido']"
                                        label="Número">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="form.destination_name" 
                                        :disabled="disabled" 
                                        :rules="onlyText"
                                        label="Destinatario">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="form.attention" 
                                        :disabled="disabled"
                                        :rules="onlyText"
                                        label="Atención">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="form.phone" 
                                        :disabled="disabled" 
                                        :rules="[v => !!v || 'Campo requerido']"
                                        label="Número telefónico">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="form.email" 
                                        :disabled="disabled"
                                        label="Correo Electrónico">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="form.address" 
                                        :disabled="disabled" 
                                        :rules="[v => !!v || 'Campo requerido']" 
                                        label="Dirección">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm4 md4>
                                        <v-select
                                        label="País"
                                        :items="basic.countries"
                                        v-model="form.country"
                                        item-text="label"
                                        item-value="value" 
                                        :rules="[v => !!v || 'Campo requerido']">
                                        </v-select>
                                    </v-flex>
                                    <v-flex xs12 sm4 md4>
                                        <v-text-field v-model="form.city"
                                        :disabled="disabled"
                                        :rules="onlyText"
                                        label="Ciudad">
                                        </v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm4 md4>
                                        <v-text-field v-model="form.zip" 
                                        :disabled="disabled"
                                        :rules="[v => !!v || 'Campo requerido']" 
                                        label="Código Postal / ZIP">
                                        </v-text-field>
                                    </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-form>

                        <v-layout>
                            <v-flex lg6 md6 sm12 xs12>
                                <v-btn flat @click="e1 = 1">
                                    Regresar
                                </v-btn>
                                <v-btn color="success" @click="validate()">
                                    Guardar
                                </v-btn>
                            </v-flex>
                            <v-flex style="text-align: right" lg6 md6 sm12 xs12>
                                <v-btn color="error" 
                                    @click.native="basic.dialog = false">
                                    Cerrar
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
          </v-dialog>

          <v-dialog v-model="basic.dialogEdit" max-width="800px">
              <v-card>
                  <v-card-title>
                      <span class="headline">Editar Afiliado</span>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                      <v-form 
                        ref="editForm"
                        lazy-validation>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs4 sm2 md2>
                                    <v-select
                                    label="Documento"
                                    :items="basic.doc_types"
                                    v-model="form.doc_type"
                                    item-text="text"
                                    item-value="value"     
                                    :rules="[v => !!v || 'Campo requerido']"
                                    ></v-select>
                                </v-flex>
                                <v-flex xs9 sm4 md4>
                                    <v-text-field v-model="form.number" 
                                    :disabled="disabled" 
                                    :rules="[v => !!v || 'Campo requerido']"
                                    label="Número">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="form.destination_name" 
                                    :disabled="disabled" 
                                    :rules="onlyText"
                                    label="Destinatario">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="form.attention" 
                                    :disabled="disabled"
                                    :rules="onlyText"
                                    label="Atención">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="form.phone" 
                                    :disabled="disabled" 
                                    :rules="[v => !!v || 'Campo requerido']"
                                    label="Número telefónico">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="form.email" 
                                    :disabled="disabled"
                                    label="Correo Electrónico">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="form.address" 
                                    :disabled="disabled" 
                                    :rules="[v => !!v || 'Campo requerido']" 
                                    label="Dirección">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm4 md4>
                                    <v-select
                                    label="País"
                                    :items="basic.countries"
                                    v-model="form.country"
                                    item-text="label"
                                    item-value="value" 
                                    :rules="[v => !!v || 'Campo requerido']">
                                    </v-select>
                                </v-flex>
                                <v-flex xs12 sm4 md4>
                                    <v-text-field v-model="form.city"
                                    :disabled="disabled"
                                    :rules="onlyText"
                                    label="Ciudad">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm4 md4>
                                    <v-text-field v-model="form.zip" 
                                    :disabled="disabled"
                                    :rules="[v => !!v || 'Campo requerido']" 
                                    label="Código Postal / ZIP">
                                    </v-text-field>
                                </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="success" @click="validateEdit()">
                            Guardar
                        </v-btn>
                        <v-btn color="error" 
                            @click.native="basic.dialogEdit = false">
                            Cerrar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>


          <v-toolbar card color="white">
            <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Buscar..."
              v-model="search"
              hide-details
              class="hidden-sm-and-down">
            </v-text-field>  
            <v-btn color="success" @click="isEdit = false; clearInputs(); basic.dialog = true" flat><i class="fa fa-plus"></i>&nbsp;Agregar</v-btn>         
          </v-toolbar>

            <v-progress-circular indeterminate :size="40" v-if="generalLoader == true" style="position: fixed; bottom: 10%; right: 5%;" color="primary"></v-progress-circular>

              <v-data-table
                :headers="complex.headers"
                :search="search"
                :items="complex.items"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                item-key="name"
                >
                <template slot="items" slot-scope="props">
                  <td style="width: 200px">{{ props.item.destination_name }}</td>
                  <td style="width: 180px">{{ props.item.clients.shipper }}</td>
                  <td style="width: 100px">{{ props.item.doc_type | doc_typesFilter }}</td>
                  <td style="width: 100px">{{ props.item.number }}</td>
                  <td>{{ props.item.phone }}</td>
                  <td style="text-align: right">
                    <v-btn depressed outline icon fab dark color="primary" small @click="edit( props.item.id )">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn depressed outline icon fab dark color="red" small @click="remove( props.item.id )">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>

        </v-flex>
      </v-layout>
    </v-container>

    <v-snackbar
      :timeout="3000"
      top
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >  
    <p style="margin: 0">
      <i :class="snackbar.icon"></i>&nbsp;
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
import axios from '@/api/config'
import countriesList from '@/api/paisesymonedas'

export default {
  data () {
    return {
      e1: 0,
      valid: false,
      search: '',
      isEdit: false,
      searchClient: {
          client: ''
      },
      loading: {
          searchClient: false,
      },
      disabledBtn: {
          goToForm: true
      },
      onlyEmail: [
        v => /.+@.+/.test(v) || 'Formato de correo electrónico no válido'
      ],
      onlyText: [
        v => !!v || 'Campo requerido',
        v => isNaN(v) || "Campo solo debe contener letras"
      ],
      onlyNumbers: [
        v => !!v || 'Campo requerido',
        v => !isNaN(v) || "Campo solo debe contener números"
      ],
      form: {
          id: null,
          destination_name: '',
          doc_type: '',
          number: '',
          attention: '',
          address: '',
          country: '',
          city: '',
          phone: '',
          email: '',
          zip: ''
      },
      client: [],
      complex: {
        headers: [
          {
            text: 'Destinatario',
            value: 'destination_name'
          },
          {
            text: 'Remitente',
            value: 'client.shipper'
          },
          {
            text: 'Tipo de Documento',
            value: 'doc_type'
          },
          {
            text: 'Número de documento',
            value: 'number'
          },
          {
            text: 'Teléfono',
            value: 'phone'
          },
          {
            text: '',
            value: ''
          },
        ],
        items: []
      },
      snackbar: {
        show: false,
        text: '',
        color: '',
        icon: ''
      },
      basic: {
        dialog: false,
        dialogEdit: false,
        doc_types: [
            { value: "1", text: 'Pto' },
            { value: "2", text: 'Pasaporte' },
            { value: "3", text: 'C.E:' },
            { value: "4", text: 'C.I.' }        
        ],
        countries: countriesList.pais
      },
      saveLoader: false,
      removeLoader: false,
      generalLoader: false,
      modalLoader: false,
      disabled: false
    }
  },
  filters: {
    doc_typesFilter( doc_types ){
      const item_type = {
        1: "Pto",
        2: "Pasaporte",
        3: "C.E.",
        4: "C.I."
      }
      return item_type[ doc_types ];
    }
  },
  computed: {
    currentTitle () {
        switch (this.step) {
        case 1: return 'Seleccione el cliente'
        default: return 'Complete el formulario'
      }
    }
  },
  mounted (){
   this.getList()
  },
  methods: {
      getClient(){
          event.preventDefault()
            this.loading.searchClient = true
            if (this.$refs.findClientForm.validate()) {
                axios.get( 'clients/by-number?key=' + this.searchClient.client ).then( response => {
                    if( response.data.status ){
                        this.client = response.data.data
                        this.disabledBtn.goToForm = false
                    } else {
                        this.snackbar = { show: true, text: response.data.msg, color: 'error', icon:'fa fa-exclamation-triangle' }
                    }
                    this.loading.searchClient = false
                })
            }
      },
      getList(){
          this.generalLoader = true
          axios.get( 'afiliated' ).then( response => {
              this.complex.items = response.data.items
              this.generalLoader = false
          }). catch( error => {
              this.snackbar = { show: true, text: error, color: 'danger', icon:'fas fa-exclamation-triangle' }
          })
      },
      validate () {
        if (this.$refs.form.validate()) {
          this.save()
        }
      },
      validateEdit() {
        if (this.$refs.editForm.validate()) {
          this.save()
        }
      },
      remove( id ){
        this.$confirm( '¿Realmente quieres eliminar este elemento?' ).then( res => { 
          if( res ){
            this.generalLoader = true
            axios.delete( 'afiliated/' + id ).then( response => {
                this.snackbar = { show: true, text: response.data.response, color: 'success', icon:'fa fa-check' }
                this.getList()
            }).catch( error => {
                this.snackbar = { show: true, text: error, color: 'danger', icon:'fa fa-check' }
            })
          }
        })   
      },
      edit( id ){
          this.isEdit = true
          this.basic.dialogEdit = true
          this.modalLoader = true
          this.disabled = true
          axios.get( 'afiliated/' + id ).then( response => {
              this.form.id = response.data.data.id
              this.form.destination_name = response.data.data.destination_name
              this.form.doc_type = response.data.data.doc_type
              this.form.number = response.data.data.number
              this.form.attention = response.data.data.attention
              this.form.address = response.data.data.address
              this.form.country = response.data.data.country
              this.form.city = response.data.data.city
              this.form.phone = response.data.data.phone
              this.form.email = response.data.data.email
              this.form.zip = response.data.data.zip
              this.modalLoader = false
              this.disabled = false
          }).catch( error => {
              this.snackbar = { show: true, text: error, color: 'danger', icon:'fa fa-exclamation-triangle' }
          })
      },
      clearInputs(){
          this.form.id = null
          this.form.destination_name = ''
          this.form.doc_type = ''
          this.form.number = ''
          this.form.attention = ''
          this.form.address = ''
          this.form.country = ''
          this.form.city = ''
          this.form.phone = ''
          this.form.email = ''
          this.form.zip = ''
          this.$refs.form.reset()
      },
      save(){
          this.saveLoader = true
          if( ! this.isEdit ){
            var data = {
                clients_id: this.client[0].id,
                destination_name: this.form.destination_name,
                doc_type: this.form.doc_type,
                number: this.form.number,
                attention: this.form.attention,
                address: this.form.address,
                country: this.form.country,
                city: this.form.city,
                phone: this.form.phone,
                email: this.form.email,
                zip: this.form.zip     
              }
              axios.post( 'afiliated/', data ).then( response => {
                if( response.data.status ){
                  this.snackbar = { show: true, text: response.data.response, color: 'success', icon:'fa fa-check' }
                  this.basic.dialog = false
                  this.clearInputs()
                  this.getList()
                } else {
                  this.snackbar = { show: true, text: response.data.response, color: 'danger', icon:'fas fa-exclamation-triangle' }
                }
                  this.saveLoader = false
              }).catch( error => {
                  this.snackbar = { show: true, text: error, color: 'danger', icon:'fas fa-exclamation-triangle' }
              })
          } else {
               var data = {
                id: this.form.id,
                destination_name: this.form.destination_name,
                doc_type: this.form.doc_type,
                number: this.form.number,
                attention: this.form.attention,
                address: this.form.address,
                country: this.form.country,
                city: this.form.city,
                phone: this.form.phone,
                email: this.form.email,
                zip: this.form.zip     
              }
              axios.put( 'afiliated/' + this.form.id, data ).then( response => {
                if( response.data.status ){
                  this.snackbar = { show: true, text: response.data.response, color: 'success', icon:'fa fa-check' }
                  this.basic.dialog = false
                  this.getList()
                } else {
                  this.snackbar = { show: true, text: response.data.response, color: 'danger', icon:'fas fa-exclamation-triangle' }
                }
                  this.saveLoader = false
              }).catch( error => {
                  this.snackbar = { show: true, text: error, color: 'danger', icon:'fas fa-exclamation-triangle' }
              })
          }
      }
  }
};
</script>

<style scoped>
    .table-responsive table{
        width: 100%;
    }
    th{
        padding: 10px;
        background: rgb( 230,230,230 );
    }
    .search-btn{
        display: block; 
        width: 100%;
        padding: 0.95rem; 
        border-bottom: solid 2px transparent; 
        background: #FFF; 
        color: #555;
        outline: none;
        transition: ease 0.3s;
    }
    .search-btn:hover {
        background: rgb( 230,230,230 );
    }
    td{
        padding: 7px;
    }
    @media( max-width: 495px ){
        .table-responsive table{
            overflow-x: scroll;
        }   
    }

</style>

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