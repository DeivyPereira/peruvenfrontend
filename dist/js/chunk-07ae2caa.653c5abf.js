(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-07ae2caa"],{"5d6b":function(e,a,t){var s=t("e53d").parseInt,r=t("a1ce").trim,l=t("e692"),o=/^[-+]?0[xX]/;e.exports=8!==s(l+"08")||22!==s(l+"0x16")?function(e,a){var t=r(String(e),3);return s(t,a>>>0||(o.test(t)?16:10))}:s},"64d2":function(e,a,t){"use strict";var s=[{value:"Argentina",label:"Argentina",money:["Pesos Argentinos","Dólares"]},{value:"Bolivia",label:"Bolivia",money:["Boliviano","Dólares"]},{value:"Brasil",label:"Brasil",money:["Reals","Dólares"]},{value:"Chile",label:"Chile",money:["Pesos Chileno","Dólares"]},{value:"Colombia",label:"Colombia",money:["Pesos Colombiano","Dólares"]},{value:"Costa Rica",label:"Costa Rica",money:["Colón costarricense","Dólares"]},{value:"Cuba",label:"Cuba",money:["Pesos Cubano","Dólares"]},{value:"Ecuador",label:"Ecuador",money:["Dólares"]},{value:"El Salvador",label:"El Salvador",money:["Dólares"]},{value:"Guayana Francesa",label:"Guayana Francesa",money:["Euro","Dólares"]},{value:"Granada",label:"Granada",money:["Dólares del Caribe Oriental","Dólares"]},{value:"Guatemala",label:"Guatemala",money:["Quetzal","Dólares"]},{value:"Guayana",label:"Guayana",money:["Dólares guyanés","Dólares"]},{value:"Haiti",label:"Haiti",money:["Gourde","Dólares"]},{value:"Honduras",label:"Honduras",money:["Lempiras hondureños","Dólares"]},{value:"Jamaica",label:"Jamaica",money:["Dólareses jamaiquino","Dólares"]},{value:"Mexico",label:"Mexico",money:["Pesos mexicanos","Dólares"]},{value:"Nicaragua",label:"Nicaragua",money:["Córdobas","Dólares"]},{value:"Paraguay",label:"Paraguay",money:["Guaraní paraguayos","Dólares"]},{value:"Panama",label:"Panama",money:["Balboa","Dólares"]},{value:"Peru",label:"Peru",money:["Soles","Dólares"]},{value:"Puerto Rico",label:"Puerto Rico",money:["Dólares"]},{value:"Republica Dominicana",label:"Republica Dominicana",money:["Pesos dominicano","Dólares"]},{value:"Surinam",label:"Surinam",money:["Dólares surinamés","Dólares"]},{value:"Uruguay",label:"Uruguay",money:["Pesos uruguayo","Dólares"]},{value:"Venezuela",label:"Venezuela",money:["Bolivares","Dólares"]},{value:"Espana",label:"Espana",money:["Euros","Dólares"]},{value:"Estados Unidos",label:"Estados Unidos",money:["Dólares"]},{value:"Europa",label:"Europa",money:["Euros","Dólares"]}];a["a"]={pais:s}},7445:function(e,a,t){var s=t("63b6"),r=t("5d6b");s(s.G+s.F*(parseInt!=r),{parseInt:r})},a1ce:function(e,a,t){var s=t("63b6"),r=t("25eb"),l=t("294c"),o=t("e692"),i="["+o+"]",n="​",c=RegExp("^"+i+i+"*"),u=RegExp(i+i+"*$"),d=function(e,a,t){var r={},i=l(function(){return!!o[e]()||n[e]()!=n}),c=r[e]=i?a(m):o[e];t&&(r[t]=c),s(s.P+s.F*i,"String",r)},m=d.trim=function(e,a){return e=String(r(e)),1&a&&(e=e.replace(c,"")),2&a&&(e=e.replace(u,"")),e};e.exports=d},b9e9:function(e,a,t){t("7445"),e.exports=t("584a").parseInt},dc02:function(e,a,t){"use strict";t.r(a);var s=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{attrs:{id:"Users"}},[t("v-container",{attrs:{"grid-list-xl":"",fluid:""}},[t("v-layout",{attrs:{row:"",wrap:""}},[t("v-flex",{attrs:{lg12:""}},[t("v-dialog",{attrs:{persistent:"","max-width":"800px"},model:{value:e.basic.dialog,callback:function(a){e.$set(e.basic,"dialog",a)},expression:"basic.dialog"}},[t("v-card",[t("v-card-title",[t("v-layout",{attrs:{row:""}},[t("v-flex",{attrs:{"lg-10":"","xs-10":"","md-10":""}},[0==e.isEdit?t("span",{staticClass:"headline"},[e._v("Nuevo Usuario")]):e._e(),e.isEdit?t("span",{staticClass:"headline"},[e._v("Editar Usuario")]):e._e()]),t("v-flex",{staticStyle:{"text-align":"right"},attrs:{"lg-2":"","xs-2":"","md-2":""}},[1==e.modalLoader?t("v-progress-circular",{attrs:{indeterminate:"",size:30,color:"primary"}}):e._e()],1)],1)],1),t("v-divider"),t("v-form",{ref:"form"},[t("v-card-text",[t("v-container",{attrs:{"grid-list-md":""}},[t("v-layout",{attrs:{wrap:""}},[t("v-flex",{attrs:{xs12:"",sm12:"",md12:""}},[t("v-text-field",{attrs:{disabled:e.disabled,label:"Nombre",rules:[e.rules.required]},model:{value:e.name,callback:function(a){e.name=a},expression:"name"}})],1),t("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[t("v-text-field",{attrs:{disabled:e.disabled,label:"Correo electrónico",rules:[e.rules.required]},model:{value:e.email,callback:function(a){e.email=a},expression:"email"}})],1),t("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[1==e.isEdit?t("v-text-field",{attrs:{hint:"Dejar en blanco si no desea cambiarla","persistent-hint":"",type:"password",disabled:e.disabled,label:"Contraseña"},model:{value:e.password,callback:function(a){e.password=a},expression:"password"}}):e._e(),0==e.isEdit?t("v-text-field",{attrs:{rules:[e.rules.required],type:"password",disabled:e.disabled,label:"Contraseña"},model:{value:e.password,callback:function(a){e.password=a},expression:"password"}}):e._e()],1),t("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[t("v-select",{attrs:{label:"Seleccionar País",items:e.countries,required:"",rules:[function(e){return!!e||"Campo requerido"}],"item-text":"value","item-value":"value"},model:{value:e.country,callback:function(a){e.country=a},expression:"country"}})],1),t("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[t("v-select",{attrs:{label:"Rol",items:e.rols,required:"",rules:[function(e){return!!e||"Campo requerido"}],"item-text":"text","item-value":"value"},model:{value:e.role,callback:function(a){e.role=a},expression:"role"}})],1),t("v-flex",{attrs:{xs12:"",sm12:"",md12:""}},[t("v-select",{attrs:{label:"Estado",items:e.statuses,required:"",rules:[function(e){return!!e||"Campo requerido"}],"item-text":"text","item-value":"value"},model:{value:e.status,callback:function(a){e.status=a},expression:"status"}})],1),t("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[t("v-select",{attrs:{label:"Oficina",items:e.offices,required:"",rules:[function(e){return!!e||"Campo requerido"}],"item-text":"name","item-value":"id"},model:{value:e.office_id,callback:function(a){e.office_id=a},expression:"office_id"}})],1)],1)],1)],1),t("v-card-actions",[t("v-spacer"),t("v-btn",{attrs:{color:"error"},nativeOn:{click:function(a){e.basic.dialog=!1}}},[e._v("Cerrar")]),t("v-btn",{attrs:{color:"success",loading:e.saveLoader,disabled:e.saveLoader},on:{click:function(a){return e.save()}}},[e._v("Guardar")])],1)],1)],1)],1),t("v-toolbar",{staticStyle:{padding:"0 0 20px 0"},attrs:{card:"",color:"white"}},[t("v-text-field",{staticClass:"hidden-sm-and-down",attrs:{flat:"",solo:"","prepend-icon":"search",placeholder:"Buscar...","hide-details":""},model:{value:e.search,callback:function(a){e.search=a},expression:"search"}}),t("v-btn",{attrs:{color:"success",flat:""},on:{click:function(a){e.isEdit=!1,e.clearInputs(),e.basic.dialog=!0}}},[t("i",{staticClass:"fa fa-plus"}),e._v(" Agregar")])],1),1==e.generalLoader?t("v-progress-circular",{staticStyle:{position:"fixed",bottom:"10%",right:"5%"},attrs:{indeterminate:"",size:40,color:"primary"}}):e._e(),t("v-data-table",{attrs:{headers:e.complex.headers,search:e.search,items:e.complex.items,"rows-per-page-items":[10,25,50,{text:"All",value:-1}],"item-key":"name"},scopedSlots:e._u([{key:"items",fn:function(a){return[t("td",[e._v(e._s(a.item.name))]),t("td",[e._v(e._s(a.item.email))]),t("td",[e._v(e._s(a.item.country))]),t("td",[e._v(e._s(e._f("roleFilter")(a.item.role)))]),t("td",[e._v(e._s(a.item.office.name)+" - "+e._s(a.item.office.code))]),t("td",[e._v(e._s(e._f("statusFilter")(a.item.status)))]),t("td",[t("v-btn",{attrs:{depressed:"",outline:"",icon:"",fab:"",dark:"",color:"primary",small:""},on:{click:function(t){return e.edit(a.item.id)}}},[t("v-icon",[e._v("edit")])],1),t("v-btn",{attrs:{depressed:"",outline:"",icon:"",fab:"",dark:"",color:"red",small:""},on:{click:function(t){return e.remove(a.item.id)}}},[t("v-icon",[e._v("delete")])],1)],1)]}}])})],1)],1)],1),t("v-snackbar",{attrs:{timeout:3e3,top:"",right:"",color:e.snackbar.color},model:{value:e.snackbar.show,callback:function(a){e.$set(e.snackbar,"show",a)},expression:"snackbar.show"}},[t("p",{staticStyle:{margin:"0"}},[t("i",{class:e.snackbar.icon}),e._v(" \n    "+e._s(e.snackbar.text)+"\n  ")]),t("v-btn",{attrs:{dark:"",flat:"",icon:""},nativeOn:{click:function(a){e.snackbar.show=!1}}},[t("v-icon",[e._v("close")])],1)],1),t("v-icon")],1)},r=[],l=t("e814"),o=t.n(l),i=(t("7f7f"),t("da71")),n=t("64d2"),c={data:function(){return{search:"",isEdit:!1,id:null,name:"",country:"",role:"",status:"",email:"",password:"",office_id:"",countries:n["a"].pais,rols:[{value:1,text:"Administrador"},{value:2,text:"Supervisor"},{value:3,text:"Trabajador"}],statuses:[{value:2,text:"Activo"},{value:1,text:"Inactivo"}],rules:{required:function(e){return!!e||"Campo requerido."}},appEvents:[],offices:[],complex:{headers:[{text:"Nombre",value:"name"},{text:"Email",value:"email"},{text:"País",value:"country"},{text:"Rol",value:"role"},{text:"Oficina",value:"office"},{text:"Estado",value:"status"},{text:"Acciones",value:""}],items:[]},snackbar:{show:!1,text:"",color:"",icon:""},basic:{dialog:!1},saveLoader:!1,removeLoader:!1,generalLoader:!1,modalLoader:!1,disabled:!1}},filters:{roleFilter:function(e){var a={1:"Administrador",2:"Supervisor",3:"Trabajador"};return a[e]},statusFilter:function(e){var a={1:"Inactivo",2:"Activo"};return a[e]}},mounted:function(){this.getList(),this.getListOffice()},methods:{getListOffice:function(){var e=this;this.generalLoader=!0,i["a"].get("offices").then(function(a){e.offices=a.data.items,e.generalLoader=!1}).catch(function(e){console.log(e)})},getList:function(){var e=this;this.generalLoader=!0,i["a"].get("user").then(function(a){e.complex.items=a.data.items,e.generalLoader=!1}).catch(function(e){console.log(e)})},remove:function(e){var a=this;this.$confirm("¿Realmente quieres eliminar este elemento?").then(function(t){t&&(a.generalLoader=!0,i["a"].delete("user/"+e).then(function(e){a.snackbar={show:!0,text:e.data.response,color:"success",icon:"fa fa-check"},a.getList()}).catch(function(e){console.log(e)}))})},edit:function(e){var a=this;this.isEdit=!0,this.basic.dialog=!0,this.modalLoader=!0,this.disabled=!0,i["a"].get("user/"+e).then(function(e){a.id=e.data.data.id,a.name=e.data.data.name,a.country=e.data.data.country,a.role=o()(e.data.data.role),a.status=o()(e.data.data.status),a.email=e.data.data.email,a.office_id=e.data.data.office_id,a.modalLoader=!1,a.disabled=!1}).catch(function(e){console.log(e)})},clearInputs:function(){this.name="",this.country="",this.role="",this.status="",this.email="",this.password="",this.$refs.form.resetValidation()},save:function(){var e=this;arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(this.$refs.form.validate()){var a={name:this.name,country:this.country,role:this.role,status:this.status,email:this.email,password:this.password,office_id:this.office_id};this.saveLoader=!0,this.isEdit?i["a"].put("user/"+this.id,a).then(function(a){e.snackbar={show:!0,text:"Usuario editado con éxito",color:"success",icon:"fa fa-check"},e.saveLoader=!1,e.getList(),e.saveLoader=!1}).catch(function(e){console.log(e)}):i["a"].post("user/",a).then(function(a){e.snackbar={show:!0,text:"Usuario agregado con éxito",color:"success",icon:"fa fa-check"},e.saveLoader=!1,e.basic.dialog=!1,e.clearInputs(),e.getList()}).catch(function(e){console.log(e)})}}}},u=c,d=t("2877"),m=t("6544"),v=t.n(m),f=t("8336"),b=t("b0af"),p=t("99d9"),x=t("12b2"),h=t("a523"),g=t("8fea"),y=t("169a"),_=t("ce7e"),k=t("0e8f"),D=t("4bd4"),w=t("132d"),C=t("a722"),E=t("490a"),L=t("b56d"),V=t("2db4"),P=t("9910"),S=t("2677"),q=t("71d9"),G=Object(d["a"])(u,s,r,!1,null,null,null);a["default"]=G.exports;v()(G,{VBtn:f["a"],VCard:b["a"],VCardActions:p["b"],VCardText:p["d"],VCardTitle:x["a"],VContainer:h["a"],VDataTable:g["a"],VDialog:y["a"],VDivider:_["a"],VFlex:k["a"],VForm:D["a"],VIcon:w["a"],VLayout:C["a"],VProgressCircular:E["a"],VSelect:L["a"],VSnackbar:V["a"],VSpacer:P["e"],VTextField:S["a"],VToolbar:q["a"]})},e692:function(e,a){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},e814:function(e,a,t){e.exports=t("b9e9")}}]);
//# sourceMappingURL=chunk-07ae2caa.653c5abf.js.map