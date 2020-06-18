import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/index.scss'
import './assets/js/rem.js'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://47.56.186.16:8089'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
