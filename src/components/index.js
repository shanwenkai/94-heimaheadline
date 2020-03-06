import layoutAside from '@/components/home/layout-aside'
import layoutHeader from '@/components/home/layout-header'
// import LayoutHeader from './home/Layout-header'
export default {
  install: function (Vue) {
    // 注册组件

    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
  }
}
