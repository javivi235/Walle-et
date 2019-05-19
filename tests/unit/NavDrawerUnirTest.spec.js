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
    store.state.cuentas.push(store.state.cuentas.push({
      icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/'
    }))
    wrapper = shallowMount(NavDrawer,
      {
        store
      })
  })

  it('renderiza parte inicial', () => {
    assert.exists(wrapper.find('#nav'))
    assert.exists(wrapper.find('#Global'))
    assert.exists(wrapper.find('#ahorros'))
    assert.exists(wrapper.find('#crearCuentaNav'))
  })
  it('renderiza todas las cuentas', () => {
    store.state.cuentas.push(store.state.cuentas.push({
      icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/'
    }))

    store.state.cuentas.forEach(cuenta => {
      assert.exists(wrapper.find('#' + cuenta.nombre))
    })
  })
})
