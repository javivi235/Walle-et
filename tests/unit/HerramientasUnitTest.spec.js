import { shallowMount } from '@vue/test-utils'
import TestUtil from '../../src/Utils/TestUtil.js'
import Herramientas from '@/components/Herramientas.vue'
import VueRouter from 'vue-router'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueRouter)

describe('render barra de herramientas', () => {
  let wrapper
  let store
  const assert = require('chai').assert
  let router

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    store.state.cuentas.push(store.state.cuentas.push({
      icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/'
    }))
    router = new VueRouter()
    wrapper = shallowMount(Herramientas,
      {
        store,
        router,
        propsData: {
          cuenta: {
            icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/'
          }
        }
      })
  })

  it('render elementos inicales', () => {
    assert.equal(wrapper.find('#herramientaCategorias').exists(), true)
    assert.equal(wrapper.find('#botonReporte').exists(), true)
    assert.equal(wrapper.find('#alertaInferior').exists(), true)
    assert.equal(wrapper.find('#herramientaIngreso').exists(), true)
    assert.equal(wrapper.find('#herramientaEgreso').exists(), true)
    assert.equal(wrapper.find('#herramientaTransferencia').exists(), true)
  })
  it('render caso cuenta global', () => {
    wrapper.vm.cuenta = {
      icon: 'account_balance', nombre: 'Global', fondos: 0, route: '/'
    }

    assert.equal(wrapper.find('#herramientaCategorias').exists(), true)
    assert.equal(wrapper.find('#botonReporte').exists(), true)
    assert.equal(wrapper.find('#alertaInferior').exists(), true)

    assert.equal(wrapper.find('#herramientaIngreso').exists(), false)
    assert.equal(wrapper.find('#herramientaEgreso').exists(), false)
    assert.equal(wrapper.find('#herramientaTransferencia').exists(), false)
  })
})
