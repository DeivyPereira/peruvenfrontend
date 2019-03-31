<template>
    <div>
        <v-container grid-list-md fluid v-if="order.length != []">
            <v-card>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex lg6 md6 sm12 xs12>
                            <h4 v-if="order.modality == 1">
                                Modalidad:&nbsp;
                                <strong>Pago en el Origen</strong>
                            </h4>
                            <h4 v-if="order.modality == 2">
                                Modalidad&nbsp;
                                <strong>Cobro en Destino</strong>
                            </h4>
                        </v-flex>
                        <v-flex lg6 md6 sm12 xs12>
                            <h4>
                                Tracking del Paquete:&nbsp; 
                                <strong>{{ order.package.tracking }}</strong>
                            </h4>
                        </v-flex>
                        <v-flex lg5 md5 sm12>
                            <h4>Origen</h4>
                            <strong>Remitente:</strong>&nbsp;
                            {{ order.clients.shipper }}<br>
                            <strong>Persona de Contacto:</strong>&nbsp;
                            {{ order.clients.contact_person }}<br>
                            <strong>Dirección:</strong>&nbsp;
                            {{ order.clients.address }}<br>
                            <strong>País:</strong>&nbsp;
                            {{ order.clients.country }}<br>
                            <strong>Teléfono:</strong>&nbsp;
                            {{ order.clients.phone }}<br>
                            <strong>Correo Electrónico:</strong>&nbsp;
                            {{ order.clients.email }}<br>
                            <strong>Código Postal / ZIP:</strong>&nbsp;
                            {{ order.clients.zip }}<br>
                            <strong>Airwaybill:</strong>&nbsp;
                            {{ order.airwaybill }}<br>
                            <strong>Fecha de salida:</strong>&nbsp;
                            {{ order.package.out_date }}<br>
                        </v-flex>
                        <v-flex lg5 md5 sm5 xs12>
                            <h4>Destino</h4>
                            <strong>Destinatario:</strong>&nbsp;
                            {{ order.client_afiliated.destination_name }}<br>
                            <strong>Atención:</strong>&nbsp;
                            {{ order.client_afiliated.attention }}<br>
                            <strong>Dirección:</strong>&nbsp;
                            {{ order.client_afiliated.address }}<br>
                            <strong>País:</strong>&nbsp;
                            {{ order.client_afiliated.country }}<br>
                            <strong>Teléfono:</strong>&nbsp;
                            {{ order.client_afiliated.phone }}<br>
                            <strong>Correo Elecrónico:</strong>&nbsp;
                            {{ order.client_afiliated.email }}<br>
                            <strong>Código Postal / ZIP:</strong>&nbsp;
                            {{ order.client_afiliated.zip }}<br>
                            <strong>Oficina Tealca:</strong>&nbsp;
                            {{ order.tealca_office }}<br>
                            <strong>Código Tealca:</strong>&nbsp;
                            {{ order.tealca_code }}<br>
                        </v-flex>
                        <v-flex lg2 md2 sm2 xs12>
							 <strong style="padding-left: 8px;">Tracking:</strong>#{{ order.id }}
							<img :src='ImgQr(order.id)' width="70%">
						</v-flex>
                        <v-spacer></v-spacer>
                        <v-flex lg12 md12 sm12>
                            <div class="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Paquete N°</th>
                                            <th>Descripción del bien</th>
                                            <th>Categorización</th>
                                            <th>Unidades</th>
                                            <th>Costo Unitario</th>
                                            <th>Porcentaje por seguro</th>
                                            <th>Subtotal</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="items in order.products" :key="items.id">
                                            <td>{{ items.package }}</td>
                                            <td>{{ items.description }}</td>
                                            
                                            <td>
                                                {{ items.category_name }}<br>
                                                <small>{{ items.subcategory_name }}</small>
                                            </td>

                                            <td v-if="items.weight == undefined">{{ items.qty }} Und</td>
                                            <td v-if="items.weight != undefined">{{ items.weight }} Kg</td>
                                            
                                            <td v-if="items.weight == undefined">{{ items.subtotal }} {{ order.currency }}</td>
                                            <td v-if="items.weight != undefined">{{ items.kilo_value }} {{ order.currency }}</td>
                                            
                                            <td v-if="order.ensurance == 0">NO ASEGURADO</td>
                                            <td v-if="order.ensurance == 1">{{ items.ensurance_value }} %</td>

                                            <td>{{ items.price }} {{ order.currency }}</td>
                                            <td></td>
                                        </tr>

                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td style="background: rgb( 230,230,230 ); text-align: right">
                                                <strong>
                                                    Impuestos:
                                                </strong>
                                            </td>
                                            <td style="background: rgb( 230,230,230 );"></td>
                                            <td style="background: rgb( 230,230,230 );"></td>
                                        </tr>

                                        <tr v-for="items in order.taxes" :key="items.id">
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td style="text-align: right">
                                                <strong>
                                                    {{ items.tax.name }}:
                                                </strong>
                                            </td>
                                            <td style="text-align: right">
                                                {{ items.billing_value }}
                                            </td>
                                            <td>
                                                %
                                            </td>
                                        </tr> 

                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td style="background: rgb( 230,230,230 ); text-align: right">
                                                <strong>
                                                    Total:
                                                </strong>
                                            </td>
                                            <td style="background: rgb( 230,230,230 ); text-align: right">
                                                {{ order.total }}
                                            </td>
                                            <td style="background: rgb( 230,230,230 );">
                                                {{ order.currency }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </v-flex>
                        <v-flex lg12 md12 sm12>
                            <strong>Razón de exportación</strong><br>
                            {{ order.reason }}
                        </v-flex>
                        <v-flex lg6 md6 sm12>
                            <strong>Nombre:</strong>&nbsp;
                            {{ order.name }}<br>
                            <strong>Posición:</strong>&nbsp;
                            {{ order.position }}<br>
                        </v-flex>
                        <v-flex lg6 md6 sm12>
                            <strong>Fecha de llegada:</strong>&nbsp;
                            {{ order.arriving_date }}
                        </v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="error" @click="cancel()">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import axios from '@/api/config'

export default {
    data() {
        return {
            order: [],
            weight: 3000
        }
    },
    created() {
        if( this.checkParam() ){
            this.getOrder()
        }
    },
    methods: {
        checkParam(){
            if( this.$route.params.id == undefined ){
                this.$router.push('/ordenes-de-envios/listado')
            } else {
                return true
            }
        },
        getOrder(){
            axios.get( 'ship-order/' + this.$route.params.id ).then( response => {
                this.order = response.data.items
            })
        },
        cancel(){
            this.$router.push('/ordenes-de-envios/listado')
        },
		ImgQr(id){
			return 'http://104.197.180.47/peruven/api/uploads/qr/'+ id +'.png';
		}
    }
}
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