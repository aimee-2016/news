import Vue from 'vue'
// import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/index.scss'
import 'vant/lib/icon/local.css'
import './assets/js/rem.js'
import axios from '@/libs/axios.js'
import { Toast,Lazyload } from 'vant';
Vue.use(Toast);
Vue.use(Lazyload);
Vue.prototype.$ajax = axios
import { format } from 'timeago.js';
Vue.filter('changeTime', function(dateStr) {
  return format(dateStr, 'zh_CN');
})

Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://47.56.186.16:8089's
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
