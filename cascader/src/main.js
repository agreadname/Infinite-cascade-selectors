import Vue from 'vue'
import App from './App.vue'
// 总线
var eventBus = new Vue();
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  data:{eventBus}
}).$mount('#app')
