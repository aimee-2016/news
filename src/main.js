import Vue from 'vue'
// import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/icon/local.css'
import './assets/js/rem.js'
import './assets/css/index.scss'
import axios from '@/libs/axios.js'
import selfHeader from '@/components/header'
import {
  CascadePicker
} from "cube-ui";
Vue.use(CascadePicker)
// 15002304121 123456
// http://47.56.186.16:8090/
// https://www.c-cnews.com/api/front/articles/findArticlesByColumnId.json
Vue.component('selfHeader',selfHeader);
import noContent from "@/components/nocontent";
Vue.component('noContent',noContent);
import { Toast,Lazyload } from 'vant';
Vue.use(Toast);
Vue.use(Lazyload);
Vue.prototype.$ajax = axios
import { format } from 'timeago.js';
Vue.filter('changeTime', function(dateStr) {
  return format(dateStr, 'zh_CN');
})
import { formatSeconds } from '@/utils/sfmformat.js';
Vue.filter('formatSeconds', formatSeconds)
Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://47.56.186.16:8089'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
