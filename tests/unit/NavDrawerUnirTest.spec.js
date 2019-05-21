import { shallowMount } from '@vue/test-utils'
import TestUtil from '../../src/Utils/TestUtil.js'
import NavDrawer from '@/components/NavDrawer.vue'

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

describe('Render nav', () => {
  let wrapper
  let store
  const assert = require('chai').assert

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    wrapper = shallowMount(NavDrawer,
      {
        store
      })
  })

  it('renderiza parte inicial', () => {
    assert.equal(wrapper.find('#nav').exists(), true)
    assert.equal(wrapper.find('#Global').exists(), true)
    assert.equal(wrapper.find('#crearCuentaNav').exists(), true)
  })
  it('renderiza todas las cuentas', () => {
    store.state.cuentas.push({
      icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/'
    })
    store.state.cuentas.forEach(cuenta => {
      console.log(store.state.cuentas.length)
      assert.equal(wrapper.find('#' + cuenta.nombre).exists(), true, cuenta.nombre + ' no renderiza')
    })
  })
})
