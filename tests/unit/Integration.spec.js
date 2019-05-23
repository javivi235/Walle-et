import { createLocalVue } from '@vue/test-utils'
// import TestUtil from '../../src/Utils/TestUtil.js'
// import CuentaManager from '@/components/CuentaManager.vue'
// import Home from '@/views/Home.vue'

import Vuex from 'vuex'
import Vuetify from 'vuetify/lib'
// import { AssertionError } from 'assert'
import VueRouter from 'vue-router'

describe('integration', () => {
  // const store = TestUtil.getDefaultStore()
  // const assert = require('chai').assert
  const localVue = createLocalVue()
  localVue.use(Vuex)
  localVue.use(VueRouter)
  localVue.use(Vuetify)
  const router = new VueRouter()
  router.push({ path: '/cuentas/Global' })

//   it('integration', () => {
//     const wrapper = mount(Home, {
//       store,
//       localVue,
//       router
//     })
//     console.log('AAAA: ' + wrapper.vm.cuenta)
//     //assert.equal(wrapper.vm.$parent, 3)
//   })
})
