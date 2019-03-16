<template>
  <div id="SubCategories">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12>

           
              <v-dialog v-model="basic.dialog" persistent max-width="500px">
                <v-card>
                  <v-card-title>
                      <v-layout row>
                          <v-flex lg-10 xs-10 md-10>
                            <span class="headline" v-if="isEdit == false">Nueva subcategoría</span>
                            <span class="headline" v-if="isEdit">Editar subcategoría</span>
                          </v-flex>
                          <v-flex lg-2 xs-2 md-2 style="text-align: right">
                            <v-progress-circular indeterminate v-if="modalLoader == true" :size="30" color="primary"></v-progress-circular>
                          </v-flex>
                      </v-layout>
                    </v-card-title>
                      <v-divider></v-divider>
                      <v-form>
                        <v-card-text>
                          <v-container grid-list-md>
                            <v-layout wrap>
                              <v-flex xs12 sm12 md12>
                                <v-text-field v-model="name" :disabled="disabled" label="Nombre" :rules="[rules.required]"></v-text-field>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <v-select
                                    label="Select"
                                    :items="selectCategory"
                                    v-model="category_id"
                                    required
                                    :rules="[() => select.length > 0 || 'You must choose at least one']"
                                    item-text="name"
                                    item-value="id"     
                                    ></v-select>
                              </v-flex>
                              <v-flex xs12 sm12 md12>
                                <v-text-field
                                  v-model="description" :disabled="disabled"
                                  label="Descripción"
                                  multi-line
                                ></v-text-field>
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
                  <td>{{ props.item.category.name }}</td>    
                  <td>{{ props.item.description }}</td>
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
      description: '',
      category_id: 0,
      selectCategory: [],
      rules: {
        required: (value) => !!value || 'Campo requerido.'
      },
      appEvents: [],
      complex: {
        headers: [
          {
            text: 'Nombre de la Subcategoría',
            value: 'name'
          },
          {
            text: 'Categoría',
            value: 'category.name'
          },
          {
            text: 'Descripción',
            value: 'description'
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
  mounted (){
   this.getList()
   this.getCategories()
  },
  methods: {
      getList(){
          this.generalLoader = true
          axios.get( 'subcategory' ).then( response => {
              this.complex.items = response.data.items
              this.generalLoader = false
          }). catch( error => {
              console.log( error )
          })
      },
      getCategories(){
          axios.get( 'category' ).then( response => {
              this.selectCategory = response.data.items
          })
      },
      remove( id ){
        this.$confirm('¿Realmente quieres eliminar este elemento?').then( res => { 
          if( res ){
            this.generalLoader = true
            axios.delete( 'subcategory/' + id ).then( response => {
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
          axios.get( 'subcategory/' + id ).then( response => {
              this.id = response.data.data.id
              this.name = response.data.data.name
              this.description = response.data.data.description
              this.category_id = response.data.data.category_id
              this.modalLoader = false
              this.disabled = false
          }).catch( error => {
              console.log( error )
          })
      },
      clearInputs(){
          this.name = ''
          this.description = ''
          this.category_id = ''
      },
      save( id = null ){
          var data = {
            name: this.name,
            description: this.description,
            category_id: this.category_id
          }
          this.saveLoader = true
          if( ! this.isEdit ){
              axios.get( 'subcategory/check-item/' + data.name ).then( response => {
                if( response.data.status ){
                  axios.post( 'subcategory/', data ).then( response => {
                      this.snackbar = { show: true, text: 'Subcategoría agregada con éxito', color: 'success',icon:'fa fa-check' }
                      this.saveLoader = false
                      this.basic.dialog = false
                      this.name = ''
                      this.description = ''
                      this.category_id = ''
                      this.getList()
                  }).catch( error => {
                      console.log( error )
                  })
                } else {
                  this.saveLoader = false
                  this.snackbar = { show: true, text: 'Esta Subcategoría ya existe', color: 'error',icon:'fa fa-warning' }
                }
              })
          } else {
              axios.put( 'subcategory/' + this.id, data ).then( response => {
                  this.snackbar = { show: true, text: 'Subcategoría editada con éxito', color: 'success',icon:'fa fa-check' }
                  this.saveLoader = false
                  this.getList()
                  this.saveLoader = false
              }).catch( error => {
                  console.log( error )
              })
          }
      }
  }
};
</script>