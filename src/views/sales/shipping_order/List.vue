<template>
    <div id="shippingOrder">
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
                            class="hidden-sm-and-down">
                        </v-text-field>  
                        <v-btn color="success" @click="create()" flat>
                            <i class="fa fa-plus"></i>&nbsp;
                            Crear
                        </v-btn>         
                    </v-toolbar>

                    <v-data-table
                        :headers="complex.headers"
                        :search="search"
                        :items="complex.items"
                        :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"

                        item-key="name"
                        >
                        <template slot="items" slot-scope="props">
                        <td>{{ props.item.tracking }}</td>
                        <td>{{ props.item.package.tracking }}</td>
                        <td @click="editClient( props.item.clients_id )" style="cursor: pointer" class="hover">
                            {{ props.item.clients.shipper }}
                        </td>
                        <td @click="editAfiliated( props.item.client_afiliated_id )" style="cursor: pointer" class="hover">
                            {{ props.item.client_afiliated.destination_name }}
                        </td>
                        <td>{{ props.item.package.out_date }}</td>
                        <td>
                            <v-btn depressed outline icon fab dark color="primary" small @click="view( props.item.id )">
                                <v-icon>fa fa-eye</v-icon>
                            </v-btn>
                        </td>
                        </template>
                    </v-data-table>
                </v-flex>
            </v-layout>
        </v-container>

        <v-dialog v-model="basic.dialogClient" max-width="800px">
            <v-card>
              <v-card-title>
                <v-layout row>
                  <v-flex lg-10 xs-10 md-10>
                    <span class="headline">Editar Datos del cliente</span>
                  </v-flex>
                  <v-flex lg-2 xs-2 md-2 style="text-align: right">
                    <v-progress-circular indeterminate v-if="modalLoader == true" :size="30" color="primary"></v-progress-circular>
                  </v-flex>
                </v-layout>
              </v-card-title>
              <v-divider></v-divider>
              <v-form 
                ref="formClient"
                lazy-validation>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs4 sm4 md4>
                        <v-select
                          label="Documento"
                          :items="basic.doc_types"
                          v-model="client.doc_type"
                          item-text="text"
                          disabled
                          item-value="value"     
                          :rules="[v => !!v || 'Campo requerido']"
                        ></v-select>
                      </v-flex>
                      <v-flex xs8 sm3 md3>
                        <v-text-field v-model="client.number" 
                          :disabled="disabled" 
                          disabled
                          :rules="[v => !!v || 'Campo requerido']"
                          label="Número">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm5 md5>
                        <v-text-field v-model="client.shipper" 
                          :disabled="disabled" 
                          disabled
                          :rules="onlyText"
                          label="Nombre y Apellido">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-text-field v-model="client.contact_person" 
                          :disabled="disabled"
                          :rules="onlyText"
                          label="Persona de Contacto">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-text-field v-model="client.phone" 
                          :disabled="disabled" 
                          :rules="[v => !!v || 'Campo requerido']"
                          label="Número telefónico">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field v-model="client.email" 
                          :disabled="disabled"
                          label="Correo Electrónico">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field v-model="client.address" 
                          :disabled="disabled" 
                          :rules="[v => !!v || 'Campo requerido']" 
                          label="Dirección">
                        </v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-select
                          label="País"
                          :items="basic.countries"
                          v-model="client.country"
                          item-text="label"
                          item-value="value" 
                          :rules="[v => !!v || 'Campo requerido']">
                        </v-select>
                      </v-flex>
                      <v-flex xs12 sm6 md6>
                        <v-text-field v-model="client.city"
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
                    @click.native="basic.dialogClient = false">
                    Cerrar
                  </v-btn>
                  <v-btn color="success" 
                    :loading="saveLoader" 
                    :disabled="saveLoader" 
                    @click="validateClient()">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
        </v-dialog>

        <v-dialog v-model="basic.dialogAfiliate" max-width="800px">
              <v-card>
                  <v-card-title>
                      <span class="headline">Editar Afiliado</span>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                      <v-form 
                        ref="formAfiliated"
                        lazy-validation>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs4 sm2 md2>
                                    <v-select
                                    label="Documento"
                                    :items="basic.doc_types"
                                    v-model="afiliated.doc_type"
                                    disabled
                                    item-text="text"
                                    item-value="value"     
                                    :rules="[v => !!v || 'Campo requerido']"
                                    ></v-select>
                                </v-flex>
                                <v-flex xs9 sm4 md4>
                                    <v-text-field v-model="afiliated.number" 
                                    :disabled="disabled" 
                                    disabled
                                    :rules="[v => !!v || 'Campo requerido']"
                                    label="Número">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="afiliated.destination_name" 
                                    :disabled="disabled" 
                                    disabled
                                    :rules="onlyText"
                                    label="Destinatario">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="afiliated.attention" 
                                    :disabled="disabled"
                                    :rules="onlyText"
                                    label="Atención">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="afiliated.phone" 
                                    :disabled="disabled" 
                                    :rules="[v => !!v || 'Campo requerido']"
                                    label="Número telefónico">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="afiliated.email" 
                                    :disabled="disabled"
                                    label="Correo Electrónico">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="afiliated.address" 
                                    :disabled="disabled" 
                                    :rules="[v => !!v || 'Campo requerido']" 
                                    label="Dirección">
                                    </v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-select
                                    label="País"
                                    :items="basic.countries"
                                    v-model="afiliated.country"
                                    item-text="label"
                                    item-value="value" 
                                    :rules="[v => !!v || 'Campo requerido']">
                                    </v-select>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="afiliated.city"
                                    :disabled="disabled"
                                    :rules="onlyText"
                                    label="Ciudad">
                                    </v-text-field>
                                </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" 
                            @click.native="basic.dialogAfiliate = false">
                            Cerrar
                        </v-btn>
                        <v-btn color="success" @click="validateAfiliated()">
                            Guardar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>



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
    </div>
