(function(e){function t(t){for(var a,r,s=t[0],l=t[1],c=t[2],u=0,d=[];u<s.length;u++)r=s[u],i[r]&&d.push(i[r][0]),i[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);p&&p(t);while(d.length)d.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,r=1;r<n.length;r++){var s=n[r];0!==i[s]&&(a=!1)}a&&(o.splice(t--,1),e=l(l.s=n[0]))}return e}var a={},r={app:0},i={app:0},o=[];function s(e){return l.p+"js/"+({routes:"routes"}[e]||e)+"."+{"chunk-7cd35928":"e4046d48","chunk-270bee03":"43bd9ce0","chunk-2d0b1de5":"c298fd63","chunk-815e4266":"8a4c0240","chunk-a0c5ed88":"b56d331b","chunk-b79f5280":"8407b081",routes:"da98fefe"}[e]+".js"}function l(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(e){var t=[],n={"chunk-270bee03":1,"chunk-815e4266":1,"chunk-a0c5ed88":1,"chunk-b79f5280":1,routes:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise(function(t,n){for(var a="css/"+({routes:"routes"}[e]||e)+"."+{"chunk-7cd35928":"31d6cfe0","chunk-270bee03":"dfdd6c68","chunk-2d0b1de5":"31d6cfe0","chunk-815e4266":"655c8452","chunk-a0c5ed88":"f28542cf","chunk-b79f5280":"674c60ff",routes:"3503b40f"}[e]+".css",i=l.p+a,o=document.getElementsByTagName("link"),s=0;s<o.length;s++){var c=o[s],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===a||u===i))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){c=d[s],u=c.getAttribute("data-href");if(u===a||u===i)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var a=t&&t.target&&t.target.src||i,o=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");o.request=a,delete r[e],p.parentNode.removeChild(p),n(o)},p.href=i;var f=document.getElementsByTagName("head")[0];f.appendChild(p)}).then(function(){r[e]=0}));var a=i[e];if(0!==a)if(a)t.push(a[2]);else{var o=new Promise(function(t,n){a=i[e]=[t,n]});t.push(a[2]=o);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=s(e),c=function(t){u.onerror=u.onload=null,clearTimeout(d);var n=i[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,o=new Error("Loading chunk "+e+" failed.\n("+a+": "+r+")");o.type=a,o.request=r,n[1](o)}i[e]=void 0}};var d=setTimeout(function(){c({type:"timeout",target:u})},12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(t)},l.m=e,l.c=a,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)l.d(n,a,function(t){return e[t]}.bind(null,a));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="/peruven/",l.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var d=0;d<c.length;d++)t(c[d]);var p=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"23b0":function(e,t,n){},"42f9":function(e,t,n){"use strict";var a=n("d1ae"),r=n.n(a);r.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),r=n("bb71");n("da64"),n("83b1");a["default"].use(r["default"],{theme:{primary:"#ee44aa",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"},customProperties:!0,iconfont:"fa4"});var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"appRoot"}},[e.$route.meta.public?[n("transition",[n("keep-alive",[n("router-view",{key:e.$route.fullpath})],1)],1)]:[n("v-app",{staticClass:"app",attrs:{id:"inspire"}},[n("app-drawer",{staticClass:"app--drawer"}),n("app-toolbar",{staticClass:"app--toolbar"}),n("v-content",[e.$route.meta.breadcrumb?n("page-header"):e._e(),n("div",{staticClass:"page-wrapper"},[n("router-view")],1),n("v-footer",{staticClass:"white pa-3 app--footer",attrs:{height:"auto"}},[n("span",{staticClass:"caption"},[e._v("Venetronic Design © "+e._s((new Date).getFullYear()))]),n("v-spacer"),n("span",{staticClass:"caption mr-1"},[e._v(" Venetronic ")]),n("v-icon",{attrs:{color:"pink",small:""}},[e._v("favorite")])],1)],1),n("app-fab"),n("v-btn",{staticClass:"setting-fab",attrs:{small:"",fab:"",dark:"",falt:"",fixed:"",top:"top",right:"right",color:"red"},on:{click:e.openThemeSettings}},[n("v-icon",[e._v("settings")])],1),n("v-navigation-drawer",{staticClass:"setting-drawer",attrs:{temporary:"",right:"","hide-overlay":"",fixed:""},model:{value:e.rightDrawer,callback:function(t){e.rightDrawer=t},expression:"rightDrawer"}},[n("theme-settings")],1)],1)],n("v-snackbar",{attrs:{timeout:3e3,bottom:"",right:"",color:e.snackbar.color},model:{value:e.snackbar.show,callback:function(t){e.$set(e.snackbar,"show",t)},expression:"snackbar.show"}},[e._v("\n    "+e._s(e.snackbar.text)+"\n    "),n("v-btn",{attrs:{dark:"",flat:"",icon:""},nativeOn:{click:function(t){e.snackbar.show=!1}}},[n("v-icon",[e._v("close")])],1)],1)],2)},o=[],s=(n("7f7f"),n("ac6a"),n("f3e2"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-navigation-drawer",{attrs:{id:"appDrawer","mini-variant":e.mini,fixed:"",dark:e.$vuetify.dark,app:"",width:"260"},on:{"update:miniVariant":function(t){e.mini=t},"update:mini-variant":function(t){e.mini=t}},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-toolbar",{attrs:{color:"primary darken-1",dark:""}},[n("v-toolbar-title",{staticClass:"ml-0 pl-3"},[n("span",{staticClass:"hidden-sm-and-down"},[e._v("Soft Administrativo")])])],1),n("vue-perfect-scrollbar",{staticClass:"drawer-menu--scroll",attrs:{settings:e.scrollSettings}},[n("v-list",{attrs:{dense:"",expand:""}},[e._l(e.menus,function(t,a){return[t.items?n("v-list-group",{key:t.name,attrs:{group:t.group,"prepend-icon":t.icon,"no-action":"no-action"}},[n("v-list-tile",{attrs:{slot:"activator",ripple:"ripple"},slot:"activator"},[n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(t.title))])],1)],1),e._l(t.items,function(a,r){return[a.items?n("v-list-group",{key:a.name,attrs:{group:a.group,"sub-group":"sub-group"}},[n("v-list-tile",{attrs:{slot:"activator",ripple:"ripple"},slot:"activator"},[n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(a.title))])],1)],1),e._l(a.children,function(a,r){return n("v-list-tile",{key:r,attrs:{to:e.genChildTarget(t,a),href:a.href,ripple:"ripple"}},[n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(a.title))])],1)],1)})],2):n("v-list-tile",{key:r,attrs:{to:e.genChildTarget(t,a),href:a.href,disabled:a.disabled,target:a.target,ripple:"ripple"}},[n("v-list-tile-content",[n("v-list-tile-title",[n("span",[e._v(e._s(a.title))])])],1),a.action?n("v-list-tile-action",[n("v-icon",{class:[a.actionClass||"success--text"]},[e._v(e._s(a.action))])],1):e._e()],1)]})],2):t.header?n("v-subheader",{key:a},[e._v(e._s(t.header))]):t.divider?n("v-divider",{key:a}):n("v-list-tile",{key:t.name,attrs:{to:t.href?null:{name:t.name},href:t.href,ripple:"ripple",disabled:t.disabled,target:t.target,rel:"noopener"}},[t.icon?n("v-list-tile-action",[n("v-icon",[e._v(e._s(t.icon))])],1):e._e(),n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(t.title))])],1),t.subAction?n("v-list-tile-action",[n("v-icon",{staticClass:"success--text"},[e._v(e._s(t.subAction))])],1):e._e()],1)]})],2)],1)],1)}),l=[],c=[{header:"Apps"},{title:"Dashboard",group:"apps",icon:"dashboard",name:"Dashboard"},{title:"Impuestos",group:"apps",icon:"fa fa-percent",name:"Taxes"},{title:"Categorización",group:"categorizacion",component:"Taxonomies",icon:"local_offer",items:[{name:"Categories",title:"Categorias",component:"Categories"},{name:"SubCategory",title:"Subcategorías",component:"SubCategory"}]},{title:"Ordenes de envíos",group:"ordenes-de-envios",component:"shippingOrders",icon:"local_shipping",items:[{name:"Clients",title:"Clientes",component:"Clients"},{name:"Afiliated",title:"Afiliados",component:"Afiliated"},{name:"newShippOrder",title:"Ordenes de Envío",component:"ShippOrder"}]},{divider:!0}],u=c,d=n("9d63"),p=n.n(d),f={name:"app-drawer",components:{VuePerfectScrollbar:p.a},props:{expanded:{type:Boolean,default:!0}},data:function(){return{mini:!1,drawer:!0,menus:u,scrollSettings:{maxScrollbarLength:160}}},computed:{computeGroupActive:function(){return!0},computeLogo:function(){return"/static/m.png"},sideToolbarColor:function(){return this.$vuetify.options.extra.sideNav}},created:function(){var e=this;window.getApp.$on("APP_DRAWER_TOGGLED",function(){e.drawer=!e.drawer})},methods:{genChildTarget:function(e,t){if(!t.href)return t.component?{name:t.component}:{name:"".concat(e.group,"/").concat(t.name)}}}},m=f,v=(n("42f9"),n("2877")),h=n("6544"),b=n.n(h),g=n("ce7e"),k=n("132d"),w=n("8860"),_=n("56b0"),y=n("ba95"),C=n("40fe"),T=n("5d23"),S=n("f774"),V=n("e0c7"),x=n("71d9"),P=n("2a7f"),A=Object(v["a"])(m,s,l,!1,null,null,null),E=A.exports;b()(A,{VDivider:g["a"],VIcon:k["a"],VList:w["a"],VListGroup:_["a"],VListTile:y["a"],VListTileAction:C["a"],VListTileContent:T["g"],VListTileTitle:T["i"],VNavigationDrawer:S["a"],VSubheader:V["a"],VToolbar:x["a"],VToolbarTitle:P["d"]});var O=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-toolbar",{attrs:{color:"primary",fixed:"",dark:"",app:""}},[n("v-toolbar-title",{staticClass:"ml-0 pl-3"},[n("v-toolbar-side-icon",{on:{click:function(t){return t.stopPropagation(),e.handleDrawerToggle(t)}}})],1),n("v-spacer"),n("v-btn",{attrs:{icon:""},on:{click:function(t){return e.handleFullScreen()}}},[n("v-icon",[e._v("fullscreen")])],1),n("v-menu",{attrs:{"offset-y":"",origin:"center center",left:"","nudge-bottom":10,transition:"scale-transition"}},[n("v-btn",{attrs:{slot:"activator",icon:"",large:"",flat:""},slot:"activator"},[n("v-avatar",{attrs:{size:"30px"}},[n("v-icon",[e._v("account_circle")])],1)],1),n("v-list",{staticClass:"pa-0"},e._l(e.items,function(t,a){return n("v-list-tile",{key:a,attrs:{to:t.href?null:{name:t.name},href:t.href,ripple:"ripple",disabled:t.disabled,target:t.target,rel:"noopener"},on:{click:t.click}},[t.icon?n("v-list-tile-action",[n("v-icon",[e._v(e._s(t.icon))])],1):e._e(),n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(t.title))])],1)],1)}),1)],1)],1)},N=[],$=(n("a481"),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return e[Math.floor(Math.random()*e.length)]}),D=function(e){return(e||"").replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()},F=function(){var e=window.document,t=e.documentElement,n=t.requestFullscreen||t.mozRequestFullScreen||t.webkitRequestFullScreen||t.msRequestFullscreen,a=e.exitFullscreen||e.mozCancelFullScreen||e.webkitExitFullscreen||e.msExitFullscreen;e.fullscreenElement||e.mozFullScreenElement||e.webkitFullscreenElement||e.msFullscreenElement?a.call(e):n.call(t)},L={randomElement:$,toggleFullScreen:F,kebab:D},B={name:"app-toolbar",data:function(){return{items:[{href:"#",title:"Perfil",click:function(e){console.log(e)}},{href:"#",title:"Cerrar Sesión",click:function(e){window.getApp.$emit("APP_LOGOUT")}}]}},computed:{toolbarColor:function(){return this.$vuetify.options.extra.mainNav}},methods:{handleDrawerToggle:function(){window.getApp.$emit("APP_DRAWER_TOGGLED")},handleFullScreen:function(){L.toggleFullScreen()}}},j=B,M=n("8212"),R=n("8336"),G=n("e449"),I=n("9910"),z=n("706c"),q=Object(v["a"])(j,O,N,!1,null,null,null),U=q.exports;b()(q,{VAvatar:M["a"],VBtn:R["a"],VIcon:k["a"],VList:w["a"],VListTile:y["a"],VListTileAction:C["a"],VListTileContent:T["g"],VListTileTitle:T["i"],VMenu:G["a"],VSpacer:I["e"],VToolbar:x["a"],VToolbarSideIcon:z["a"],VToolbarTitle:P["d"]});var H=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-fab-transition",[n("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.fab,expression:"fab"}],attrs:{fab:"fab",small:"",dark:"dark",fixed:"fixed",bottom:"bottom",right:"right",color:"red"},on:{click:e.toTop}},[n("v-icon",[e._v("keyboard_arrow_up")])],1)],1)},J=[],W={name:"app-fab",data:function(){return{fab:!1}},methods:{onScroll:function(){if("undefined"!==typeof window){var e=window.pageYOffset||document.documentElement.offsetTop||0;this.fab=e>300}},toTop:function(){this.$router.push({hash:""}),this.$vuetify.goTo(0)}}},Y=W,Q=n("0789"),Z=Object(v["a"])(Y,H,J,!1,null,null,null),K=Z.exports;b()(Z,{VBtn:R["a"],VFabTransition:Q["h"],VIcon:k["a"]});var X=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-layout",{staticClass:"align-center layout px-4 pt-4 app--page-header",attrs:{row:""}},[n("div",{staticClass:"page-header-left"},[n("h3",{staticClass:"pr-3"},[e._v(e._s(e.title))])]),n("v-breadcrumbs",{attrs:{divider:"-",items:e.breadcrumbs}}),n("v-spacer"),n("div",{staticClass:"page-header-right"},[n("v-btn",{attrs:{icon:""}},[n("v-icon",{staticClass:"text--secondary"},[e._v("refresh")])],1)],1)],1)},ee=[],te=(n("7514"),{data:function(){return{title:""}},computed:{breadcrumbs:function(){var e=this,t=[];return u.forEach(function(n){if(n.items){var a=n.items.find(function(t){return t.component===e.$route.name});a&&(t.push(n.title),t.push(a.title),e.title=a.title)}else n.name===e.$route.name&&(e.title=n.title,t.push(n.title))}),t}}}),ne=te,ae=n("2bc5"),re=n("a722"),ie=Object(v["a"])(ne,X,ee,!1,null,null,null),oe=ie.exports;b()(ie,{VBreadcrumbs:ae["a"],VBtn:R["a"],VIcon:k["a"],VLayout:re["a"],VSpacer:I["e"]});var se=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"themeSetting"}},[n("v-toolbar",{attrs:{color:"blue",dark:""}},[n("v-toolbar-title",[e._v("\r\n      Theme Settings\r\n    ")])],1),n("v-container",[n("v-layout",{attrs:{column:""}},[n("v-flex",[n("v-subheader",{staticClass:"px-1 my-2"},[e._v("\r\n          Color Option\r\n        ")]),n("div",{staticClass:"color-option"},[n("v-layout",{attrs:{wrap:""}},e._l(e.themeColorOptions,function(t,a){return n("label",{key:a,staticClass:"color-option--label flex xs6 pa-1"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.themeColor,expression:"themeColor"}],attrs:{type:"radio",name:"color"},domProps:{value:t.key,checked:e._q(e.themeColor,t.key)},on:{change:function(n){e.themeColor=t.key}}}),n("span",{staticClass:"color-option--item bg"},[n("span",{staticClass:"overlay"},[n("span",{staticClass:"material-icons"},[e._v("check")])]),n("span",{staticClass:"color-option--item--header sideNav",class:t.value.sideNav}),n("span",{staticClass:"color-option--item--header mainNav",class:t.value.mainNav}),n("span",{staticClass:"sideMenu",class:t.value.sideManu})])])}),0)],1),n("div",{staticClass:"theme-options"},[n("v-subheader",{staticClass:"px-1 my-2"},[e._v("\r\n            Sidebar Option\r\n          ")]),n("v-divider"),n("div",{staticClass:"my-3"},[n("v-btn-toggle",{model:{value:e.sideBarOption,callback:function(t){e.sideBarOption=t},expression:"sideBarOption"}},[n("v-btn",{attrs:{flat:"",value:"dark"}},[e._v("\r\n                Dark\r\n              ")]),n("v-btn",{attrs:{flat:"",value:"light"}},[e._v("\r\n                Light\r\n              ")])],1)],1)],1)],1)],1)],1)],1)},le=[],ce=n("c0a4"),ue=n.n(ce),de={data:function(){return{themeColor:"indigo",sideBarOption:"light",colors:ue.a}},computed:{themeColorOptions:function(){return[{key:"blue",value:{sideNav:"blue",mainNav:"blue",sideManu:"white"}},{key:"teal",value:{sideNav:"teal",mainNav:"teal",sideManu:"white"}},{key:"red",value:{sideNav:"red",mainNav:"red",sideManu:"white"}},{key:"orange",value:{sideNav:"orange",mainNav:"orange",sideManu:"white"}},{key:"purple",value:{sideNav:"purple",mainNav:"purple",sideManu:"white"}},{key:"indigo",value:{sideNav:"indigo",mainNav:"indigo",sideManu:"white"}},{key:"cyan",value:{sideNav:"cyan",mainNav:"cyan",sideManu:"white"}},{key:"pink",value:{sideNav:"pink",mainNav:"pink",sideManu:"white"}},{key:"green",value:{sideNav:"green",mainNav:"green",sideManu:"white"}}]}},watch:{themeColor:{handler:function(e){this.$vuetify.theme.primary=this.colors[e].base},immediate:!0},sideBarOption:{handler:function(e){this.$vuetify.dark="dark"===e},immediate:!0}}},pe=de,fe=(n("d26d"),n("a609")),me=n("a523"),ve=n("0e8f"),he=Object(v["a"])(pe,se,le,!1,null,"40e67579",null),be=he.exports;b()(he,{VBtn:R["a"],VBtnToggle:fe["a"],VContainer:me["a"],VDivider:g["a"],VFlex:ve["a"],VLayout:re["a"],VSubheader:V["a"],VToolbar:x["a"],VToolbarTitle:P["d"]});var ge=[{name:"APP_LOGIN_SUCCESS",callback:function(e){this.$router.push({path:"dashboard"})}},{name:"APP_LOGOUT",callback:function(e){this.snackbar={show:!0,color:"green",text:"Logout successfully."},this.$router.replace({path:"/login"})}},{name:"APP_PAGE_LOADED",callback:function(e){}},{name:"APP_AUTH_FAILED",callback:function(e){this.$router.push("/login"),this.$message.error("Token has expired")}},{name:"APP_BAD_REQUEST",callback:function(e){this.$message.error(e)}},{name:"APP_ACCESS_DENIED",callback:function(e){this.$message.error(e),this.$router.push("/forbidden")}},{name:"APP_RESOURCE_DELETED",callback:function(e){this.$message.success(e)}},{name:"APP_RESOURCE_UPDATED",callback:function(e){this.$message.success(e)}}],ke={components:{AppDrawer:E,AppToolbar:U,AppFab:K,PageHeader:oe,ThemeSettings:be},data:function(){return{expanded:!0,rightDrawer:!1,snackbar:{show:!1,text:"",color:""}}},computed:{},created:function(){var e=this;ge.forEach(function(t){e.$on(t.name,t.callback)}),window.getApp=this},methods:{openThemeSettings:function(){this.$vuetify.goTo(0),this.rightDrawer=!this.rightDrawer}}},we=ke,_e=(n("e839"),n("7496")),ye=n("549c"),Ce=n("553a"),Te=n("2db4"),Se=Object(v["a"])(we,i,o,!1,null,"098d077e",null),Ve=Se.exports;b()(Se,{VApp:_e["a"],VBtn:R["a"],VContent:ye["a"],VFooter:Ce["a"],VIcon:k["a"],VNavigationDrawer:S["a"],VSnackbar:Te["a"],VSpacer:I["e"]});var xe=n("8c4f"),Pe=[{path:"*",meta:{public:!0},redirect:{path:"/404"}},{path:"/404",meta:{public:!0},name:"NotFound",component:function(){return Promise.all([n.e("chunk-7cd35928"),n.e("routes")]).then(n.bind(null,"9703"))}},{path:"/403",meta:{public:!0},name:"AccessDenied",component:function(){return Promise.all([n.e("chunk-7cd35928"),n.e("routes")]).then(n.bind(null,"1569"))}},{path:"/500",meta:{public:!0},name:"ServerError",component:function(){return Promise.all([n.e("chunk-7cd35928"),n.e("routes")]).then(n.bind(null,"dda8"))}},{path:"/login",meta:{public:!0},name:"Login",component:function(){return Promise.all([n.e("chunk-7cd35928"),n.e("routes")]).then(n.bind(null,"a55b"))}},{path:"/",meta:{},name:"Root",redirect:{name:"Login"}},{path:"/dashboard",meta:{breadcrumb:!0},name:"Dashboard",component:function(){return Promise.all([n.e("chunk-7cd35928"),n.e("routes")]).then(n.bind(null,"7277"))}},{path:"/impuestos",meta:{breadcrumb:!0},name:"Taxes",component:function(){return Promise.all([n.e("chunk-7cd35928"),n.e("routes")]).then(n.bind(null,"385f"))}},{path:"/categorizacion/categorias",meta:{breadcrumb:!0},name:"Categories",component:function(){return Promise.all([n.e("chunk-7cd35928"),n.e("routes")]).then(n.bind(null,"9fe6"))}},{path:"/categorizacion/subcategorias",meta:{breadcrumb:!0},name:"SubCategory",component:function(){return Promise.all([n.e("chunk-7cd35928"),n.e("routes")]).then(n.bind(null,"d5fe"))}},{path:"/ordenes-de-envios/clientes",meta:{breadcrumb:!0},name:"Clients",component:function(){return Promise.all([n.e("chunk-7cd35928"),n.e("chunk-815e4266")]).then(n.bind(null,"937a"))}},{path:"/ordenes-de-envios/afiliados",meta:{breadcrumb:!0},name:"Afiliated",component:function(){return Promise.all([n.e("chunk-7cd35928"),n.e("chunk-b79f5280")]).then(n.bind(null,"6ad5"))}},{path:"/ordenes-de-envios/listado",meta:{breadcrumb:!0},name:"ShippOrder",component:function(){return Promise.all([n.e("chunk-7cd35928"),n.e("chunk-2d0b1de5")]).then(n.bind(null,"224c"))}},{path:"/ordenes-de-envios/crear",meta:{breadcrumb:!0},name:"newShippOrder",component:function(){return Promise.all([n.e("chunk-7cd35928"),n.e("chunk-270bee03")]).then(n.bind(null,"0a6c"))}},{path:"/ordenes-de-envios/ver/:uuid?",meta:{breadcrumb:!0},name:"shipOrderView",component:function(){return Promise.all([n.e("chunk-7cd35928"),n.e("chunk-a0c5ed88")]).then(n.bind(null,"66c0"))}}],Ae=n("323e"),Ee=n.n(Ae);n("a5d8");a["default"].use(xe["a"]);var Oe=new xe["a"]({base:"/",mode:"hash",linkActiveClass:"active",routes:Pe});Oe.beforeEach(function(e,t,n){Ee.a.start(),n()}),Oe.afterEach(function(e,t){Ee.a.done()});var Ne=Oe,$e=n("2f62");a["default"].use($e["a"]);var De=new $e["a"].Store({state:{},mutations:{},actions:{}}),Fe=n("9483");Object(Fe["a"])("".concat("/peruven/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});n("d5e8"),n("7f10");var Le=n("9eed"),Be=n.n(Le);a["default"].use(Be.a,{buttonTrueText:"Si",buttonFalseText:"No",color:"warning",icon:"warning",title:"",width:350,property:"$confirm"}),a["default"].config.productionTip=!1,new a["default"]({router:Ne,store:De,render:function(e){return e(Ve)}}).$mount("#app")},"60ed":function(e,t,n){},"83b1":function(e,t,n){},d1ae:function(e,t,n){},d26d:function(e,t,n){"use strict";var a=n("23b0"),r=n.n(a);r.a},e839:function(e,t,n){"use strict";var a=n("60ed"),r=n.n(a);r.a}});
//# sourceMappingURL=app.16a04fbb.js.map