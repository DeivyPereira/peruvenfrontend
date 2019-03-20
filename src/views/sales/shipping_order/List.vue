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
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.clients.shipper }}</td>
                        <td>{{ props.item.client_afiliated.destination_name }}</td>
                        <td>{{ props.item.date }}</td>
                        <td>{{ props.item.out_date }}</td>
                        <td>
                            <v-btn depressed outline icon fab dark color="primary" small @click="view( props.item.id )">
                            <v-icon>fa fa-eye</v-icon>
                            </v-btn>
                           <!--
                            <v-btn depressed outline icon fab dark color="red" small @click="remove( props.item.id )">
                            <v-icon>delete</v-icon>
                            </v-btn>
                            -->
                        </td>
                        </template>
                    </v-data-table>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import axios from '@/api/config'

export default {
    data () {
        return {
            search: '',
            snackbar: {
                show: false,
                text: '',
                color: '',
                icon: ''
            },
            complex: {
            headers: [
            {
                text: 'Orden N°',
                value: 'id'
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
                text: 'Fecha',
                value: 'date'
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
        }
    }
}
</script>