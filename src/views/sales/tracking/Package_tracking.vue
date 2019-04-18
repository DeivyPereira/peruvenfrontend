<template>
  <div id="Tracking">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12>
          

              <v-dialog v-model="basic.dialog" persistent max-width="1024px">
                <v-card>
                  <v-card-title>
                      <v-layout row>
                          <v-flex lg-2 xs-2 md-2 style="text-align: right">
                            <v-progress-circular indeterminate v-if="modalLoader == true" :size="30" color="primary"></v-progress-circular>
                          </v-flex>
                      </v-layout>
                    </v-card-title>
                      <v-divider></v-divider>
                      <v-form ref="form">
                        <v-card-text style="padding: 10px">
                          <v-container grid-list-md>
                            <v-layout wrap>

                              <v-flex xs12 sm6 md6>
                                <v-text-field 
                                    v-model="tracking" 
                                    disabled 
                                    label="Tracking">
                                </v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6 md6>
                                <v-text-field 
                                    v-model="location" 
                                    label="Ubicación Actual"> 
                                </v-text-field>
                              </v-flex>
                              <v-flex xs6 sm3 md3>
                                <v-text-field 
                                    v-model="lat"  
                                    label="Latitud">
                                </v-text-field>
                              </v-flex>
                              <v-flex xs6 sm3 md3>
                                <v-text-field 
                                    v-model="lng"  
                                    label="Longitud">
                                </v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6 md6>
                                  <v-select
                                    label="Estado Actual"
                                    :items="basic.status"
                                    v-model="status"
                                    item-text="text"
                                    item-value="value"     
                                    ></v-select>
                              </v-flex>

                               <v-flex xs12 sm12 md12>
                                  <v-textarea
                                  v-model="description"
                                  label="Descripción"></v-textarea>
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
                  <td>{{ props.item.package.tracking }}</td>

                  <td>{{ props.item.status | statusFilter }}</td>
                  <td>{{ props.item.location }}</td>
                  <td>{{ props.item.package.out_date }}</td>

                  <td>{{ props.item.package.arriving_date }}</td>
                  
                  <td>
                    <v-btn depressed outline icon fab dark color="primary" small @click="edit( props.item.id )">
                      <v-icon>edit</v-icon>
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
      search: '',
      isEdit: false,
      id: null,
      description: '',
      location: '',
      lat: '',
      lng: '',
      status: '',
      package: [],
      tracking: '',
      complex: {
        headers: [
          {
            text: 'Tracking',
            value: 'package.tracking'
          },
          {
            text: 'Estado actual',
            value: 'status'
          },
          {
            text: 'Ubicación actual',
            value: 'location'
          },
          {
            text: 'Salida del paquete',
            value: 'package.out_date'
          },
          {
            text: 'Llegada del paquete',
            value: 'package.arriving_date'
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
        status: [
            { value: "0", text: 'Inicio' },
            { value: "1", text: 'En Camino' },
            { value: "2", text: 'Finalizado' }
        ],
      },
      saveLoader: false,
      removeLoader: false,
      generalLoader: false,
      modalLoader: false,
      disabled: false
    }
  },
  filters: {
      statusFilter( status ){
          const item_type = {
              0: "Inicio",
              1: "En Camino",
              2: "Finalizado"
          }
          return item_type[ status ]
      },
    },
  mounted (){
   this.getList()
  },
  methods: {
      getList(){
          this.generalLoader = true;
          var url = 'tracking?cond=pack';
          if( localStorage.getItem('role') == '"2"' || localStorage.getItem('role') == '"3"' ){
            var country = localStorage.getItem('country')
                country = country.replace(/[ '"]+/g, '')
            var url = 'tracking?cond=pack&country=' + country;
          }
          axios.get( url ).then( response => {
              this.complex.items = response.data.items
              this.generalLoader = false
          }). catch( error => {
              console.log( error )
          })
      },
      edit( id ){
          this.isEdit = true
          this.basic.dialog = true
          this.modalLoader = true
          this.disabled = true
          axios.get( 'tracking/' + id ).then( response => {
              this.id = response.data.data.id
              this.description = response.data.data.description
              this.location = response.data.data.location  
              this.lat = response.data.data.lat
              this.lng = response.data.data.lng
              this.status = response.data.data.status
              this.tracking = response.data.data.package.tracking
              this.lng = response.data.data.lng
              this.modalLoader = false
              this.disabled = false
          }).catch( error => {
              console.log( error )
          })
      },
      clearInputs(){
        this.id = null
        this.description = ''
        this.location = ''
        this.lat = ''
        this.lng = ''
        this.status = ''
        this.package = []
        this.tracking = ''
        this.$refs.form.resetValidation()
      },
      save( id = null ){
        if( this.$refs.form.validate() ){
          var data = {
            description: this.description,
            location: this.location,
            lat: this.lat,
            lng: this.lng,
            status: this.status
          }
          this.saveLoader = true
          axios.put( 'tracking/' + this.id, data ).then( response => {
            this.snackbar = { show: true, text: 'Tracking editado con éxito', color: 'success',icon:'fa fa-check' }
            this.saveLoader = false
            this.getList()
          }).catch( error => {
            console.log( error )
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