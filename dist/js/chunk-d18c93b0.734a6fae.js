(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d18c93b0"],{"014b":function(e,t,a){"use strict";var i=a("e53d"),n=a("07e3"),r=a("8e60"),o=a("63b6"),l=a("9138"),s=a("ebfd").KEY,c=a("294c"),d=a("dbdb"),u=a("45f2"),f=a("62a0"),m=a("5168"),b=a("ccb9"),v=a("6718"),p=a("47ee"),h=a("9003"),y=a("e4ae"),x=a("f772"),g=a("36c3"),_=a("1bc3"),k=a("aebd"),C=a("a159"),w=a("0395"),D=a("bf0b"),S=a("d9f6"),O=a("c3a1"),P=D.f,E=S.f,T=w.f,A=i.Symbol,j=i.JSON,N=j&&j.stringify,$="prototype",V=m("_hidden"),I=m("toPrimitive"),L={}.propertyIsEnumerable,F=d("symbol-registry"),G=d("symbols"),q=d("op-symbols"),B=Object[$],J="function"==typeof A,R=i.QObject,M=!R||!R[$]||!R[$].findChild,Q=r&&c(function(){return 7!=C(E({},"a",{get:function(){return E(this,"a",{value:7}).a}})).a})?function(e,t,a){var i=P(B,t);i&&delete B[t],E(e,t,a),i&&e!==B&&E(B,t,i)}:E,z=function(e){var t=G[e]=C(A[$]);return t._k=e,t},H=J&&"symbol"==typeof A.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof A},U=function(e,t,a){return e===B&&U(q,t,a),y(e),t=_(t,!0),y(a),n(G,t)?(a.enumerable?(n(e,V)&&e[V][t]&&(e[V][t]=!1),a=C(a,{enumerable:k(0,!1)})):(n(e,V)||E(e,V,k(1,{})),e[V][t]=!0),Q(e,t,a)):E(e,t,a)},K=function(e,t){y(e);var a,i=p(t=g(t)),n=0,r=i.length;while(r>n)U(e,a=i[n++],t[a]);return e},W=function(e,t){return void 0===t?C(e):K(C(e),t)},Y=function(e){var t=L.call(this,e=_(e,!0));return!(this===B&&n(G,e)&&!n(q,e))&&(!(t||!n(this,e)||!n(G,e)||n(this,V)&&this[V][e])||t)},X=function(e,t){if(e=g(e),t=_(t,!0),e!==B||!n(G,t)||n(q,t)){var a=P(e,t);return!a||!n(G,t)||n(e,V)&&e[V][t]||(a.enumerable=!0),a}},Z=function(e){var t,a=T(g(e)),i=[],r=0;while(a.length>r)n(G,t=a[r++])||t==V||t==s||i.push(t);return i},ee=function(e){var t,a=e===B,i=T(a?q:g(e)),r=[],o=0;while(i.length>o)!n(G,t=i[o++])||a&&!n(B,t)||r.push(G[t]);return r};J||(A=function(){if(this instanceof A)throw TypeError("Symbol is not a constructor!");var e=f(arguments.length>0?arguments[0]:void 0),t=function(a){this===B&&t.call(q,a),n(this,V)&&n(this[V],e)&&(this[V][e]=!1),Q(this,e,k(1,a))};return r&&M&&Q(B,e,{configurable:!0,set:t}),z(e)},l(A[$],"toString",function(){return this._k}),D.f=X,S.f=U,a("6abf").f=w.f=Z,a("355d").f=Y,a("9aa9").f=ee,r&&!a("b8e3")&&l(B,"propertyIsEnumerable",Y,!0),b.f=function(e){return z(m(e))}),o(o.G+o.W+o.F*!J,{Symbol:A});for(var te="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ae=0;te.length>ae;)m(te[ae++]);for(var ie=O(m.store),ne=0;ie.length>ne;)v(ie[ne++]);o(o.S+o.F*!J,"Symbol",{for:function(e){return n(F,e+="")?F[e]:F[e]=A(e)},keyFor:function(e){if(!H(e))throw TypeError(e+" is not a symbol!");for(var t in F)if(F[t]===e)return t},useSetter:function(){M=!0},useSimple:function(){M=!1}}),o(o.S+o.F*!J,"Object",{create:W,defineProperty:U,defineProperties:K,getOwnPropertyDescriptor:X,getOwnPropertyNames:Z,getOwnPropertySymbols:ee}),j&&o(o.S+o.F*(!J||c(function(){var e=A();return"[null]"!=N([e])||"{}"!=N({a:e})||"{}"!=N(Object(e))})),"JSON",{stringify:function(e){var t,a,i=[e],n=1;while(arguments.length>n)i.push(arguments[n++]);if(a=t=i[1],(x(t)||void 0!==e)&&!H(e))return h(t)||(t=function(e,t){if("function"==typeof a&&(t=a.call(this,e,t)),!H(t))return t}),i[1]=t,N.apply(j,i)}}),A[$][I]||a("35e8")(A[$],I,A[$].valueOf),u(A,"Symbol"),u(Math,"Math",!0),u(i.JSON,"JSON",!0)},"0395":function(e,t,a){var i=a("36c3"),n=a("6abf").f,r={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],l=function(e){try{return n(e)}catch(t){return o.slice()}};e.exports.f=function(e){return o&&"[object Window]"==r.call(e)?l(e):n(i(e))}},"1af8":function(e,t,a){},"224c":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"shippingOrder"}},[a("v-container",{attrs:{"grid-list-xl":"",fluid:""}},[a("v-layout",{attrs:{row:"",wrap:""}},[a("v-flex",{attrs:{lg12:""}},[a("v-tabs",{model:{value:e.selectedTab,callback:function(t){e.selectedTab=t},expression:"selectedTab"}},[a("v-tab",{attrs:{ripple:"",href:"#tab-1"}},[e._v("Pendientes")]),a("v-tab",{attrs:{ripple:"",href:"#tab-2"}},[e._v("Enviados")]),a("v-tab",{attrs:{ripple:"",href:"#tab-3"}},[e._v("Completados")])],1),a("v-tabs-items",{model:{value:e.selectedTab,callback:function(t){e.selectedTab=t},expression:"selectedTab"}},[a("v-tab-item",{attrs:{id:"tab-1"}},[a("v-toolbar",{attrs:{card:"",color:"white"}},[a("v-text-field",{staticClass:"hidden-sm-and-down",attrs:{flat:"",solo:"","prepend-icon":"search",placeholder:"Buscar...","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),a("v-btn",{attrs:{color:"success",flat:""},on:{click:function(t){return e.create()}}},[a("i",{staticClass:"fa fa-plus"}),e._v(" \n                Crear\n              ")]),a("v-btn",{attrs:{color:"success",flat:""},on:{click:function(t){return e.handleDownload()}}},[a("i",{staticClass:"fa fa-file-excel"}),e._v(" \n                Exportar\n              ")])],1),a("v-data-table",{attrs:{headers:e.complex.headers,search:e.search,items:e.complex.items,"rows-per-page-items":[10,25,50,{text:"Todos",value:-1}],"item-key":"name"},scopedSlots:e._u([{key:"items",fn:function(t){return[a("td",[e._v(e._s(t.item.created))]),a("td",[e._v(e._s(t.item.tracking))]),a("td",[e._v(e._s(t.item.package.tracking))]),a("td",{staticClass:"hover",staticStyle:{cursor:"pointer"},on:{click:function(a){return e.editClient(t.item.clients_id)}}},[e._v(e._s(t.item.clients.shipper))]),a("td",{staticClass:"hover",staticStyle:{cursor:"pointer"},on:{click:function(a){return e.editAfiliated(t.item.client_afiliated_id)}}},[e._v(e._s(t.item.client_afiliated.destination_name))]),a("td",[e._v(e._s(t.item.package.out_date))]),a("td",[a("v-btn",{attrs:{depressed:"",outline:"",icon:"",fab:"",dark:"",color:"primary",small:""},on:{click:function(a){return e.view(t.item.id)}}},[a("v-icon",[e._v("fa fa-eye")])],1),e.admin?a("v-btn",{attrs:{depressed:"",outline:"",icon:"",fab:"",dark:"",color:"red",small:""},on:{click:function(a){return e.remove(t.item.id)}}},[a("v-icon",[e._v("delete")])],1):e._e(),a("v-btn",{attrs:{color:"info"},on:{click:function(a){return e.Comprobante(t.item.id)}}},[e._v("Imprimir Comprobante")]),a("v-btn",{attrs:{color:"info"},on:{click:function(a){return e.Declaracion(t.item.id)}}},[e._v("Imprimir Declaración")])],1)]}}])})],1),a("v-tab-item",{attrs:{id:"tab-2"}},[a("v-data-table",{attrs:{headers:e.complex.headers,search:e.search,items:e.complex.itemsenviados,"rows-per-page-items":[10,25,50,{text:"All",value:-1}],"item-key":"name"},scopedSlots:e._u([{key:"items",fn:function(t){return[a("td",[e._v(e._s(t.item.created))]),a("td",[e._v(e._s(t.item.tracking))]),a("td",[e._v(e._s(t.item.package.tracking))]),a("td",{staticClass:"hover",staticStyle:{cursor:"pointer"},on:{click:function(a){return e.editClient(t.item.clients_id)}}},[e._v(e._s(t.item.clients.shipper))]),a("td",{staticClass:"hover",staticStyle:{cursor:"pointer"},on:{click:function(a){return e.editAfiliated(t.item.client_afiliated_id)}}},[e._v(e._s(t.item.client_afiliated.destination_name))]),a("td",[e._v(e._s(t.item.package.out_date))]),a("td",[a("v-btn",{attrs:{depressed:"",outline:"",icon:"",fab:"",dark:"",color:"primary",small:""},on:{click:function(a){return e.view(t.item.id)}}},[a("v-icon",[e._v("fa fa-eye")])],1)],1)]}}])})],1),a("v-tab-item",{attrs:{id:"tab-3"}},[a("v-data-table",{attrs:{headers:e.complex.headers,search:e.search,items:e.complex.itemscompletadas,"rows-per-page-items":[10,25,50,{text:"All",value:-1}],"item-key":"name"},scopedSlots:e._u([{key:"items",fn:function(t){return[a("td",[e._v(e._s(t.item.created))]),a("td",[e._v(e._s(t.item.tracking))]),a("td",[e._v(e._s(t.item.package.tracking))]),a("td",{staticClass:"hover",staticStyle:{cursor:"pointer"},on:{click:function(a){return e.editClient(t.item.clients_id)}}},[e._v(e._s(t.item.clients.shipper))]),a("td",{staticClass:"hover",staticStyle:{cursor:"pointer"},on:{click:function(a){return e.editAfiliated(t.item.client_afiliated_id)}}},[e._v(e._s(t.item.client_afiliated.destination_name))]),a("td",[e._v(e._s(t.item.package.out_date))]),a("td",[a("v-btn",{attrs:{depressed:"",outline:"",icon:"",fab:"",dark:"",color:"primary",small:""},on:{click:function(a){return e.view(t.item.id)}}},[a("v-icon",[e._v("fa fa-eye")])],1)],1)]}}])})],1)],1)],1)],1)],1),a("v-dialog",{attrs:{"max-width":"800px"},model:{value:e.basic.dialogClient,callback:function(t){e.$set(e.basic,"dialogClient",t)},expression:"basic.dialogClient"}},[a("v-card",[a("v-card-title",[a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{"lg-10":"","xs-10":"","md-10":""}},[a("span",{staticClass:"headline"},[e._v("Editar Datos del cliente")])]),a("v-flex",{staticStyle:{"text-align":"right"},attrs:{"lg-2":"","xs-2":"","md-2":""}},[1==e.modalLoader?a("v-progress-circular",{attrs:{indeterminate:"",size:30,color:"primary"}}):e._e()],1)],1)],1),a("v-divider"),a("v-form",{ref:"formClient",attrs:{"lazy-validation":""}},[a("v-card-text",[a("v-container",{attrs:{"grid-list-md":""}},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs4:"",sm4:"",md4:""}},[a("v-select",{attrs:{label:"Documento",items:e.basic.doc_types,"item-text":"text",disabled:"","item-value":"value",rules:[function(e){return!!e||"Campo requerido"}]},model:{value:e.client.doc_type,callback:function(t){e.$set(e.client,"doc_type",t)},expression:"client.doc_type"}})],1),a("v-flex",{attrs:{xs8:"",sm3:"",md3:""}},[a("v-text-field",{attrs:{disabled:"",rules:[function(e){return!!e||"Campo requerido"}],label:"Número"},model:{value:e.client.number,callback:function(t){e.$set(e.client,"number",t)},expression:"client.number"}})],1),a("v-flex",{attrs:{xs12:"",sm5:"",md5:""}},[a("v-text-field",{attrs:{disabled:"",rules:e.onlyText,label:"Nombre y Apellido"},model:{value:e.client.shipper,callback:function(t){e.$set(e.client,"shipper",t)},expression:"client.shipper"}})],1),a("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[a("v-text-field",{attrs:{disabled:e.disabled,rules:e.onlyText,label:"Persona de Contacto"},model:{value:e.client.contact_person,callback:function(t){e.$set(e.client,"contact_person",t)},expression:"client.contact_person"}})],1),a("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[a("v-text-field",{attrs:{disabled:e.disabled,rules:[function(e){return!!e||"Campo requerido"}],label:"Número telefónico"},model:{value:e.client.phone,callback:function(t){e.$set(e.client,"phone",t)},expression:"client.phone"}})],1),a("v-flex",{attrs:{xs12:"",sm12:"",md12:""}},[a("v-text-field",{attrs:{disabled:e.disabled,label:"Correo Electrónico"},model:{value:e.client.email,callback:function(t){e.$set(e.client,"email",t)},expression:"client.email"}})],1),a("v-flex",{attrs:{xs12:"",sm12:"",md12:""}},[a("v-text-field",{attrs:{disabled:e.disabled,rules:[function(e){return!!e||"Campo requerido"}],label:"Dirección"},model:{value:e.client.address,callback:function(t){e.$set(e.client,"address",t)},expression:"client.address"}})],1),a("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[a("v-select",{attrs:{label:"País",items:e.basic.countries,"item-text":"label","item-value":"value",rules:[function(e){return!!e||"Campo requerido"}]},model:{value:e.client.country,callback:function(t){e.$set(e.client,"country",t)},expression:"client.country"}})],1),a("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[a("v-text-field",{attrs:{disabled:e.disabled,rules:e.onlyText,label:"Ciudad"},model:{value:e.client.city,callback:function(t){e.$set(e.client,"city",t)},expression:"client.city"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"error"},nativeOn:{click:function(t){e.basic.dialogClient=!1}}},[e._v("Cerrar")]),a("v-btn",{attrs:{color:"success",loading:e.saveLoader,disabled:e.saveLoader},on:{click:function(t){return e.validateClient()}}},[e._v("Guardar")])],1)],1)],1)],1),a("v-dialog",{attrs:{"max-width":"800px"},model:{value:e.basic.dialogAfiliate,callback:function(t){e.$set(e.basic,"dialogAfiliate",t)},expression:"basic.dialogAfiliate"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[e._v("Editar Afiliado")])]),a("v-divider"),a("v-card-text",[a("v-form",{ref:"formAfiliated",attrs:{"lazy-validation":""}},[a("v-container",{attrs:{"grid-list-md":""}},[a("v-layout",{attrs:{wrap:""}},[a("v-flex",{attrs:{xs4:"",sm2:"",md2:""}},[a("v-select",{attrs:{label:"Documento",items:e.basic.doc_types,disabled:"","item-text":"text","item-value":"value",rules:[function(e){return!!e||"Campo requerido"}]},model:{value:e.afiliated.doc_type,callback:function(t){e.$set(e.afiliated,"doc_type",t)},expression:"afiliated.doc_type"}})],1),a("v-flex",{attrs:{xs9:"",sm4:"",md4:""}},[a("v-text-field",{attrs:{disabled:"",rules:[function(e){return!!e||"Campo requerido"}],label:"Número"},model:{value:e.afiliated.number,callback:function(t){e.$set(e.afiliated,"number",t)},expression:"afiliated.number"}})],1),a("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[a("v-text-field",{attrs:{disabled:"",rules:e.onlyText,label:"Destinatario"},model:{value:e.afiliated.destination_name,callback:function(t){e.$set(e.afiliated,"destination_name",t)},expression:"afiliated.destination_name"}})],1),a("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[a("v-text-field",{attrs:{disabled:e.disabled,rules:e.onlyText,label:"Atención"},model:{value:e.afiliated.attention,callback:function(t){e.$set(e.afiliated,"attention",t)},expression:"afiliated.attention"}})],1),a("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[a("v-text-field",{attrs:{disabled:e.disabled,rules:[function(e){return!!e||"Campo requerido"}],label:"Número telefónico"},model:{value:e.afiliated.phone,callback:function(t){e.$set(e.afiliated,"phone",t)},expression:"afiliated.phone"}})],1),a("v-flex",{attrs:{xs12:"",sm12:"",md12:""}},[a("v-text-field",{attrs:{disabled:e.disabled,label:"Correo Electrónico"},model:{value:e.afiliated.email,callback:function(t){e.$set(e.afiliated,"email",t)},expression:"afiliated.email"}})],1),a("v-flex",{attrs:{xs12:"",sm12:"",md12:""}},[a("v-text-field",{attrs:{disabled:e.disabled,rules:[function(e){return!!e||"Campo requerido"}],label:"Dirección"},model:{value:e.afiliated.address,callback:function(t){e.$set(e.afiliated,"address",t)},expression:"afiliated.address"}})],1),a("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[a("v-select",{attrs:{label:"País",items:e.basic.countries,"item-text":"label","item-value":"value",rules:[function(e){return!!e||"Campo requerido"}]},model:{value:e.afiliated.country,callback:function(t){e.$set(e.afiliated,"country",t)},expression:"afiliated.country"}})],1),a("v-flex",{attrs:{xs12:"",sm6:"",md6:""}},[a("v-text-field",{attrs:{disabled:e.disabled,rules:e.onlyText,label:"Ciudad"},model:{value:e.afiliated.city,callback:function(t){e.$set(e.afiliated,"city",t)},expression:"afiliated.city"}})],1)],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"error"},nativeOn:{click:function(t){e.basic.dialogAfiliate=!1}}},[e._v("Cerrar")]),a("v-btn",{attrs:{color:"success"},on:{click:function(t){return e.validateAfiliated()}}},[e._v("Guardar")])],1)],1)],1),a("v-snackbar",{attrs:{timeout:3e3,top:"",right:"",color:e.snackbar.color},model:{value:e.snackbar.show,callback:function(t){e.$set(e.snackbar,"show",t)},expression:"snackbar.show"}},[a("p",{staticStyle:{margin:"0"}},[a("i",{class:e.snackbar.icon}),e._v("\n       \n      "+e._s(e.snackbar.text)+"\n    ")]),a("v-btn",{attrs:{dark:"",flat:"",icon:""},nativeOn:{click:function(t){e.snackbar.show=!1}}},[a("v-icon",[e._v("close")])],1)],1)],1)},n=[],r=a("7618"),o=a("a4bb"),l=a.n(o),s=(a("ac6a"),a("f3e2"),a("6d67"),a("a481"),a("bd86")),c=a("da71"),d=a("64d2"),u={data:function(){var e;return e={search:"",disabled:!1,modalLoader:!1,saveLoader:!1,admin:!0,loading:!0,selectedTab:"tab-1",snackbar:{show:!1,text:"",color:"",icon:""},onlyEmail:[function(e){return/.+@.+/.test(e)||"Formato de correo electrónico no válido"}],onlyText:[function(e){return!!e||"Campo requerido"},function(e){return isNaN(e)||"Campo solo debe contener letras"}],onlyNumbers:[function(e){return!!e||"Campo requerido"},function(e){return!isNaN(e)||"Campo solo debe contener números"}],basic:{dialogClient:!1,dialogAfiliate:!1,doc_types:[{value:"1",text:"PTP"},{value:"2",text:"DNI"},{value:"3",text:"Pasaporte"},{value:"4",text:"C.E."},{value:"5",text:"C.I."}],countries:d["a"].pais},client:{id:null,shipper:"",doc_type:"",number:"",contact_person:"",address:"",country:"",city:"",phone:"",email:""},afiliated:{id:null,destination_name:"",doc_type:"",number:"",attention:"",address:"",country:"",city:"",phone:"",email:""}},Object(s["a"])(e,"snackbar",{show:!1,text:"",color:"",icon:""}),Object(s["a"])(e,"complex",{headers:[{text:"Fecha de recepción",value:"created"},{text:"Tracking",value:"tracking"},{text:"Guia Master",value:"package.tracking"},{text:"Remitente",value:"clients.shipper"},{text:"Destinatario",value:"client_afiliated.destination_name"},{text:"Fecha de salida",value:"out_date"},{text:"",value:""}]}),Object(s["a"])(e,"items",[]),Object(s["a"])(e,"itemsenviados",[]),Object(s["a"])(e,"itemscompletadas",[]),Object(s["a"])(e,"date",void 0),Object(s["a"])(e,"limit",void 0),Object(s["a"])(e,"listQuery",{page:1,limit:50,sort:"ASC",date:""}),e},mounted:function(){this.getOrders(),this.getOrdersSend(),this.getOrdersComplete()},methods:{editClient:function(e){var t=this;this.basic.dialogClient=!0,this.modalLoader=!0,this.disabled=!0,c["a"].get("clients/"+e).then(function(e){t.client.id=e.data.data.id,t.client.shipper=e.data.data.shipper,t.client.doc_type=e.data.data.doc_type,t.client.number=e.data.data.number,t.client.contact_person=e.data.data.contact_person,t.client.address=e.data.data.address,t.client.country=e.data.data.country,t.client.city=e.data.data.city,t.client.phone=e.data.data.phone,t.client.email=e.data.data.email,t.modalLoader=!1,t.disabled=!1}).catch(function(e){t.snackbar={show:!0,text:e,color:"danger",icon:"fa fa-check"}})},create:function(){this.$router.push({path:"/ordenes-de-envios/crear"})},getOrders:function(){var e=this,t="ship-order-list";t="ship-order-list?limit=500&date="+this.listQuery.date+"&status=0";if('"2"'==localStorage.getItem("role")||'"3"'==localStorage.getItem("role")){var a=localStorage.getItem("country");a=a.replace(/[ '"]+/g,""),t=t+"&country="+a,this.admin=!0}c["a"].get(t).then(function(t){console.log(t.data.items),e.complex.items=t.data.items,e.loading=!1})},getOrdersSend:function(){var e=this,t="ship-order-list?limit="+this.listQuery.LIMIT+"&date="+this.listQuery.date+"&status=1";if('"2"'==localStorage.getItem("role")||'"3"'==localStorage.getItem("role")){var a=localStorage.getItem("country");a=a.replace(/[ '"]+/g,""),t=t+"&country="+a,this.admin=!0}c["a"].get(t).then(function(t){e.complex.itemsenviados=t.data.items,e.loading=!1})},getOrdersComplete:function(){var e=this,t="ship-order-list?limit="+this.listQuery.limit+"&date="+this.listQuery.date+"&status=2";if('"2"'==localStorage.getItem("role")||'"3"'==localStorage.getItem("role")){var a=localStorage.getItem("country");a=a.replace(/[ '"]+/g,""),t=t+"&country="+a,this.admin=!0}c["a"].get(t).then(function(t){e.complex.itemscompletadas=t.data.items,e.loading=!1})},view:function(e){this.$router.push({name:"shipOrderView",params:{id:e}})},remove:function(e){var t=this;this.$confirm("¿Realmente quieres eliminar este envio?").then(function(a){a&&(t.generalLoader=!0,c["a"].delete("ship-order/"+e).then(function(e){t.snackbar={show:!0,text:e.data.response,color:"success",icon:"fa fa-check"},t.getList()}).catch(function(e){console.log(e)}))})},validateClient:function(){this.$refs.formClient.validate()&&this.saveClient()},saveClient:function(){var e=this,t={shipper:this.client.shipper,doc_type:this.client.doc_type,number:this.client.number,contact_person:this.client.contact_person,address:this.client.address,country:this.client.country,city:this.client.city,phone:this.client.phone,email:this.client.email};this.saveLoader=!0,c["a"].put("clients/"+this.client.id,t).then(function(t){t.data.status?(e.snackbar={show:!0,text:t.data.response,color:"success",icon:"fa fa-check"},e.basic.dialogClient=!1):e.snackbar={show:!0,text:t.data.response,color:"danger",icon:"fa fa-exclamation-triangle"},e.saveLoader=!1}).catch(function(t){e.snackbar={show:!0,text:t,color:"danger",icon:"fa fa-exclamation-triangle"}})},editAfiliated:function(e){var t=this;this.basic.dialogAfiliate=!0,this.modalLoader=!0,this.disabled=!0,c["a"].get("afiliated/"+e).then(function(e){t.afiliated.id=e.data.data.id,t.afiliated.destination_name=e.data.data.destination_name,t.afiliated.doc_type=e.data.data.doc_type,t.afiliated.number=e.data.data.number,t.afiliated.attention=e.data.data.attention,t.afiliated.address=e.data.data.address,t.afiliated.country=e.data.data.country,t.afiliated.city=e.data.data.city,t.afiliated.phone=e.data.data.phone,t.afiliated.email=e.data.data.email,t.modalLoader=!1,t.disabled=!1}).catch(function(e){t.snackbar={show:!0,text:e,color:"danger",icon:"fa fa-exclamation-triangle"}})},Comprobante:function(e){window.open("https://www.enviosperuven.com/api//printer-comprobante/"+e,"_blank")},Declaracion:function(e){window.open("https://www.enviosperuven.com/api//printer-declaracion/"+e,"_blank")},validateAfiliated:function(){this.$refs.formAfiliated.validate()&&this.saveAfiliated()},saveAfiliated:function(){var e=this;this.saveLoader=!0;var t={destination_name:this.afiliated.destination_name,doc_type:this.afiliated.doc_type,number:this.afiliated.number,attention:this.afiliated.attention,address:this.afiliated.address,country:this.afiliated.country,city:this.afiliated.city,phone:this.afiliated.phone,email:this.afiliated.email};c["a"].put("afiliated/"+this.afiliated.id,t).then(function(t){t.data.status?(e.snackbar={show:!0,text:t.data.response,color:"success",icon:"fa fa-check"},e.basic.dialogAfiliate=!1):e.snackbar={show:!0,text:t.data.response,color:"danger",icon:"fa fa-exclamation-triangle"},e.saveLoader=!1}).catch(function(t){e.snackbar={show:!0,text:t,color:"danger",icon:"fa fa-exclamation-triangle"}})},handleDownload:function(){var e=this;this.downloadLoading=!0,a.e("chunk-8be3ab8c").then(a.bind(null,"4bf8d")).then(function(t){var a=["Fecha","N Tracking - Guia","Ciudad","Nombre y Apellido","DNI/Pasaporte/Cedula","Telefono","Ciudad donde envia","Peso Peruven","Descripción Encomienda","Total Boleta Dolares","Moneda de Boleta","Total Boleta Seguro","Moneda de Seguro","Nombre y Apellido","Telefono","Cedula","Dirección","Codigo TEALCA"],i=["created","tracking",{city:"clients"},{shipper:"clients"},{number:"clients"},{phone:"clients"},"tealca_office","actual_weight","productos","total","currency","total_ensurance","currency_ensurance",{attention:"client_afiliated"},{phone:"client_afiliated"},{number:"client_afiliated"},{address:"client_afiliated"},"-"],n=e.formatJson(i,e.complex.items);t.export_json_to_excel({header:a,data:n,filename:"envios-list"}),e.downloadLoading=!1})},formatJson:function(e,t){var a=this;return t.map(function(t){return e.map(function(e){if("timestamp"===e)return parseTime(t[e]);if(a.isObject(e)){var i="";return l()(e).forEach(function(a){var n=e[a],r=a;i=t[n][r]+" "+i}),i}return t[e]})})},isObject:function(e){return e&&"object"===Object(r["a"])(e)&&e.constructor===Object}}},f=u,m=(a("ebfa"),a("2877")),b=a("6544"),v=a.n(b),p=a("8336"),h=a("b0af"),y=a("99d9"),x=a("12b2"),g=a("a523"),_=a("8fea"),k=a("169a"),C=a("ce7e"),w=a("0e8f"),D=a("4bd4"),S=a("132d"),O=a("a722"),P=a("490a"),E=a("b56d"),T=a("2db4"),A=a("9910"),j=a("71a3"),N=a("c671"),$=a("fe57"),V=a("aac8"),I=a("2677"),L=a("71d9"),F=Object(m["a"])(f,i,n,!1,null,"26623cf4",null);t["default"]=F.exports;v()(F,{VBtn:p["a"],VCard:h["a"],VCardActions:y["b"],VCardText:y["d"],VCardTitle:x["a"],VContainer:g["a"],VDataTable:_["a"],VDialog:k["a"],VDivider:C["a"],VFlex:w["a"],VForm:D["a"],VIcon:S["a"],VLayout:O["a"],VProgressCircular:P["a"],VSelect:E["a"],VSnackbar:T["a"],VSpacer:A["e"],VTab:j["a"],VTabItem:N["a"],VTabs:$["a"],VTabsItems:V["a"],VTextField:I["a"],VToolbar:L["a"]})},"32a6":function(e,t,a){var i=a("241e"),n=a("c3a1");a("ce7ec")("keys",function(){return function(e){return n(i(e))}})},"355d":function(e,t){t.f={}.propertyIsEnumerable},"47ee":function(e,t,a){var i=a("c3a1"),n=a("9aa9"),r=a("355d");e.exports=function(e){var t=i(e),a=n.f;if(a){var o,l=a(e),s=r.f,c=0;while(l.length>c)s.call(e,o=l[c++])&&t.push(o)}return t}},"5d58":function(e,t,a){e.exports=a("d8d6")},"64d2":function(e,t,a){"use strict";var i=[{value:"Argentina",label:"Argentina",money:["Pesos Argentinos","Dólares"]},{value:"Bolivia",label:"Bolivia",money:["Boliviano","Dólares"]},{value:"Brasil",label:"Brasil",money:["Reals","Dólares"]},{value:"Chile",label:"Chile",money:["Pesos Chileno","Dólares"]},{value:"Colombia",label:"Colombia",money:["Pesos Colombiano","Dólares"]},{value:"Costa Rica",label:"Costa Rica",money:["Colón costarricense","Dólares"]},{value:"Cuba",label:"Cuba",money:["Pesos Cubano","Dólares"]},{value:"Ecuador",label:"Ecuador",money:["Dólares"]},{value:"El Salvador",label:"El Salvador",money:["Dólares"]},{value:"Guayana Francesa",label:"Guayana Francesa",money:["Euro","Dólares"]},{value:"Granada",label:"Granada",money:["Dólares del Caribe Oriental","Dólares"]},{value:"Guatemala",label:"Guatemala",money:["Quetzal","Dólares"]},{value:"Guayana",label:"Guayana",money:["Dólares guyanés","Dólares"]},{value:"Haiti",label:"Haiti",money:["Gourde","Dólares"]},{value:"Honduras",label:"Honduras",money:["Lempiras hondureños","Dólares"]},{value:"Jamaica",label:"Jamaica",money:["Dólareses jamaiquino","Dólares"]},{value:"Mexico",label:"Mexico",money:["Pesos mexicanos","Dólares"]},{value:"Nicaragua",label:"Nicaragua",money:["Córdobas","Dólares"]},{value:"Paraguay",label:"Paraguay",money:["Guaraní paraguayos","Dólares"]},{value:"Panama",label:"Panama",money:["Balboa","Dólares"]},{value:"Peru",label:"Peru",money:["Soles","Dólares"]},{value:"Puerto Rico",label:"Puerto Rico",money:["Dólares"]},{value:"Republica Dominicana",label:"Republica Dominicana",money:["Pesos dominicano","Dólares"]},{value:"Surinam",label:"Surinam",money:["Dólares surinamés","Dólares"]},{value:"Uruguay",label:"Uruguay",money:["Pesos uruguayo","Dólares"]},{value:"Venezuela",label:"Venezuela",money:["Bolivares","Dólares"]},{value:"Espana",label:"Espana",money:["Euros","Dólares"]},{value:"Estados Unidos",label:"Estados Unidos",money:["Dólares"]},{value:"Europa",label:"Europa",money:["Euros","Dólares"]}];t["a"]={pais:i}},6718:function(e,t,a){var i=a("e53d"),n=a("584a"),r=a("b8e3"),o=a("ccb9"),l=a("d9f6").f;e.exports=function(e){var t=n.Symbol||(n.Symbol=r?{}:i.Symbol||{});"_"==e.charAt(0)||e in t||l(t,e,{value:o.f(e)})}},"67bb":function(e,t,a){e.exports=a("f921")},"69d3":function(e,t,a){a("6718")("asyncIterator")},"6abf":function(e,t,a){var i=a("e6f3"),n=a("1691").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return i(e,n)}},"6d67":function(e,t,a){"use strict";var i=a("5ca1"),n=a("0a49")(1);i(i.P+i.F*!a("2f21")([].map,!0),"Array",{map:function(e){return n(this,e,arguments[1])}})},7618:function(e,t,a){"use strict";a.d(t,"a",function(){return s});var i=a("5d58"),n=a.n(i),r=a("67bb"),o=a.n(r);function l(e){return l="function"===typeof o.a&&"symbol"===typeof n.a?function(e){return typeof e}:function(e){return e&&"function"===typeof o.a&&e.constructor===o.a&&e!==o.a.prototype?"symbol":typeof e},l(e)}function s(e){return s="function"===typeof o.a&&"symbol"===l(n.a)?function(e){return l(e)}:function(e){return e&&"function"===typeof o.a&&e.constructor===o.a&&e!==o.a.prototype?"symbol":l(e)},s(e)}},"765d":function(e,t,a){a("6718")("observable")},"8aae":function(e,t,a){a("32a6"),e.exports=a("584a").Object.keys},9003:function(e,t,a){var i=a("6b4c");e.exports=Array.isArray||function(e){return"Array"==i(e)}},"9aa9":function(e,t){t.f=Object.getOwnPropertySymbols},a4bb:function(e,t,a){e.exports=a("8aae")},bf0b:function(e,t,a){var i=a("355d"),n=a("aebd"),r=a("36c3"),o=a("1bc3"),l=a("07e3"),s=a("794b"),c=Object.getOwnPropertyDescriptor;t.f=a("8e60")?c:function(e,t){if(e=r(e),t=o(t,!0),s)try{return c(e,t)}catch(a){}if(l(e,t))return n(!i.f.call(e,t),e[t])}},ccb9:function(e,t,a){t.f=a("5168")},ce7ec:function(e,t,a){var i=a("63b6"),n=a("584a"),r=a("294c");e.exports=function(e,t){var a=(n.Object||{})[e]||Object[e],o={};o[e]=t(a),i(i.S+i.F*r(function(){a(1)}),"Object",o)}},d8d6:function(e,t,a){a("1654"),a("6c1c"),e.exports=a("ccb9").f("iterator")},ebfa:function(e,t,a){"use strict";var i=a("1af8"),n=a.n(i);n.a},ebfd:function(e,t,a){var i=a("62a0")("meta"),n=a("f772"),r=a("07e3"),o=a("d9f6").f,l=0,s=Object.isExtensible||function(){return!0},c=!a("294c")(function(){return s(Object.preventExtensions({}))}),d=function(e){o(e,i,{value:{i:"O"+ ++l,w:{}}})},u=function(e,t){if(!n(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!r(e,i)){if(!s(e))return"F";if(!t)return"E";d(e)}return e[i].i},f=function(e,t){if(!r(e,i)){if(!s(e))return!0;if(!t)return!1;d(e)}return e[i].w},m=function(e){return c&&b.NEED&&s(e)&&!r(e,i)&&d(e),e},b=e.exports={KEY:i,NEED:!1,fastKey:u,getWeak:f,onFreeze:m}},f921:function(e,t,a){a("014b"),a("c207"),a("69d3"),a("765d"),e.exports=a("584a").Symbol}}]);
//# sourceMappingURL=chunk-d18c93b0.734a6fae.js.map