<template>
  <div id="Ensurances">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12>
          

              <v-dialog v-model="basic.dialog" persistent max-width="500px">
                <v-card>
                  <v-card-title>
                      <v-layout row>
                          <v-flex lg-10 xs-10 md-10>
                            <span class="headline" v-if="isEdit == false">Nuevo Seguro</span>
                            <span class="headline" v-if="isEdit">Editar Seguro</span>
                          </v-flex>
                          <v-flex lg-2 xs-2 md-2 style="text-align: right">
                            <v-progress-circular indeterminate v-if="modalLoader == true" :size="30" color="primary"></v-progress-circular>
                          </v-flex>
                      </v-layout>
                    </v-card-title>
                      <v-divider></v-divider>
                      <v-form ref="form">
                        <v-card-text>
                          <v-container grid-list-md>
                            <v-layout wrap>
                              <v-flex xs12 sm6 md8>
                                <v-text-field v-model="name" :disabled="disabled" label="Nombre" :rules="[rules.required]"></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6 md4>
                                <v-text-field v-model="value" :disabled="disabled" label="Porcentaje" :rules="[rules.required]" append-icon="fa fa-percent" hint="Décimales separados con '.'" required></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <v-textarea
                                  v-model="description" :disabled="disabled"
                                  label="Descripción"
                                ></v-textarea>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click.native="basic.dialog = false">Cerrar</v-btn>
                        <v-btn color="success" :loading="saveLoader" :disabled="saveLoader" @click="save()">Guardar</v-btn>
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
              class="hidden-sm-and-down"
              ></v-text-field>  
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
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.description }}</td>
                  <td>{{ props.item.value }} %</td>
                  <td>
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

export default {
  data () {
    return {
      search: '',
      isEdit: false,
      id: null,
      name: '',
      value: '',
      description: '',
      rules: {
        required: (value) => !!value || 'Campo requerido.',
      },
      appEvents: [],
      complex: {
        headers: [
          {
            text: 'Nombre del seguro',
            value: 'name'
          },
          {
            text: 'Descripción',
            value: 'description'
          },
          {
            text: 'Valor Porcentaje',
            value: 'value'
          },
          {
            text: 'Acciones',
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
      },
      saveLoader: false,
      removeLoader: false,
      generalLoader: false,
      modalLoader: false,
      disabled: false
    }
  },
  mounted (){
   this.getList()
  },
  methods: {
      getList(){
          this.generalLoader = true
          axios.get( 'ensurance' ).then( response => {
              this.complex.items = response.data.items
              this.generalLoader = false
          }). catch( error => {
              console.log( error )
          })
      },
      remove( id ){
        this.$confirm('¿Realmente quieres eliminar este elemento?').then( res => { 
          if( res ){
            this.generalLoader = true
            axios.delete( 'ensurance/' + id ).then( response => {
                this.snackbar = { show: true, text: response.data.response, color: 'success',icon:'fa fa-check' }
                this.getList()
            }).catch( error => {
                console.log( error )
            })
          }
        })   
      },
      edit( id ){
          this.isEdit = true
          this.basic.dialog = true
          this.modalLoader = true
          this.disabled = true
          axios.get( 'ensurance/' + id ).then( response => {
              this.id = response.data.data.id
              this.name = response.data.data.name
              this.description = response.data.data.description
              this.value = response.data.data.value
              this.modalLoader = false
              this.disabled = false
          }).catch( error => {
              console.log( error )
          })
      },
      clearInputs(){
          this.name = ''
          this.value = ''
          this.description = ''
          this.$refs.form.resetValidation()
      },
      save( id = null ){
        if( this.$refs.form.validate() ){
          var data = {
            name: this.name,
            description: this.description,
            value: this.value
          }
          this.saveLoader = true
          if( ! this.isEdit ){
              axios.post( 'ensurance/', data ).then( response => {
                  this.snackbar = { show: true, text: 'Seguro agregado con éxito', color: 'success',icon:'fa fa-check' }
                  this.saveLoader = false
                  this.basic.dialog = false
                  this.name = ''
                  this.description = ''
                  this.value = ''
                  this.getList()
              }).catch( error => {
                  console.log( error )
              })
          } else {
              axios.put( 'ensurance/' + this.id, data ).then( response => {
                  this.snackbar = { show: true, text: 'Seguro editado con éxito', color: 'success',icon:'fa fa-check' }
                  this.saveLoader = false
                  this.getList()
              }).catch( error => {
                  console.log( error )
              })
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