</template>

<script>
import axios from '@/api/config'
import countriesList from '@/api/paisesymonedas'

export default {
    data () {
        return {
            search: '',
            disabled: false,
            modalLoader: false,
            saveLoader: false,
            snackbar: {
                show: false,
                text: '',
                color: '',
                icon: ''
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
            basic: {
                dialogClient: false,
                dialogAfiliate: false,
                doc_types: [
                    { value: "1", text: 'PTP' },
                    { value: "2", text: 'DNI' },
                    { value: "3", text: 'Pasaporte' },
                    { value: "4", text: 'C.E.' },
                    { value: "5", text: 'C.I.' }       
                ],
                countries: countriesList.pais
            },
            client: {
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
            afiliated: {
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
            },
            snackbar: {
                show: false,
                text: '',
                color: '',
                icon: ''
            },
            complex: {
            headers: [
            {
                text: 'Tracking',
                value: 'tracking'
            },
            {
                text: 'Tracking Paquete Asociado',
                value: 'package.tracking'
            },
            {
                text: 'Remitente',
                value: 'clients.shipper'
            },
            {
                text: 'Destinatario',
                value: 'client_afiliated.destination_name'
            },
            {
                text: 'Fecha de salida',
                value: 'out_date'
            },
            {
                text: '',
                value: ''
            }
            ],
            items: []
        },
        }
    },
    created() {
        this.getOrders()
    },
    methods: {
        editClient( id ){
          this.basic.dialogClient = true
          this.modalLoader = true
          this.disabled = true
          axios.get( 'clients/' + id ).then( response => {
              this.client.id = response.data.data.id
              this.client.shipper = response.data.data.shipper
              this.client.doc_type = response.data.data.doc_type
              this.client.number = response.data.data.number
              this.client.contact_person = response.data.data.contact_person
              this.client.address = response.data.data.address
              this.client.country = response.data.data.country
              this.client.city = response.data.data.city
              this.client.phone = response.data.data.phone
              this.client.email = response.data.data.email
              this.modalLoader = false
              this.disabled = false
          }).catch( error => {
              this.snackbar = { show: true, text: error, color: 'danger', icon:'fa fa-check' }
          })
        },
        create(){
            this.$router.push({ path: '/ordenes-de-envios/crear' })
        },
        getOrders(){
            axios.get( 'ship-order' ).then( response => {
                this.complex.items = response.data.items
            })
        },
        view( id ){
            this.$router.push({ name: 'shipOrderView', params: { id: id } })
        },
        validateClient(){
            if( this.$refs.formClient.validate() ){
                this.saveClient()
            }
        },
        saveClient(){
             var data = {
                shipper: this.client.shipper,
                doc_type: this.client.doc_type,
                number: this.client.number,
                contact_person: this.client.contact_person,
                address: this.client.address,
                country: this.client.country,
                city: this.client.city,
                phone: this.client.phone,
                email: this.client.email     
            }
            this.saveLoader = true
            axios.put( 'clients/' + this.client.id, data ).then( response => {
              if( response.data.status ){
                  this.snackbar = { show: true, text: response.data.response, color: 'success', icon:'fa fa-check' }
                  this.basic.dialogClient = false
              } else {
                  this.snackbar = { show: true, text: response.data.response, color: 'danger', icon:'fa fa-exclamation-triangle' }
              }
                this.saveLoader = false
            }).catch( error => {
                this.snackbar = { show: true, text: error, color: 'danger', icon:'fa fa-exclamation-triangle' }
            })
        },
        editAfiliated( id ){
            this.basic.dialogAfiliate = true
            this.modalLoader = true
            this.disabled = true
            axios.get( 'afiliated/' + id ).then( response => {
                this.afiliated.id = response.data.data.id
                this.afiliated.destination_name = response.data.data.destination_name
                this.afiliated.doc_type = response.data.data.doc_type
                this.afiliated.number = response.data.data.number
                this.afiliated.attention = response.data.data.attention
                this.afiliated.address = response.data.data.address
                this.afiliated.country = response.data.data.country
                this.afiliated.city = response.data.data.city
                this.afiliated.phone = response.data.data.phone
                this.afiliated.email = response.data.data.email
                this.modalLoader = false
                this.disabled = false
            }).catch( error => {
                this.snackbar = { show: true, text: error, color: 'danger', icon:'fa fa-exclamation-triangle' }
            })
        },
        validateAfiliated(){
            if( this.$refs.formAfiliated.validate() ){
                this.saveAfiliated()
            }
        },
        saveAfiliated(){
            this.saveLoader = true
            var data = {
                destination_name: this.afiliated.destination_name,
                doc_type: this.afiliated.doc_type,
                number: this.afiliated.number,
                attention: this.afiliated.attention,
                address: this.afiliated.address,
                country: this.afiliated.country,
                city: this.afiliated.city,
                phone: this.afiliated.phone,
                email: this.afiliated.email,
            }
            axios.put( 'afiliated/' + this.afiliated.id, data ).then( response => {
                if( response.data.status ){
                  this.snackbar = { show: true, text: response.data.response, color: 'success', icon:'fa fa-check' }
                  this.basic.dialogAfiliate = false
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
</script>

<style scoped>
    .hover:hover{
        background: rgb( 210,210,210 );
    }
</style>