import Vue from 'vue'
import App from './App'
import store from './store'
// uview https://www.uviewui.com/components/npmSetting.html#_5-cli%E6%A8%A1%E5%BC%8F%E9%A2%9D%E5%A4%96%E9%85%8D%E7%BD%AE
import uView from 'uview-ui'
Vue.use(uView)

// 请求
import Service from './api'
Vue.prototype.$service = Service

Vue.config.productionTip = false
App.mpType = 'app'

// 图标
// import './static/common/iconfont.css'

// tabBar组件
import Tabbar from '@/components/Tabbar'
Vue.component('Tabbar',Tabbar)
const app = new Vue({
    ...App,
    store
})
app.$mount()
