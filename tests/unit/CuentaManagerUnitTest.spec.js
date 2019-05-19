import { shallowMount } from '@vue/test-utils'
import TestUtil from '../../src/Utils/TestUtil.js'
import CuentaManager from '@/components/CuentaManager.vue'
import VueRouter from 'vue-router'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueRouter)

describe('render barra de cuenta manager', () => {
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
    wrapper = shallowMount(CuentaManager,
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
    assert.exists(wrapper.find('#listaIngresos'))
    assert.exists(wrapper.find('#listaEgresos'))
    assert.exists(wrapper.find('InformacionCuenta'))
    assert.exists(wrapper.find('Herramientas'))
  })
})
