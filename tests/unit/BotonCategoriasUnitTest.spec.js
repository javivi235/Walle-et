import { shallowMount } from '@vue/test-utils'
import TestUtil from '../../src/Utils/TestUtil.js'
import BotonCategorias from '@/components/BotonCategorias.vue'

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

describe('Unit tests relacionados a agregar una categoria', () => {
  let wrapper
  let store
  const assert = require('chai').assert
  const nombresPruebaIngreso = ['Salario', 'Inversiones']
  const nombresPruebaEgreso = ['Expensas', 'Instituto']

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    wrapper = shallowMount(BotonCategorias,
      {
        store, propsData: { categoriaIngresos: store.state.categoriaIngresos, categoriaEgresos: store.state.categoriaEgresos }
      })
  })
  it('Verificar que se inicie con 3  categorias, nunmero establecido en BRD', () => {
    assert.equal(3, wrapper.vm.categoriaEgresos.length, 'Numero incorrecto de categorias de egreso inicial: ' + wrapper.vm.categoriaEgresos.length)
    assert.equal(3, wrapper.vm.categoriaIngresos.length, 'Numero incorrecto de categorias de ingreso inicial: ' + wrapper.vm.categoriaIngresos.length)
  })
  it('Las nuevas categorias de guarden en la store', () => {
    wrapper.vm.tipo = 'Ingreso'
    wrapper.vm.nombre = nombresPruebaIngreso[1]
    wrapper.vm.agregar()
    assert.equal(nombresPruebaIngreso[1], store.state.categoriaIngresos[0], 'No se agrega la categoria de ingreso')
    wrapper.vm.tipo = 'Egreso'
    wrapper.vm.nombre = nombresPruebaEgreso[1]
    wrapper.vm.agregar()
    assert.equal(nombresPruebaEgreso[1], store.state.categoriaEgresos[0], 'No se agrega la categoria de egreso')
  })
  it('No se pueden agregar categorias existentes', () => {
    wrapper.vm.tipo = 'Ingreso'
    wrapper.vm.nombre = nombresPruebaIngreso[0]
    wrapper.vm.agregar()
    assert.equal(3, store.state.categoriaIngresos.length, 'Se agrego una categoria repetida a Ingresos')
    wrapper.vm.tipo = 'Egreso'
    wrapper.vm.nombre = nombresPruebaEgreso[0]
    wrapper.vm.agregar()
    assert.equal(3, store.state.categoriaEgresos.length, 'Se agrego una categoria repetida a Egresos')
  })
})
