(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-660490bc"],{"014b":function(e,a,t){"use strict";var n=t("e53d"),r=t("07e3"),o=t("8e60"),i=t("63b6"),l=t("9138"),c=t("ebfd").KEY,u=t("294c"),s=t("dbdb"),f=t("45f2"),b=t("62a0"),d=t("5168"),m=t("ccb9"),p=t("6718"),y=t("47ee"),v=t("9003"),h=t("e4ae"),g=t("f772"),D=t("36c3"),x=t("1bc3"),w=t("aebd"),O=t("a159"),S=t("0395"),P=t("bf0b"),E=t("d9f6"),k=t("c3a1"),C=P.f,_=E.f,j=S.f,N=n.Symbol,F=n.JSON,T=F&&F.stringify,G="prototype",I=d("_hidden"),A=d("toPrimitive"),B={}.propertyIsEnumerable,J=s("symbol-registry"),R=s("symbols"),V=s("op-symbols"),M=Object[G],L="function"==typeof N,z=n.QObject,H=!z||!z[G]||!z[G].findChild,U=o&&u(function(){return 7!=O(_({},"a",{get:function(){return _(this,"a",{value:7}).a}})).a})?function(e,a,t){var n=C(M,a);n&&delete M[a],_(e,a,t),n&&e!==M&&_(M,a,n)}:_,q=function(e){var a=R[e]=O(N[G]);return a._k=e,a},K=L&&"symbol"==typeof N.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof N},W=function(e,a,t){return e===M&&W(V,a,t),h(e),a=x(a,!0),h(t),r(R,a)?(t.enumerable?(r(e,I)&&e[I][a]&&(e[I][a]=!1),t=O(t,{enumerable:w(0,!1)})):(r(e,I)||_(e,I,w(1,{})),e[I][a]=!0),U(e,a,t)):_(e,a,t)},Q=function(e,a){h(e);var t,n=y(a=D(a)),r=0,o=n.length;while(o>r)W(e,t=n[r++],a[t]);return e},Y=function(e,a){return void 0===a?O(e):Q(O(e),a)},$=function(e){var a=B.call(this,e=x(e,!0));return!(this===M&&r(R,e)&&!r(V,e))&&(!(a||!r(this,e)||!r(R,e)||r(this,I)&&this[I][e])||a)},X=function(e,a){if(e=D(e),a=x(a,!0),e!==M||!r(R,a)||r(V,a)){var t=C(e,a);return!t||!r(R,a)||r(e,I)&&e[I][a]||(t.enumerable=!0),t}},Z=function(e){var a,t=j(D(e)),n=[],o=0;while(t.length>o)r(R,a=t[o++])||a==I||a==c||n.push(a);return n},ee=function(e){var a,t=e===M,n=j(t?V:D(e)),o=[],i=0;while(n.length>i)!r(R,a=n[i++])||t&&!r(M,a)||o.push(R[a]);return o};L||(N=function(){if(this instanceof N)throw TypeError("Symbol is not a constructor!");var e=b(arguments.length>0?arguments[0]:void 0),a=function(t){this===M&&a.call(V,t),r(this,I)&&r(this[I],e)&&(this[I][e]=!1),U(this,e,w(1,t))};return o&&H&&U(M,e,{configurable:!0,set:a}),q(e)},l(N[G],"toString",function(){return this._k}),P.f=X,E.f=W,t("6abf").f=S.f=Z,t("355d").f=$,t("9aa9").f=ee,o&&!t("b8e3")&&l(M,"propertyIsEnumerable",$,!0),m.f=function(e){return q(d(e))}),i(i.G+i.W+i.F*!L,{Symbol:N});for(var ae="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),te=0;ae.length>te;)d(ae[te++]);for(var ne=k(d.store),re=0;ne.length>re;)p(ne[re++]);i(i.S+i.F*!L,"Symbol",{for:function(e){return r(J,e+="")?J[e]:J[e]=N(e)},keyFor:function(e){if(!K(e))throw TypeError(e+" is not a symbol!");for(var a in J)if(J[a]===e)return a},useSetter:function(){H=!0},useSimple:function(){H=!1}}),i(i.S+i.F*!L,"Object",{create:Y,defineProperty:W,defineProperties:Q,getOwnPropertyDescriptor:X,getOwnPropertyNames:Z,getOwnPropertySymbols:ee}),F&&i(i.S+i.F*(!L||u(function(){var e=N();return"[null]"!=T([e])||"{}"!=T({a:e})||"{}"!=T(Object(e))})),"JSON",{stringify:function(e){var a,t,n=[e],r=1;while(arguments.length>r)n.push(arguments[r++]);if(t=a=n[1],(g(a)||void 0!==e)&&!K(e))return v(a)||(a=function(e,a){if("function"==typeof t&&(a=t.call(this,e,a)),!K(a))return a}),n[1]=a,T.apply(F,n)}}),N[G][A]||t("35e8")(N[G],A,N[G].valueOf),f(N,"Symbol"),f(Math,"Math",!0),f(n.JSON,"JSON",!0)},"0395":function(e,a,t){var n=t("36c3"),r=t("6abf").f,o={}.toString,i="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],l=function(e){try{return r(e)}catch(a){return i.slice()}};e.exports.f=function(e){return i&&"[object Window]"==o.call(e)?l(e):r(n(e))}},"2d8d":function(e,a,t){"use strict";var n=t("e4b6"),r=t.n(n);r.a},"32a6":function(e,a,t){var n=t("241e"),r=t("c3a1");t("ce7ec")("keys",function(){return function(e){return r(n(e))}})},"355d":function(e,a){a.f={}.propertyIsEnumerable},"47ee":function(e,a,t){var n=t("c3a1"),r=t("9aa9"),o=t("355d");e.exports=function(e){var a=n(e),t=r.f;if(t){var i,l=t(e),c=o.f,u=0;while(l.length>u)c.call(e,i=l[u++])&&a.push(i)}return a}},"5d58":function(e,a,t){e.exports=t("d8d6")},"64d2":function(e,a,t){"use strict";var n=[{value:"Argentina",label:"Argentina",money:["Pesos Argentinos","Dólares"]},{value:"Bolivia",label:"Bolivia",money:["Boliviano","Dólares"]},{value:"Brasil",label:"Brasil",money:["Reals","Dólares"]},{value:"Chile",label:"Chile",money:["Pesos Chileno","Dólares"]},{value:"Colombia",label:"Colombia",money:["Pesos Colombiano","Dólares"]},{value:"Costa Rica",label:"Costa Rica",money:["Colón costarricense","Dólares"]},{value:"Cuba",label:"Cuba",money:["Pesos Cubano","Dólares"]},{value:"Ecuador",label:"Ecuador",money:["Dólares"]},{value:"El Salvador",label:"El Salvador",money:["Dólares"]},{value:"Guayana Francesa",label:"Guayana Francesa",money:["Euro","Dólares"]},{value:"Granada",label:"Granada",money:["Dólares del Caribe Oriental","Dólares"]},{value:"Guatemala",label:"Guatemala",money:["Quetzal","Dólares"]},{value:"Guayana",label:"Guayana",money:["Dólares guyanés","Dólares"]},{value:"Haiti",label:"Haiti",money:["Gourde","Dólares"]},{value:"Honduras",label:"Honduras",money:["Lempiras hondureños","Dólares"]},{value:"Jamaica",label:"Jamaica",money:["Dólareses jamaiquino","Dólares"]},{value:"Mexico",label:"Mexico",money:["Pesos mexicanos","Dólares"]},{value:"Nicaragua",label:"Nicaragua",money:["Córdobas","Dólares"]},{value:"Paraguay",label:"Paraguay",money:["Guaraní paraguayos","Dólares"]},{value:"Panama",label:"Panama",money:["Balboa","Dólares"]},{value:"Peru",label:"Peru",money:["Soles","Dólares"]},{value:"Puerto Rico",label:"Puerto Rico",money:["Dólares"]},{value:"Republica Dominicana",label:"Republica Dominicana",money:["Pesos dominicano","Dólares"]},{value:"Surinam",label:"Surinam",money:["Dólares surinamés","Dólares"]},{value:"Uruguay",label:"Uruguay",money:["Pesos uruguayo","Dólares"]},{value:"Venezuela",label:"Venezuela",money:["Bolivares","Dólares"]},{value:"Espana",label:"Espana",money:["Euros","Dólares"]},{value:"Estados Unidos",label:"Estados Unidos",money:["Dólares"]},{value:"Europa",label:"Europa",money:["Euros","Dólares"]}];a["a"]={pais:n}},6718:function(e,a,t){var n=t("e53d"),r=t("584a"),o=t("b8e3"),i=t("ccb9"),l=t("d9f6").f;e.exports=function(e){var a=r.Symbol||(r.Symbol=o?{}:n.Symbol||{});"_"==e.charAt(0)||e in a||l(a,e,{value:i.f(e)})}},"67bb":function(e,a,t){e.exports=t("f921")},"69d3":function(e,a,t){t("6718")("asyncIterator")},"6abf":function(e,a,t){var n=t("e6f3"),r=t("1691").concat("length","prototype");a.f=Object.getOwnPropertyNames||function(e){return n(e,r)}},"6d67":function(e,a,t){"use strict";var n=t("5ca1"),r=t("0a49")(1);n(n.P+n.F*!t("2f21")([].map,!0),"Array",{map:function(e){return r(this,e,arguments[1])}})},7618:function(e,a,t){"use strict";t.d(a,"a",function(){return c});var n=t("5d58"),r=t.n(n),o=t("67bb"),i=t.n(o);function l(e){return l="function"===typeof i.a&&"symbol"===typeof r.a?function(e){return typeof e}:function(e){return e&&"function"===typeof i.a&&e.constructor===i.a&&e!==i.a.prototype?"symbol":typeof e},l(e)}function c(e){return c="function"===typeof i.a&&"symbol"===l(r.a)?function(e){return l(e)}:function(e){return e&&"function"===typeof i.a&&e.constructor===i.a&&e!==i.a.prototype?"symbol":l(e)},c(e)}},"765d":function(e,a,t){t("6718")("observable")},"8aae":function(e,a,t){t("32a6"),e.exports=t("584a").Object.keys},9003:function(e,a,t){var n=t("6b4c");e.exports=Array.isArray||function(e){return"Array"==n(e)}},"9aa9":function(e,a){a.f=Object.getOwnPropertySymbols},"9f5b":function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{attrs:{id:"shippingOrder"}},[t("v-container",{attrs:{"grid-list-xl":"",fluid:""}},[t("v-layout",{attrs:{row:"",wrap:""}},[t("v-flex",{attrs:{lg12:""}},[t("v-btn",{attrs:{color:"success",flat:""},on:{click:function(a){return e.handleDownload()}}},[t("i",{staticClass:"fa fa-file-excel"}),e._v(" \n                Exportar\n              ")])],1)],1)],1),t("v-snackbar",{attrs:{timeout:3e3,top:"",right:"",color:e.snackbar.color},model:{value:e.snackbar.show,callback:function(a){e.$set(e.snackbar,"show",a)},expression:"snackbar.show"}},[t("p",{staticStyle:{margin:"0"}},[t("i",{class:e.snackbar.icon}),e._v("\n       \n      "+e._s(e.snackbar.text)+"\n    ")]),t("v-btn",{attrs:{dark:"",flat:"",icon:""},nativeOn:{click:function(a){e.snackbar.show=!1}}},[t("v-icon",[e._v("close")])],1)],1)],1)},r=[],o=t("7618"),i=t("a4bb"),l=t.n(i),c=(t("ac6a"),t("f3e2"),t("6d67"),t("a481"),t("bd86")),u=(t("cadf"),t("551c"),t("f751"),t("097d"),t("da71")),s=t("64d2"),f={data:function(){var e;return e={search:"",disabled:!1,modalLoader:!1,saveLoader:!1,admin:!0,selectedTab:null,snackbar:{show:!1,text:"",color:"",icon:""},onlyEmail:[function(e){return/.+@.+/.test(e)||"Formato de correo electrónico no válido"}],onlyText:[function(e){return!!e||"Campo requerido"},function(e){return isNaN(e)||"Campo solo debe contener letras"}],onlyNumbers:[function(e){return!!e||"Campo requerido"},function(e){return!isNaN(e)||"Campo solo debe contener números"}],basic:{dialogClient:!1,dialogAfiliate:!1,doc_types:[{value:"1",text:"PTP"},{value:"2",text:"DNI"},{value:"3",text:"Pasaporte"},{value:"4",text:"C.E."},{value:"5",text:"C.I."}],countries:s["a"].pais},client:{id:null,shipper:"",doc_type:"",number:"",contact_person:"",address:"",country:"",city:"",phone:"",email:""},afiliated:{id:null,destination_name:"",doc_type:"",number:"",attention:"",address:"",country:"",city:"",phone:"",email:""}},Object(c["a"])(e,"snackbar",{show:!1,text:"",color:"",icon:""}),Object(c["a"])(e,"complex",{headers:[{text:"Fecha de recepción",value:"fecha"},{text:"Tracking",value:"tracking"},{text:"Guia Master",value:"package.tracking"},{text:"Remitente",value:"clients.shipper"},{text:"Destinatario",value:"client_afiliated.destination_name"},{text:"Fecha de salida",value:"out_date"},{text:"",value:""}],items:[],itemsenviados:[],itemscompletadas:[]}),e},created:function(){this.getOrders()},methods:{getOrders:function(){var e=this,a="ship-order";if('"2"'==localStorage.getItem("role")||'"3"'==localStorage.getItem("role")){var t=localStorage.getItem("country");t=t.replace(/[ '"]+/g,"");a="ship-order";this.admin=!0}u["a"].get(a).then(function(a){e.complex.items=a.data.items})},handleDownload:function(){var e=this;this.downloadLoading=!0,t.e("chunk-8be3ab8c").then(t.bind(null,"4bf8d")).then(function(a){var t=["Fecha","N Tracking - Guia","Ciudad","Nombre y Apellido","DNI/Pasaporte/Cedula","Telefono","Ciudad donde envia","Peso Peruven","Descripción Encomienda","Total Boleta Dolares","Moneda de Boleta","Total Boleta Seguro","Moneda de Seguro","Nombre y Apellido","Telefono","Cedula","Precio Tealca","Precio Copa"],n=["created","tracking",{city:"clients"},{shipper:"clients"},{number:"clients"},{phone:"clients"},"tealca_office","actual_weight","productos","total","currency","total_ensurance","currency_ensurance",{attention:"client_afiliated"},{phone:"client_afiliated"},{number:"client_afiliated"},"tealca","copa"],r=e.formatJson(n,e.complex.items);a.export_json_to_excel({header:t,data:r,filename:"envios-list"}),e.downloadLoading=!1})},formatJson:function(e,a){var t=this;return a.map(function(a){return e.map(function(e){if("timestamp"===e)return parseTime(a[e]);if(t.isObject(e)){var n="";return l()(e).forEach(function(t){var r=e[t],o=t;n=a[r][o]+" "+n}),n}return a[e]})})},isObject:function(e){return e&&"object"===Object(o["a"])(e)&&e.constructor===Object}}},b=f,d=(t("2d8d"),t("2877")),m=t("6544"),p=t.n(m),y=t("8336"),v=t("a523"),h=t("0e8f"),g=t("132d"),D=t("a722"),x=t("2db4"),w=Object(d["a"])(b,n,r,!1,null,"78d0dce0",null);a["default"]=w.exports;p()(w,{VBtn:y["a"],VContainer:v["a"],VFlex:h["a"],VIcon:g["a"],VLayout:D["a"],VSnackbar:x["a"]})},a4bb:function(e,a,t){e.exports=t("8aae")},bf0b:function(e,a,t){var n=t("355d"),r=t("aebd"),o=t("36c3"),i=t("1bc3"),l=t("07e3"),c=t("794b"),u=Object.getOwnPropertyDescriptor;a.f=t("8e60")?u:function(e,a){if(e=o(e),a=i(a,!0),c)try{return u(e,a)}catch(t){}if(l(e,a))return r(!n.f.call(e,a),e[a])}},ccb9:function(e,a,t){a.f=t("5168")},ce7ec:function(e,a,t){var n=t("63b6"),r=t("584a"),o=t("294c");e.exports=function(e,a){var t=(r.Object||{})[e]||Object[e],i={};i[e]=a(t),n(n.S+n.F*o(function(){t(1)}),"Object",i)}},d8d6:function(e,a,t){t("1654"),t("6c1c"),e.exports=t("ccb9").f("iterator")},e4b6:function(e,a,t){},ebfd:function(e,a,t){var n=t("62a0")("meta"),r=t("f772"),o=t("07e3"),i=t("d9f6").f,l=0,c=Object.isExtensible||function(){return!0},u=!t("294c")(function(){return c(Object.preventExtensions({}))}),s=function(e){i(e,n,{value:{i:"O"+ ++l,w:{}}})},f=function(e,a){if(!r(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!o(e,n)){if(!c(e))return"F";if(!a)return"E";s(e)}return e[n].i},b=function(e,a){if(!o(e,n)){if(!c(e))return!0;if(!a)return!1;s(e)}return e[n].w},d=function(e){return u&&m.NEED&&c(e)&&!o(e,n)&&s(e),e},m=e.exports={KEY:n,NEED:!1,fastKey:f,getWeak:b,onFreeze:d}},f921:function(e,a,t){t("014b"),t("c207"),t("69d3"),t("765d"),e.exports=t("584a").Symbol}}]);
//# sourceMappingURL=chunk-660490bc.dcde4578.js.map