import { shallowMount } from '@vue/test-utils'
import TestUtil from '../../src/Utils/TestUtil.js'
import Lista from '@/components/Lista.vue'

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

describe('render lista', () => {
  let wrapper
  let store
  const assert = require('chai').assert

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    store.state.cuentas.push(store.state.cuentas.push({
      icon: 'account_balance', nombre: 'ahorros', fondos: 70, route: '/'
    }))
    store.state.ingresos.unshift({
      cuenta: 'ahorros',
      fecha: '2019-05-23',
      monto: 50,
      categoria: 'Salario'
    })
    store.state.ingresos.unshift({
      cuenta: 'ahorros',
      fecha: '2019-05-23',
      monto: 50,
      categoria: 'Salario'
    })
    store.state.egresos.unshift({
      cuenta: 'ahorros',
      fecha: '2019-05-23',
      monto: 30,
      categoria: 'Salario'
    })
    wrapper = shallowMount(Lista,
      {
        store,
        propsData: {
          items: store.state.ingresos,
          titulo: 'Ingresos',
          cuenta: { icon: 'account_balance', nombre: 'ahorros', fondos: 70, route: '/' }
        }
      })
    wrapper.setData({
      cabecerasTabla: [
        { text: 'Fecha',
          align: 'left',
          sortable: false,
          value: 'fecha' },
        { text: 'Monto', value: 'monto' },
        { text: 'Categoria', value: 'categoria' }
      ]
    })
  })

  it('Cada ingreso aparece en la lista', () => {
    store.state.ingresos.forEach((ingreso, index) => {
      assert.exists(wrapper.find('#' + wrapper.vm.cuenta.nombre + index))
    })
  })
  it('render objetos iniciales', () => {
    assert.exists(wrapper.find('.titulo'))
    assert.exists(wrapper.find('#tabla' + wrapper.vm.titulo))
  })
})
describe('modificar elementos', () => {

})
