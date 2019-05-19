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
    assert.exists(wrapper.find('#herramientaIngreso'))
    assert.exists(wrapper.find('#herramientaEgreso'))
    assert.exists(wrapper.find('BotonTransferencia'))
    assert.exists(wrapper.find('BotonCategorias'))
    assert.exists(wrapper.find('#botonReporte'))
    assert.exists(wrapper.find('#alertaInferior'))
  })
  it('render caso cuenta global', () => {

  })
})
