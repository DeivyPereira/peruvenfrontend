<template>
    <div>
        <v-container grid-list-md fluid v-if="order.length != []">
            <v-card>
                <v-card-text>
                    <v-layout row wrap>
                        <v-flex lg12 md12 sm6 xs12>
                            <h4 v-if="order.modality == 1">Pago en el Origen</h4>
                            <h4 v-if="order.modality == 2">Cobro en Destino</h4>
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
                            <strong>Fecha de salida</strong>&nbsp;
                            {{ order.out_date }}<br>
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
                                            <th>Categorias</th>
                                            <th>Unidades</th>
                                            <th>Costo Unitario</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="items in order.products" :key="items.package">
                                            <td>{{ items.package }}</td>
                                            <td>{{ items.description }}</td>
                                            <td>
                                                {{ items.category.name }}<br>
                                                <small>{{ items.subcategory.name }}</small>
                                            </td>
                                            <td>{{ items.qty }}</td>
                                            <td v-if="items.weight == ''">{{ items.price }} {{ order.currency }}</td>
                                            <td v-if="items.weight != ''">{{ items.weight }} Kg</td>
                                            <td>{{ items.subtotal }} {{ order.currency }}</td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: right">
                                                <strong>
                                                    Kilos:
                                                </strong>
                                            </td>
                                            <td>
                                                {{ weight }}
                                            </td>
                                            <td></td>
                                            <td style="text-align: right">
                                                <strong>
                                                    Total:
                                                </strong>
                                            </td>
                                            <td>
                                                {{ order.total }} {{ order.currency }}
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
                            <strong>Fecha:</strong>&nbsp;
                            {{ order.date }}
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
                this.order = response.data.items[0]
                console.log(this.order)
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