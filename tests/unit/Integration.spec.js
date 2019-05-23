// import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
// import TestUtil from '../../src/Utils/TestUtil.js'
// import CuentaManager from '@/components/CuentaManager.vue'
// import InformacionCuenta from '@/components/InformacionCuenta.vue'

// import Vuex from 'vuex'
// import Vuetify from 'vuetify/lib'
// import VueRouter from 'vue-router'

// describe('integration', () => {
//   const store = TestUtil.getDefaultStore()
//   store.state.cuentas.push({
//     icon: 'account_balance', nombre: 'ahorros', fondos: 70, route: '/'
//   })
//   const assert = require('chai').assert
//   const localVue = createLocalVue()
//   localVue.use(Vuex)
//   localVue.use(VueRouter)
//   localVue.use(Vuetify)
//   const router = new VueRouter()

//   it('integration', () => {
//     const wrapper = mount(CuentaManager, {
//       store,
//       localVue,
//       router,
//       propsData: {
//         cuenta: { icon: 'account_balance', nombre: 'ahorros', fondos: 70, route: '/' }
//       },
//       children: [InformacionCuenta]
//     })
//     console.log('Parent: ' + wrapper.find('#informacionCuenta').props())
//   })
// })
