import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引用自定義的路由

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router, //使用路由配置，完整寫法為router: router
}).$mount('#app')
