<template>
  <div id="pageDashboard">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex md8 sm12>
          <v-card>
            <v-card-title>
              <h4>
                Salidas programadas para hoy
              </h4>
            </v-card-title>
            <v-card-title>
              <div v-if="statistics.outs.length > 0">
                <v-expansion-panel>
                  <v-expansion-panel-content
                    v-for="item in statistics.outs">
                    <template v-slot:header>
                      <div>
                        Tracking: {{ item.tracking }} | De {{ item.out_place }} Hacia {{ item.arriving_place}}
                        &nbsp;&nbsp;&nbsp;
                      </div>
                    </template>
                    <v-card>
                      <v-card-text>
                        <h5>Ordenes de envíos asociadas</h5>
                        <div class="table-responsive">
                          <table class="table">
                            <thead>
                              <tr>
                                <th>Tracking</th>
                                <th>Remitente</th>
                                <th>Destinatario</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="items in item.packages">
                                <td> {{ items.tracking }} </td>
                                <td> {{ items.clients.contact_person }}</td>
                                <td> {{ items.client_afiliated.attention }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </div>
              <div style="text-align: center; margin: 0 auto">
                <h2>
                  <i class="fa fa-exclamation-triangle" style="font-size: 45px;"></i><br>
                  ¡No hay salidas registradas para hoy!
                </h2>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex md4 sm12>
          <v-card>
            <v-card-title>
              <div style="margin: 0 auto; text-align: center">
                <h4>
                  Ordenes de envíos recibidas hoy
                </h4>
              </div>
            </v-card-title>
            <v-card-title>
              <div style="margin: 0 auto; text-align: center">
                <h4 style="font-size: 90px">
                  {{ statistics.orders }}
                </h4>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from '@/api/config'

export default {
  data() {
    return {
      today: new Date().toLocaleDateString().slice(0,10),
      statistics: {
        outs: [],
        orders: ''
      }
    }
  },
  created() {
    this.getOutsToday()
    this.getShipsToday()
  },
  methods: {
    getOutsToday(){
      axios.get( 'pck-by-day-get' ).then( response => {
        this.statistics.outs = response.data.items
      })
    },
    getShipsToday(){
      axios.get( 'so-day-get' ).then( response => {
        this.statistics.orders = response.data.items
      })
    }
  },
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