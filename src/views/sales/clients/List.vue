<template>
  <div id="Clients">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12>
          
          <v-dialog v-model="basic.dialog" max-width="800px">
            <v-card>
              <v-card-title>
                <v-layout row>
                  <v-flex lg-10 xs-10 md-10>
                    <span class="headline" v-if="isEdit == false">Nuevo Cliente</span>
                    <span class="headline" v-if="isEdit">Editar Cliente</span>
                  </v-flex>
                  <v-flex lg-2 xs-2 md-2 style="text-align: right">
                    <v-progress-circular indeterminate v-if="modalLoader == true" :size="30" color="primary"></v-progress-circular>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <v-divider></v-divider>
              <v-form 
                ref="form"
                lazy-validation>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs4 sm4 md4>
                        <v-select
                          label="Documento"
                          :items="basic.doc_types"
                          v-model="form.doc_type"
                          item-text="text"
                          item-value="value"     
                          :rules="[v => !!v || 'Campo requerido']"
                        ></v-select>
                      </v-flex>
                      <v-flex xs8 sm3 md3>
                        <v-text-field v-model="form.number" 
                          :disabled="disabled" 
                          :rules="[v => !!v || 'Campo requerido']"
                          label="Número">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm5 md5>
                        <v-text-field v-model="form.shipper" 
                          :disabled="disabled" 
                          :rules="onlyText"
                          label="Nombre y Apellido">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-text-field v-model="form.contact_person" 
                          :disabled="disabled"
                          :rules="onlyText"
                          label="Persona de Contacto">
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
                      <v-flex xs12 sm6 md6>
                        <v-select
                          label="País"
                          :items="basic.countries"
                          v-model="form.country"
                          item-text="label"
                          item-value="value" 
                          :rules="[v => !!v || 'Campo requerido']">
                        </v-select>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-text-field v-model="form.city"
                          :disabled="disabled"
                          :rules="onlyText"
                          label="Ciudad">
                        </v-text-field>
                      </v-flex>
                      
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" 
                    @click.native="basic.dialog = false">
                    Cerrar
                  </v-btn>
                  <v-btn color="success" 
                    :loading="saveLoader" 
                    :disabled="saveLoader" 
                    @click="validate()">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-form>
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
                  <td style="width: 225px">{{ props.item.shipper }}</td>
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
      valid: false,
      search: '',
      isEdit: false,
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
          shipper: '',
          doc_type: '',
          number: '',
          contact_person: '',
          address: '',
          country: '',
          city: '',
          phone: '',
          email: ''
      },
      complex: {
        headers: [
          {
            text: 'Remitente',
            value: 'shipper'
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
        doc_types: [
            { value: "1", text: 'PTP' },
            { value: "2", text: 'DNI' },
            { value: "3", text: 'Pasaporte' },
            { value: "4", text: 'C.E.' },
            { value: "5", text: 'C.I.' }       
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
        1: "PTP",
        2: "DNI",
        3: "Pasaporte",
        4: "C.E.",
        5: "C.I."
      }
      return item_type[ doc_types ];
    }
  },
  mounted (){
   this.getList()
  },
  methods: {
      getList(){
          this.generalLoader = true
          axios.get( 'clients' ).then( response => {
              this.complex.items = response.data.items
              this.generalLoader = false
          }). catch( error => {
              this.snackbar = { show: true, text: error, color: 'danger', icon:'fa fa-exclamation-triangle' }
          })
      },
      validate () {
        if (this.$refs.form.validate()) {
          this.save()
        }
      },
      remove( id ){
        this.$confirm( '¿Realmente quieres eliminar este elemento?' ).then( res => { 
          if( res ){
            this.generalLoader = true
            axios.delete( 'clients/' + id ).then( response => {
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
          this.basic.dialog = true
          this.modalLoader = true
          this.disabled = true
          axios.get( 'clients/' + id ).then( response => {
              this.form.id = response.data.data.id
              this.form.shipper = response.data.data.shipper
              this.form.doc_type = response.data.data.doc_type
              this.form.number = response.data.data.number
              this.form.contact_person = response.data.data.contact_person
              this.form.address = response.data.data.address
              this.form.country = response.data.data.country
              this.form.city = response.data.data.city
              this.form.phone = response.data.data.phone
              this.form.email = response.data.data.email
              this.modalLoader = false
              this.disabled = false
          }).catch( error => {
              this.snackbar = { show: true, text: error, color: 'danger', icon:'fa fa-check' }
          })
      },
      clearInputs(){
          this.form.id = null
          this.form.shipper = ''
          this.form.doc_type = ''
          this.form.number = ''
          this.form.contact_person = ''
          this.form.address = ''
          this.form.country = ''
          this.form.city = ''
          this.form.phone = ''
          this.form.email = ''
          this.$refs.form.reset()
      },
      save( id = null ){
          var data = {
            shipper: this.form.shipper,
            doc_type: this.form.doc_type,
            number: this.form.number,
            contact_person: this.form.contact_person,
            address: this.form.address,
            country: this.form.country,
            city: this.form.city,
            phone: this.form.phone,
            email: this.form.email     
          }
          this.saveLoader = true
          if( ! this.isEdit ){
              axios.post( 'clients/', data ).then( response => {
                if( response.data.status ){
                  this.snackbar = { show: true, text: response.data.response, color: 'success', icon:'fa fa-check' }
                  this.basic.dialog = false
                  this.clearInputs()
                  this.getList()
                } else {
                  this.snackbar = { show: true, text: response.data.response, color: 'danger', icon:'fa fa-exclamation-triangle' }
                }
                  this.saveLoader = false
              }).catch( error => {
                  this.snackbar = { show: true, text: error, color: 'danger', icon:'fa fa-exclamation-triangle' }
              })
          } else {
              axios.put( 'clients/' + this.form.id, data ).then( response => {
                if( response.data.status ){
                  this.snackbar = { show: true, text: response.data.response, color: 'success', icon:'fa fa-check' }
                  this.basic.dialog = false
                  this.clearInputs()
                  this.getList()
                } else {
                  this.snackbar = { show: true, text: response.data.response, color: 'danger', icon:'fa fa-exclamation-triangle' }
                }
                  this.saveLoader = false
              }).catch( error => {
                  this.snackbar = { show: true, text: error, color: 'danger', icon:'fa fa-exclamation-triangle' }
              })
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