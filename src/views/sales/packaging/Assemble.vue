<template>
  <v-container fluid>
    <input
      ref="excel-upload-input"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleClick"
    />
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      Arroja aqui tus archivos excel o búscalo en tu ordenador
      <v-btn :loading="loading" @click="handleUpload" flat color="dark" icon>
        <v-icon>search</v-icon>
      </v-btn>
    </div>

    <v-card class="mt-3" flat style="border-radius: 0">
      <v-card-text class="pt-0 pb-0">
        <v-layout row wrap>
          <v-flex sm6>
            <h5 style="display: inline-block;" class="mt-3">Nueva data | Encomiendas</h5>
            <v-tooltip bottom color="success">
              <template v-slot:activator="{ on }">
                <v-btn flat icon color="success" v-on="on" :loading="loading" @click="save()">
                  <v-icon>cloud_upload</v-icon>
                </v-btn>
              </template>
              <span>Guardar registros</span>
            </v-tooltip>
          </v-flex>
          <v-flex sm6>
            <v-text-field append-icon="search" label="Buscar..." v-model="search"></v-text-field>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
    <v-data-table
      :headers="dataTable.headers"
      :items="excelData.results"
      :search="search"
      :loading="listLoading"
    >
      <template v-slot:items="props">
        <td>{{ props.item.numero }}</td>
        <td>{{ props.item.fechasalida | formatDate }}</td>
        <td>{{ props.item.codigosede }}</td>
        <td>{{ props.item.boleta }}</td>
        <td>{{ props.item.destino }}</td>
        <td>{{ props.item.peso }}</td>
        <td>{{ props.item.contenido}}</td>
        <td>{{ props.item.destinario }}</td>
        <td>{{ props.item.telefono }}</td>
        <td>{{ props.item.documento }}</td>
        <td>{{ props.item.valor }}</td>
      </template>
    </v-data-table>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" bottom right :timeout="2000">
      <v-icon>{{ snackbar.icon }}</v-icon>
      &nbsp;
      {{ snackbar.text }}
      <v-btn flat @click="snackbar.show = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import XLSX from "xlsx";
import axios from "@/api/config";
import moment from 'moment'
export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function // eslint-disable-line
  },
  data() {
    return {
      listLoading: false,
      loading: false,
      search: "",
      snackbar: {
        icon: "",
        text: "",
        color: "",
        show: false
      },
      excelData: {
        header: null,
        results: []
      },
      dataTable: {
        headers: [
          {
            text: "N °",
            value: "numero"
          },
          {
            text: "Fecha de Salida",
            value: "fechasalida"
          },
          {
            text: "Codigo Sede",
            value: "codigosede"
          },
          {
            text: "Boleta - Guia",
            value: "boleta"
          },
           {
            text: "Destino",
            value: "boleta"
          },
          {
            text: "Peso",
            value: "peso"
          },
          {
            text: "Contenido",
            value: "contenido"
          },
          {
            text: "Destinario",
            value: "destinario"
          },
          {
            text: "Telefono",
            value: "telefono"
          },
          {
            text: "Doc. identidad",
            value: "documento"
          },
          {
            text: "Valor Encomienda",
            value: "valor"
          }
        ]
      }
    };
  },
  filters: {
    formatDate: function(date) {
      if (date != null && date != "") {
          var utc_days  = Math.floor(date - 25569);
          var utc_value = utc_days * 86400;                                        
          var date_info = new Date(utc_value * 1000);
          return moment(date_info).format("DD/MM/YYYY");
      }
    }
  },
  methods: {
    generateData({ header, results }) {
      this.excelData.header = header;
      this.excelData.results = results;
      this.onSuccess && this.onSuccess(this.excelData);
    },
    handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.loading) return;
      const files = e.dataTransfer.files;
      if (files.length !== 1) {
        this.$message.error("Only support uploading one file!");
        return;
      }
      const rawFile = files[0]; // only use files[0]
      if (!this.isExcel(rawFile)) {
        this.$message.error(
          "Only supports upload .xlsx, .xls, .csv suffix files"
        );
        return false;
      }
      this.upload(rawFile);
      e.stopPropagation();
      e.preventDefault();
    },
    handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    handleUpload() {
      this.$refs["excel-upload-input"].click();
    },
    handleClick(e) {
      const files = e.target.files;
      const rawFile = files[0]; // only use files[0]
      if (!rawFile) return;
      this.upload(rawFile);
    },
    upload(rawFile) {
      this.$refs["excel-upload-input"].value = null; // fix can't select the same excel
      if (!this.beforeUpload) {
        this.readerData(rawFile);
        return;
      }
      const before = this.beforeUpload(rawFile);
      if (before) {
        this.readerData(rawFile);
      }
    },
    readerData(rawFile) {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
          const data = e.target.result;
          const fixedData = this.fixData(data);
          const workbook = XLSX.read(btoa(fixedData), { type: "base64" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const header = this.getHeaderRow(worksheet);
          const results = XLSX.utils.sheet_to_json(worksheet);
          this.generateData({ header, results });
          this.loading = false;
          resolve();
        };
        reader.readAsArrayBuffer(rawFile);
      });
    },
    fixData(data) {
      let o = "";
      let l = 0;
      const w = 10240;
      for (; l < data.byteLength / w; ++l)
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w))
        );
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    },
    getHeaderRow(sheet) {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet["!ref"]);
      let C;
      const R = range.s.r;
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        /* find the cell in the first row */
        let hdr = "UNKNOWN " + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers;
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name);
    },
    formatDateF(date) {
      if (date != null && date != "") {
          var utc_days  = Math.floor(date - 25569);
          var utc_value = utc_days * 86400;                                        
          var date_info = new Date(utc_value * 1000);
          return moment(date_info).format("DD/MM/YYYY");
      }
    },
    save() {
      this.loading = true;
      if (this.excelData.results.length > 0) {
        for (var i = 0; i < this.excelData.results.length; i++) {
           var data = {
              boleta: this.excelData.results[i].boleta,
              codigosede: this.excelData.results[i].codigosede,
              contenido: this.excelData.results[i].contenido,
              destinario: this.excelData.results[i].destinario,
              destino: this.excelData.results[i].destino,
              documento: this.excelData.results[i].documento,
              fechasalida:  this.formatDateF( this.excelData.results[i].fechasalida),
              numero: this.excelData.results[i].numero,
              peso: this.excelData.results[i].peso,
              telefono: this.excelData.results[i].telefono,
              valor: this.excelData.results[i].valor,
            };
            console.log(data);
          axios
          .post("ship-order-masivo", data)
          .then(response => {
            if (response.data.status) {
              this.snackbar = {
                icon: "check_circle",
                text: "¡Registros guardados con éxito!",
                color: "success",
                show: true
              };
            } else {
              this.snackbar = {
                icon: "error",
                text: "Ocurrió un error en el servidor...",
                color: "error",
                show: true
              };
            }
          })
          .catch(error => {
            this.snackbar = {
              icon: "error",
              text: error,
              color: "error",
              show: true
            };
          })
          .finally(() => {
            this.loading = false;
          });
        }
      } else {
        this.snackbar = {
          icon: "error",
          text: "¡Debe seleccionar un archivo excel primero!",
          color: "warning",
          show: true
        };
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.excel-upload-input {
  width: 100%;
  display: none;
  z-index: -9999;
}
.drop {
  border: 2px dashed #bbb;
  width: 100%;
  padding: 0.75rem;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>