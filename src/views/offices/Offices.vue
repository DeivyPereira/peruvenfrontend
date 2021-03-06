<template>
  <div id="Oficinas">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12>
              <v-dialog v-model="basic.dialog" persistent max-width="500px">
                <v-card>
                  <v-card-title>
                      <v-layout row>
                          <v-flex lg-10 xs-10 md-10>
                            <span class="headline" v-if="isEdit == false">Nueva Oficina</span>
                            <span class="headline" v-if="isEdit">Editar Oficina</span>
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
                                <v-text-field v-model="code" :disabled="disabled" label="Codigo" :rules="[rules.required]" required></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <v-textarea
                                  v-model="direction" :disabled="disabled"
                                  label="Dirección"
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
                  <td>{{ props.item.code }}</td>
                  <td>{{ props.item.direction }} </td>
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
      code: '',
      direction: '',
      rules: {
        required: (value) => !!value || 'Campo requerido.',
      },
      appEvents: [],
      complex: {
        headers: [
          {
            text: 'Nombre del Oficina',
            value: 'name'
          },
          {
            text: 'Codigo de Oficina',
            value: 'code'
          },
          {
            text: 'Dirección',
            value: 'direction'
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
          axios.get( 'offices' ).then( response => {
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
            axios.delete( 'offices/' + id ).then( response => {
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
          axios.get( 'offices/' + id ).then( response => {
              this.id = response.data.data.id
              this.name = response.data.data.name
              this.direction = response.data.data.direction
              this.code = response.data.data.code
              this.modalLoader = false
              this.disabled = false
          }).catch( error => {
              console.log( error )
          })
      },
      clearInputs(){
          this.name = ''
          this.code = ''
          this.direction = ''
          this.$refs.form.resetValidation()
      },
      save( id = null ){
        if( this.$refs.form.validate() ){
          var data = {
            name: this.name,
            direction: this.direction,
            code: this.code
          }
          this.saveLoader = true
          if( ! this.isEdit ){
              axios.post( 'offices/', data ).then( response => {
                  this.snackbar = { show: true, text: 'Oficina agregado con éxito', color: 'success',icon:'fa fa-check' }
                  this.saveLoader = false
                  this.basic.dialog = false
                  this.name = ''
                  this.direction = ''
                  this.code = ''
                  this.getList()
              }).catch( error => {
                  console.log( error )
              })
          } else {
              axios.put( 'offices/' + this.id, data ).then( response => {
                  this.snackbar = { show: true, text: 'Oficina editado con éxito', color: 'success',icon:'fa fa-check' }
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