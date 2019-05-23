import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestUtil from '../../src/Utils/TestUtil.js'
import CuentaManager from '@/components/CuentaManager.vue'

import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('render cuenta manager', () => {
  let wrapper
  let store
  const assert = require('chai').assert
  let localVue
  let router

  beforeEach(function () {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)
    router = new VueRouter()
    store = TestUtil.getDefaultStore()
    store.state.cuentas.push(store.state.cuentas.push({
      icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/'
    }))
    wrapper = shallowMount(CuentaManager,
      {
        localVue,
        router,
        store,
        propsData: {
          cuenta: {
            icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/'
          }
        }
      })
  })

  it('render elementos inicales', () => {
    assert.equal(wrapper.find('#listaIngresos').exists(), true)
    assert.equal(wrapper.find('#listaEgresos').exists(), true)
    assert.equal(wrapper.find('#informacionCuenta').exists(), true)
    assert.equal(wrapper.find('#herramientas').exists(), true)
  })
})
suite('Cuenta Global', () => {
  let wrapper
  let store
  const assert = require('chai').assert
  let router
  let localVue

  setup(function () {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)
    store = TestUtil.getDefaultStore()
    store.state.cuentas.push(store.state.cuentas.push({
      icon: 'account_balance', nombre: 'Global', fondos: 0, route: '/'
    }))
    router = new VueRouter()
    wrapper = shallowMount(CuentaManager,
      {
        store,
        router,
        localVue,
        propsData: {
          cuenta: {
            icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/'
          }
        }
      })
  })

  test('Ingresos recibidos', () => {
    assert.equal(wrapper.vm.ingresos.length, store.state.ingresos.length,
      'no recibe todos los ingresos')
  })
  test('Egresos recibidos', () => {
    assert.equal(wrapper.vm.egresos.length, store.state.egresos.length,
      'no recibe todos los egresos')
  })
  test('Saldo global', () => {
    let saldoGlobal = 0

    store.state.ingresos.forEach((ingreso) => {
      saldoGlobal += Number(ingreso.monto)
    })
    store.state.egresos.forEach((egreso) => {
      saldoGlobal -= Number(egreso.monto)
    })

    assert.equal(wrapper.vm.saldo, saldoGlobal,
      'calculos de saldo global erroneos')
    assert.equal(wrapper.vm.saldo, store.state.cuentas.find(cuenta => cuenta.nombre === 'Global').fondos,
      'datos de saldo diferentes')
  })
})
