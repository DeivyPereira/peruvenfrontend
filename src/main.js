import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router/";
import store from "./store";
import "./registerServiceWorker";
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'font-awesome/css/font-awesome.css'
import 'register-service-worker'

// Some middleware to help us ensure the user is authenticated.

router.beforeEach((to, from, next) => {
  if (to.matched.some( record => record.meta.requiresAuth ) && typeof window.localStorage.session === 'undefined' ) {
    next({
      path: '/',
    })
  } else {
    if( to.matched.some( record => record.path === '/login' ) && typeof window.localStorage.session !== 'undefined' ){
      next({
        path: '/dashboard',
      })
    } else {
      next()
    }
  }
})


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
