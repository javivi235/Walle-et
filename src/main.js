import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import MultiFiltersPluggin from './plugins/MultiFilters'

Vue.config.silent = true
Vue.config.productionTip = false
Vue.use(MultiFiltersPluggin)

new Vue({
  router,
  store,
  render: function(h) {return h(App)},
}).$mount('#app')
