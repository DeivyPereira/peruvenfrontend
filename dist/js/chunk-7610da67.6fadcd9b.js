(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7610da67"],{"1cd6":function(a,e,t){"use strict";t.r(e);var l=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{attrs:{id:"Tracking"}},[t("v-container",{attrs:{"grid-list-xl":"",fluid:""}},[t("v-layout",{attrs:{row:"",wrap:""}},[t("v-flex",{attrs:{lg12:""}},[t("v-dialog",{attrs:{persistent:"","max-width":"1024px"},model:{value:a.basic.dialog,callback:function(e){a.$set(a.basic,"dialog",e)},expression:"basic.dialog"}},[t("v-card",[t("v-card-title",[t("v-layout",{attrs:{row:""}},[t("v-flex",{staticStyle:{"text-align":"right"},attrs:{"lg-2":"","xs-2":"","md-2":""}},[1==a.modalLoader?t("v-progress-circular",{attrs:{indeterminate:"",size:30,color:"primary"}}):a._e()],1)],1)],1),t("v-divider"),t("v-form",{ref:"form"},[t("v-card-text",{staticStyle:{padding:"10px"}},[t("v-container",{attrs:{"grid-list-md":""}},[t("v-layout",{attrs:{wrap:""}},[t("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[t("v-text-field",{attrs:{disabled:"",label:"Tracking"},model:{value:a.tracking,callback:function(e){a.tracking=e},expression:"tracking"}})],1),t("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[t("v-text-field",{attrs:{label:"Ubicación Actual"},model:{value:a.location,callback:function(e){a.location=e},expression:"location"}})],1),t("v-flex",{attrs:{xs6:"",sm3:"",md3:""}},[t("v-text-field",{attrs:{label:"Latitud"},model:{value:a.lat,callback:function(e){a.lat=e},expression:"lat"}})],1),t("v-flex",{attrs:{xs6:"",sm3:"",md3:""}},[t("v-text-field",{attrs:{label:"Longitud"},model:{value:a.lng,callback:function(e){a.lng=e},expression:"lng"}})],1),t("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[t("v-select",{attrs:{label:"Estado Actual",items:a.basic.status,"item-text":"text","item-value":"value"},model:{value:a.status,callback:function(e){a.status=e},expression:"status"}})],1),t("v-flex",{attrs:{xs12:"",sm12:"",md12:""}},[t("v-textarea",{attrs:{label:"Descripción"},model:{value:a.description,callback:function(e){a.description=e},expression:"description"}})],1)],1)],1)],1),t("v-card-actions",[t("v-spacer"),t("v-btn",{attrs:{color:"error"},nativeOn:{click:function(e){a.basic.dialog=!1}}},[a._v("Cerrar")]),t("v-btn",{attrs:{color:"success",loading:a.saveLoader,disabled:a.saveLoader},on:{click:function(e){return a.save()}}},[a._v("Guardar")])],1)],1)],1)],1),t("v-toolbar",{attrs:{card:"",color:"white"}},[t("v-text-field",{staticClass:"hidden-sm-and-down",attrs:{flat:"",solo:"","prepend-icon":"search",placeholder:"Buscar...","hide-details":""},model:{value:a.search,callback:function(e){a.search=e},expression:"search"}})],1),1==a.generalLoader?t("v-progress-circular",{staticStyle:{position:"fixed",bottom:"10%",right:"5%"},attrs:{indeterminate:"",size:40,color:"primary"}}):a._e(),t("v-data-table",{attrs:{headers:a.complex.headers,search:a.search,items:a.complex.items,"rows-per-page-items":[10,25,50,{text:"All",value:-1}],"item-key":"name"},scopedSlots:a._u([{key:"items",fn:function(e){return[t("td",[a._v(a._s(e.item.package.tracking))]),t("td",[a._v(a._s(a._f("statusFilter")(e.item.status)))]),t("td",[a._v(a._s(e.item.location))]),t("td",[a._v(a._s(e.item.package.out_date))]),t("td",[a._v(a._s(e.item.package.arriving_date))]),t("td",[t("v-btn",{attrs:{depressed:"",outline:"",icon:"",fab:"",dark:"",color:"primary",small:""},on:{click:function(t){return a.edit(e.item.id)}}},[t("v-icon",[a._v("edit")])],1)],1)]}}])})],1)],1)],1),t("v-snackbar",{attrs:{timeout:3e3,top:"",right:"",color:a.snackbar.color},model:{value:a.snackbar.show,callback:function(e){a.$set(a.snackbar,"show",e)},expression:"snackbar.show"}},[t("p",{staticStyle:{margin:"0"}},[t("i",{class:a.snackbar.icon}),a._v(" \n    "+a._s(a.snackbar.text)+"\n  ")]),t("v-btn",{attrs:{dark:"",flat:"",icon:""},nativeOn:{click:function(e){a.snackbar.show=!1}}},[t("v-icon",[a._v("close")])],1)],1),t("v-icon")],1)},s=[],i=(t("a481"),t("da71")),o=(t("64d2"),{data:function(){return{search:"",isEdit:!1,id:null,description:"",location:"",lat:"",lng:"",status:"",package:[],tracking:"",complex:{headers:[{text:"Tracking",value:"package.tracking"},{text:"Estado actual",value:"status"},{text:"Ubicación actual",value:"location"},{text:"Salida del paquete",value:"package.out_date"},{text:"Llegada del paquete",value:"package.arriving_date"},{text:"Acciones",value:""}],items:[]},snackbar:{show:!1,text:"",color:"",icon:""},basic:{dialog:!1,status:[{value:"0",text:"Inicio"},{value:"1",text:"En Camino"},{value:"2",text:"Finalizado"}]},saveLoader:!1,removeLoader:!1,generalLoader:!1,modalLoader:!1,disabled:!1}},filters:{statusFilter:function(a){var e={0:"Inicio",1:"En Camino",2:"Finalizado"};return e[a]}},mounted:function(){this.getList()},methods:{getList:function(){var a=this;this.generalLoader=!0;var e="tracking?cond=pack";if('"2"'==localStorage.getItem("role")||'"3"'==localStorage.getItem("role")){var t=localStorage.getItem("country");t=t.replace(/[ '"]+/g,"");e="tracking?cond=pack&country="+t}i["a"].get(e).then(function(e){a.complex.items=e.data.items,a.generalLoader=!1}).catch(function(a){console.log(a)})},edit:function(a){var e=this;this.isEdit=!0,this.basic.dialog=!0,this.modalLoader=!0,this.disabled=!0,i["a"].get("tracking/"+a).then(function(a){e.id=a.data.data.id,e.description=a.data.data.description,e.location=a.data.data.location,e.lat=a.data.data.lat,e.lng=a.data.data.lng,e.status=a.data.data.status,e.tracking=a.data.data.package.tracking,e.lng=a.data.data.lng,e.modalLoader=!1,e.disabled=!1}).catch(function(a){console.log(a)})},clearInputs:function(){this.id=null,this.description="",this.location="",this.lat="",this.lng="",this.status="",this.package=[],this.tracking="",this.$refs.form.resetValidation()},save:function(){var a=this;arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(this.$refs.form.validate()){var e={description:this.description,location:this.location,lat:this.lat,lng:this.lng,status:this.status};this.saveLoader=!0,i["a"].put("tracking/"+this.id,e).then(function(e){a.snackbar={show:!0,text:"Tracking editado con éxito",color:"success",icon:"fa fa-check"},a.saveLoader=!1,a.getList()}).catch(function(a){console.log(a)})}}}}),r=o,n=(t("c935"),t("2877")),c=t("6544"),d=t.n(c),u=t("8336"),v=t("b0af"),m=t("99d9"),b=t("12b2"),g=t("a523"),p=t("8fea"),f=t("169a"),h=t("ce7e"),x=t("0e8f"),k=t("4bd4"),y=t("132d"),D=t("a722"),_=t("490a"),C=t("b56d"),V=t("2db4"),L=t("9910"),w=t("2677"),E=t("a844"),S=t("71d9"),P=Object(n["a"])(r,l,s,!1,null,null,null);e["default"]=P.exports;d()(P,{VBtn:u["a"],VCard:v["a"],VCardActions:m["b"],VCardText:m["d"],VCardTitle:b["a"],VContainer:g["a"],VDataTable:p["a"],VDialog:f["a"],VDivider:h["a"],VFlex:x["a"],VForm:k["a"],VIcon:y["a"],VLayout:D["a"],VProgressCircular:_["a"],VSelect:C["a"],VSnackbar:V["a"],VSpacer:L["e"],VTextField:w["a"],VTextarea:E["a"],VToolbar:S["a"]})},"64d2":function(a,e,t){"use strict";var l=[{value:"Argentina",label:"Argentina",money:["Pesos Argentinos","Dólares"]},{value:"Bolivia",label:"Bolivia",money:["Boliviano","Dólares"]},{value:"Brasil",label:"Brasil",money:["Reals","Dólares"]},{value:"Chile",label:"Chile",money:["Pesos Chileno","Dólares"]},{value:"Colombia",label:"Colombia",money:["Pesos Colombiano","Dólares"]},{value:"Costa Rica",label:"Costa Rica",money:["Colón costarricense","Dólares"]},{value:"Cuba",label:"Cuba",money:["Pesos Cubano","Dólares"]},{value:"Ecuador",label:"Ecuador",money:["Dólares"]},{value:"El Salvador",label:"El Salvador",money:["Dólares"]},{value:"Guayana Francesa",label:"Guayana Francesa",money:["Euro","Dólares"]},{value:"Granada",label:"Granada",money:["Dólares del Caribe Oriental","Dólares"]},{value:"Guatemala",label:"Guatemala",money:["Quetzal","Dólares"]},{value:"Guayana",label:"Guayana",money:["Dólares guyanés","Dólares"]},{value:"Haiti",label:"Haiti",money:["Gourde","Dólares"]},{value:"Honduras",label:"Honduras",money:["Lempiras hondureños","Dólares"]},{value:"Jamaica",label:"Jamaica",money:["Dólareses jamaiquino","Dólares"]},{value:"Mexico",label:"Mexico",money:["Pesos mexicanos","Dólares"]},{value:"Nicaragua",label:"Nicaragua",money:["Córdobas","Dólares"]},{value:"Paraguay",label:"Paraguay",money:["Guaraní paraguayos","Dólares"]},{value:"Panama",label:"Panama",money:["Balboa","Dólares"]},{value:"Peru",label:"Peru",money:["Soles","Dólares"]},{value:"Puerto Rico",label:"Puerto Rico",money:["Dólares"]},{value:"Republica Dominicana",label:"Republica Dominicana",money:["Pesos dominicano","Dólares"]},{value:"Surinam",label:"Surinam",money:["Dólares surinamés","Dólares"]},{value:"Uruguay",label:"Uruguay",money:["Pesos uruguayo","Dólares"]},{value:"Venezuela",label:"Venezuela",money:["Bolivares","Dólares"]},{value:"Espana",label:"Espana",money:["Euros","Dólares"]},{value:"Estados Unidos",label:"Estados Unidos",money:["Dólares"]},{value:"Europa",label:"Europa",money:["Euros","Dólares"]}];e["a"]={pais:l}},c935:function(a,e,t){"use strict";var l=t("e664"),s=t.n(l);s.a},e664:function(a,e,t){}}]);
//# sourceMappingURL=chunk-7610da67.6fadcd9b.js.map