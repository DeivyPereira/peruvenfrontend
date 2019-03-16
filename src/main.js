import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router/";
import store from "./store";
import "./registerServiceWorker";
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'font-awesome/css/font-awesome.css'



import VuetifyConfirm from 'vuetify-confirm'
 
Vue.use(VuetifyConfirm, {
  buttonTrueText: 'Si',
  buttonFalseText: 'No',
  color: 'warning',
  icon: 'warning',
  title: '',
  width: 350,
  property: '$confirm'
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
