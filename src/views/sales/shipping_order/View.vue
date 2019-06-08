<template>
  <div>
    <v-container grid-list-md fluid v-if="order.length != []">
      <v-card>
        <v-card-text id="printMe">
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
                <strong>{{ order.tracking }}</strong>
              </h4>
            </v-flex>
            <v-flex lg5 md5 sm12>
              <h4>Origen</h4>
              <strong>Remitente:</strong>
              &nbsp;
              {{ order.clients.shipper }}
              <br>
              <strong>Persona de Contacto:</strong>
              &nbsp;
              {{ order.clients.contact_person }}
              <br>
              <strong>Dirección:</strong>
              &nbsp;
              {{ order.clients.address }}
              <br>
              <strong>País:</strong>
              &nbsp;
              {{ order.clients.country }}
              <br>
              <strong>Ciudad:</strong>
              &nbsp;
              {{ order.clients.city }}
              <br>
              <strong>Teléfono:</strong>
              &nbsp;
              {{ order.clients.phone }}
              <br>
              <strong>Correo Electrónico:</strong>
              &nbsp;
              {{ order.clients.email }}
              <br>
              <strong>Fecha de salida:</strong>
              &nbsp;
              {{ order.package.out_date }}
              <br>
            </v-flex>
            <v-flex lg5 md5 sm5 xs12>
              <h4>Destino</h4>
              <strong>Destinatario:</strong>
              &nbsp;
              {{ order.client_afiliated.destination_name }}
              <br>
              <strong>Atención:</strong>
              &nbsp;
              {{ order.client_afiliated.attention }}
              <br>
              <strong>Dirección:</strong>
              &nbsp;
              {{ order.client_afiliated.address }}
              <br>
              <strong>País:</strong>
              &nbsp;
              {{ order.client_afiliated.country }}
              <br>
              <strong>Ciudad:</strong>
              &nbsp;
              {{ order.client_afiliated.city }}
              <br>
              <strong>Oficina Tealca:</strong>
              &nbsp;
              {{ order.tealca_office }}
              <br>
              <strong>Dirección Oficina Tealca:</strong>
              &nbsp;
              {{ order.tealca_direction }}
              <br>
              <strong>Teléfono:</strong>
              &nbsp;
              {{ order.client_afiliated.phone }}
              <br>
              <strong>Correo Elecrónico:</strong>
              &nbsp;
              {{ order.client_afiliated.email }}
              <br>
            </v-flex>
            <v-flex lg2 md2 sm2 xs12>
              <img :src="ImgQr(order.id)" width="70%">
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
                      <th>Item asegurado</th>
                      <th>Costo del producto</th>
                      <th>Unidades</th>
                      <th>Peso</th>
                      <th>Seguro</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="items in order.products" :key="items.id">
                      <td>{{ items.package }}</td>
                      <td>{{ items.description }}</td>

                      <td>
                        {{ items.category_name }}
                        <br>
                        <small>{{ items.subcategory_name }}</small>
                      </td>
                      <td v-if="items.ensurance == 0">NO</td>
                      <td v-if="items.ensurance == 1">SI</td>
                      <td v-if="items.product_price != undefined">{{ items.product_price }} {{ order.currency_ensurance }}</td>
                      <td>{{ items.qty }} Und</td>
                      <td>{{ items.weight }} Kg</td>
                      <td>{{ items.price_ensurance }} {{ order.currency_ensurance }}</td>
                      <td></td>
                    </tr>

                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td style="background: rgb( 230,230,230 ); text-align: right">
                        <strong>Impuestos:</strong>
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
                        <strong>{{ items.tax.name }}:</strong>
                      </td>
                      <td style="text-align: right">{{ items.billing_value }}</td>
                      <td>%</td>
                    </tr>
                    
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td style="background: rgb( 230,230,230 ); text-align: right">
                        <strong>Peso Total:</strong>
                      </td>
                      <td
                        style="background: rgb( 230,230,230 ); text-align: right"
                      >{{ order.actual_weight }}</td>
                      <td style="background: rgb( 230,230,230 );">Kg</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td style="background: rgb( 230,230,230 ); text-align: right">
                        <strong>Peso a cobrar:</strong>
                      </td>
                      <td
                        style="background: rgb( 230,230,230 ); text-align: right"
                      >{{ order.weight }}</td>
                      <td style="background: rgb( 230,230,230 );">Kg</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td style="background: rgb( 230,230,230 ); text-align: right">
                        <strong>Precio por KG:</strong>
                      </td>
                      <td
                        style="background: rgb( 230,230,230 ); text-align: right"
                      >{{ order.kilo_value }}</td>
                      <td style="background: rgb( 230,230,230 );">{{ order.currency }}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td style="background: rgb( 230,230,230 ); text-align: right">
                        <strong>Total:</strong>
                      </td>
                      <td
                        style="background: rgb( 230,230,230 ); text-align: right"
                      >{{ order.total }}</td>
                      <td style="background: rgb( 230,230,230 );">{{ order.currency }}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td style="background: rgb( 230,230,230 ); text-align: right">
                        <strong>Total Seguro:</strong>
                      </td>
                      <td
                        style="background: rgb( 230,230,230 ); text-align: right"
                      >{{ order.total_ensurance }}</td>
                      <td style="background: rgb( 230,230,230 );">{{ order.currency_ensurance }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </v-flex>
            <v-flex lg12 md12 sm12>
              <strong>Razón de exportación</strong>
              <br>
              {{ order.reason }}
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="cancel()">Cerrar</v-btn>
          <v-btn color="info" @click="Comprobante(order.id)">Imprimir Comprobante</v-btn>
          <v-btn color="info" @click="Declaracion(order.id)">Imprimir Declaración</v-btn>
          <v-btn color="info"  @click="PackageList(order.id)">Imprimir Package List</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "@/api/config";
import Print from 'vue-print-nb'
export default {
  components: {
      Print
  },
  data() {
    return {
      order: [],
      weight: 3000
    };
  },
  created() {
    if (this.checkParam()) {
      this.getOrder();
    }
  },
  methods: {
    checkParam() {
      if (this.$route.params.id == undefined) {
        this.$router.push("/ordenes-de-envios/listado");
      } else {
        return true;
      }
    },
    getOrder() {
      axios.get("ship-order/" + this.$route.params.id).then(response => {
        this.order = response.data.items;
      });
    },
    cancel() {
      this.$router.push("/ordenes-de-envios/listado");
    },
    ImgQr(id) {
      return "https://www.enviosperuven.com/api/uploads/qr/" + id + ".png";
    },
    Comprobante(id) {
      window.open(
        "https://www.enviosperuven.com/api//printer-comprobante/" + id,
        "_blank"
      );
    },
    Declaracion(id) {
      window.open(
        "https://www.enviosperuven.com/api//printer-declaracion/" + id,
        "_blank"
      );
    },
    PackageList(id){
      window.open(
        "https://www.enviosperuven.com/api//printer-package/" + id,
        "_blank"
      );
    }
  }
};
</script>

<style scoped>
.table-responsive table {
  width: 100%;
}
th {
  padding: 10px;
  background: rgb(230, 230, 230);
}
.search-btn {
  display: block;
  width: 100%;
  padding: 0.95rem;
  border-bottom: solid 2px transparent;
  background: #fff;
  color: #555;
  outline: none;
  transition: ease 0.3s;
}
.search-btn:hover {
  background: rgb(230, 230, 230);
}
td {
  padding: 7px;
}
@media (max-width: 495px) {
  .table-responsive table {
    overflow-x: scroll;
  }
}
</style>