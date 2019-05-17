import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ReportesVista from './views/ReportesVista.vue'
import CrearVista from './views/CrearVista.vue'
import store from '@/store.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: { cuenta: store.state.cuentas[0] }
    },
    {
      path: '/reporte',
      name: 'reporte',
      component: ReportesVista,
    },
    {
      path: '/crear',
      name: 'crear',
      component: CrearVista,
    }
  ],
})
