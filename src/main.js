import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission'// 引入权限模块
import Components from '@/components'
import ElementUI from 'element-ui'// 引入ElementUI
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'
import axios from 'axios'// 引入axios
Vue.config.productionTip = false
Vue.use(Components)
Vue.use(ElementUI)
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios // 将axios赋值给Vue原型对象
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
