<template>
  <div id="Users">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12>

              <v-dialog v-model="basic.dialog" persistent max-width="800px">
                <v-card>
                  <v-card-title>
                      <v-layout row>
                          <v-flex lg-10 xs-10 md-10>
                            <span class="headline" v-if="isEdit == false">Nuevo Usuario</span>
                            <span class="headline" v-if="isEdit">Editar Usuario</span>
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
                              <v-flex xs12 sm12 md12>
                                <v-text-field 
                                  v-model="name" 
                                  :disabled="disabled" 
                                  label="Nombre" 
                                  :rules="[rules.required]">
                                </v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6 md6>
                                <v-text-field 
                                  v-model="email" 
                                  :disabled="disabled" 
                                  label="Correo electrónico" 
                                  :rules="[rules.required]">
                                </v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6 md6>
                                <v-text-field 
                                  v-if="isEdit == true"
                                  hint="Dejar en blanco si no desea cambiarla"
                                  persistent-hint
                                  type="password"
                                  v-model="password" 
                                  :disabled="disabled" 
                                  label="Contraseña">
                                </v-text-field>
                                <v-text-field
                                  v-if="isEdit == false" 
                                  :rules="[rules.required]"
                                  type="password"
                                  v-model="password" 
                                  :disabled="disabled" 
                                  label="Contraseña">
                                </v-text-field>
                              </v-flex>
                              <v-flex xs12 sm6 md6>
                                <v-select
                                    label="Seleccionar País"
                                    :items="countries"
                                    v-model="country"
                                    required
                                    :rules="[v => !!v || 'Campo requerido']"
                                    item-text="value"
                                    item-value="value"     
                                    ></v-select>
                              </v-flex>
                              <v-flex xs12 sm6 md6>
                                <v-select
                                    label="Rol"
                                    :items="rols"
                                    v-model="role"
                                    required
                                    :rules="[v => !!v || 'Campo requerido']"
                                    item-text="text"
                                    item-value="value"     
                                    ></v-select>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <v-select
                                    label="Estado"
                                    :items="statuses"
                                    v-model="status"
                                    required
                                    :rules="[v => !!v || 'Campo requerido']"
                                    item-text="text"
                                    item-value="value"     
                                    ></v-select>
                              </v-flex>
                               <v-flex xs12 sm6 md6>
                                <v-select
                                    label="Oficina"
                                    :items="offices"
                                    v-model="office_id"
                                    required
                                    :rules="[v => !!v || 'Campo requerido']"
                                    item-text="name"
                                    item-value="id"     
                                    ></v-select>
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
            <v-toolbar card color="white" style="padding: 0 0 20px 0">
              <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Buscar..."
              v-model="search"
              hide-details
              class="hidden-sm-and-down"
              ></v-text-field>    
              <v-btn color="success" flat @click="isEdit = false; clearInputs(); basic.dialog = true"><i class="fa fa-plus"></i>&nbsp;Agregar</v-btn>
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
                  <td>{{ props.item.email }}</td>
                  <td>{{ props.item.country }}</td>
                  <td>{{ props.item.role | roleFilter }}</td>
                  <td>{{ props.item.office.name }} - {{ props.item.office.code }}</td>
                  <td>{{ props.item.status | statusFilter }}</td>
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
import countriesList from '@/api/paisesymonedas'

export default {
  data () {
    return {
      search: '',
      isEdit: false,
      id: null,
      name: '',
      country: '',
      role: '',
      status: '',
      email: '',
      password: '',
      office_id: '',
      countries: countriesList.pais,
      rols: [
          { value: 1, text: 'Administrador' },
          { value: 2, text: 'Supervisor' },
          { value: 3, text: 'Trabajador' }
      ],
      statuses: [
          { value: 2, text: 'Activo' },
          { value: 1, text: 'Inactivo' }
      ],
      rules: {
        required: (value) => !!value || 'Campo requerido.'
      },
      appEvents: [],
      offices: [],
      complex: {
        headers: [
          {
            text: 'Nombre',
            value: 'name'
          },
          {
            text: 'Email',
            value: 'email'
          },
          {
            text: 'País',
            value: 'country'
          },
          {
            text: 'Rol',
            value: 'role'
          },
          {
            text: 'Oficina',
            value: 'office'
          },
          {
            text: 'Estado',
            value: 'status'
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
      disabled: false,
    }
  },
  filters: {
    roleFilter( role ){
        const filter = {
            1: "Administrador",
            2: "Supervisor",
            3: "Trabajador"
        }
        return filter[ role ];
    },
    statusFilter( status ){
        const filter_ = {
            1: "Inactivo",
            2: "Activo",
        }
        return filter_[ status ];
    }
  },
  mounted (){
    this.getList()
    this.getListOffice()
  },
  methods: {
     getListOffice(){
          this.generalLoader = true
          axios.get( 'offices' ).then( response => {
              this.offices = response.data.items
              this.generalLoader = false
          }). catch( error => {
              console.log( error )
          })
      },
      getList(){
          this.generalLoader = true
          axios.get( 'user' ).then( response => {
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
            axios.delete( 'user/' + id ).then( response => {
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
          axios.get( 'user/' + id ).then( response => {
              this.id = response.data.data.id
              this.name = response.data.data.name
              this.country = response.data.data.country
              this.role = parseInt( response.data.data.role )
              this.status = parseInt( response.data.data.status )
              this.email = response.data.data.email
              this.office_id = response.data.data.office_id
              this.modalLoader = false
              this.disabled = false
          }).catch( error => {
              console.log( error )
          })
      },
      clearInputs(){
          this.name = ''
          this.country = ''
          this.role = ''
          this.status = ''
          this.email = ''
          this.password = ''
          this.$refs.form.resetValidation()
      },
      save( id = null ){
        if( this.$refs.form.validate() ){
          var data = {
            name: this.name,
            country: this.country,
            role: this.role,
            status: this.status,
            email: this.email,
            password: this.password,
            office_id: this.office_id
          }
          this.saveLoader = true
          if( ! this.isEdit ){  
            axios.post( 'user/', data ).then( response => {
                this.snackbar = { show: true, text: 'Usuario agregado con éxito', color: 'success',icon:'fa fa-check' }
                this.saveLoader = false
                this.basic.dialog = false
                this.clearInputs()
                this.getList()
            }).catch( error => {
                console.log( error )
            })
          } else {
              axios.put( 'user/' + this.id, data ).then( response => {
                  this.snackbar = { show: true, text: 'Usuario editado con éxito', color: 'success',icon:'fa fa-check' }
                  this.saveLoader = false
                  this.getList()
                  this.saveLoader = false
              }).catch( error => {
                  console.log( error )
              })
          }
        }
      }
  }
};
</script>