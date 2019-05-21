import { shallowMount } from '@vue/test-utils'
import TestUtil from '../../src/Utils/TestUtil.js'
import BotonCategorias from '@/components/BotonCategorias.vue'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

suite('categorias, test funcional', function () {
  let wrapper
  let store
  const assert = require('chai').assert

  setup(function () {
    store = TestUtil.getDefaultStore()
    wrapper = shallowMount(BotonCategorias,
      {
        store,
        propsData: {
          categoriaIngresos: store.state.categoriaIngresos,
          categoriaEgresos: store.state.categoriaEgresos
        }
      })
  })

  test('Crear categoria Ingreso, funcional', () => {
    const categoriaNueva = ['Ventas']

    wrapper.vm.tipo = 'Ingreso'
    wrapper.vm.nombre = categoriaNueva
    wrapper.vm.agregar()

    assert.exists(store.state.categoriaIngresos.find(categoria => categoria === categoriaNueva),
      'No se encontro la nueva cateogira')
  })
  test('Crear categoria Egreso, funcional', () => {
    const categoriaNueva = ['Compras']

    wrapper.vm.tipo = 'Egreso'
    wrapper.vm.nombre = categoriaNueva
    wrapper.vm.agregar()

    assert.exists(store.state.categoriaEgresos.find(categoria => categoria === categoriaNueva),
      'No se encontro la nueva cateogira')
  })
})
describe('categorias render test', () => {
  let wrapper
  let store
  const assert = require('chai').assert

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    wrapper = shallowMount(BotonCategorias,
      {
        store,
        propsData: {
          categoriaIngresos: store.state.categoriaIngresos,
          categoriaEgresos: store.state.categoriaEgresos
        }
      })
  })
  it('elementos formulario renderizan', () => {
    assert.equal(wrapper.find('#selectorCategoria').exists(), true)
    assert.equal(wrapper.find('#nombreCategoria').exists(), true)
    assert.equal(wrapper.find('#agregarCategoria').exists(), true)
  })
})
suite('Datos iniciales categorias', () => {
  let store
  const assert = require('chai').assert

  setup(function () {
    store = TestUtil.getDefaultStore()
  })

  test('Deberia tener 3 categorias de ingreso iniciales', () => {
    assert.equal(3, store.state.categoriaIngresos.length,
      'numero de categorias de ingresos: ' + store.state.categoriaIngresos.length)
    assert.exists(store.state.categoriaIngresos.find(categoria => categoria === 'Salario'),
      'No esiste la categoria Salarios')
    assert.exists(store.state.categoriaIngresos.find(categoria => categoria === 'Transferencia'),
      'No esiste la categoria Transferencia')
    assert.exists(store.state.categoriaIngresos.find(categoria => categoria === 'Otros'),
      'No esiste la categoria Otros')
  })
  test('Deberia tener 3 categorias de egreso iniciales', () => {
    assert.equal(3, store.state.categoriaEgresos.length,
      'numero de categorias de egresos: ' + store.state.categoriaEgresos.length)
    assert.exists(store.state.categoriaEgresos.find(categoria => categoria === 'Expensas'),
      'No esiste la categoria Expensas')
    assert.exists(store.state.categoriaEgresos.find(categoria => categoria === 'Transferencia'),
      'No esiste la categoria Transferencia')
    assert.exists(store.state.categoriaEgresos.find(categoria => categoria === 'Otros'),
      'No esiste la categoria Otros')
  })
})
describe('Categorias invalidas', () => {
  let wrapper
  let store
  const assert = require('chai').assert

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    wrapper = shallowMount(BotonCategorias,
      {
        store,
        propsData: {
          categoriaIngresos: store.state.categoriaIngresos,
          categoriaEgresos: store.state.categoriaEgresos
        }
      })
  })

  it('no se puede crear categorias de ingreso con nombre vacio', () => {
    wrapper.vm.tipo = 'Ingreso'
    wrapper.vm.nombre = ''

    wrapper.vm.agregar()

    assert.notExists(store.state.categoriaIngresos.find(categoria => categoria === ''))
  })
  it('no se puede crear categorias de egreso con nombre vacio', () => {
    wrapper.vm.tipo = 'Egreso'
    wrapper.vm.nombre = ''

    wrapper.vm.agregar()

    assert.notExists(store.state.categoriaEgresos.find(categoria => categoria === ''))
  })

  it('No se pueden agregar categorias de ingreso ya existentes', () => {
    const categoriaExistente = 'Salario'
    const cantidadInicial = store.state.categoriaEgresos.length

    wrapper.vm.tipo = 'Ingreso'
    wrapper.vm.nombre = categoriaExistente

    wrapper.vm.agregar()

    assert.equal(store.state.categoriaIngresos.length, cantidadInicial)
  })
  it('No se pueden agregar categorias de egreso ya existentes', () => {
    const categoriaExistente = 'Expensas'
    const cantidadInicial = store.state.categoriaEgresos.length

    wrapper.vm.tipo = 'Egreso'
    wrapper.vm.nombre = categoriaExistente

    wrapper.vm.agregar()

    assert.equal(store.state.categoriaEgresos.length, cantidadInicial)
  })

  it('no se puede crear categorias sin tipo', () => {
    const nombreCategoria = 'Supermercado'

    wrapper.vm.tipo = ''
    wrapper.vm.nombre = nombreCategoria

    wrapper.vm.agregar()

    assert.notExists(store.state.categoriaIngresos.find(categoria => categoria === nombreCategoria))
    assert.notExists(store.state.categoriaEgresos.find(categoria => categoria === nombreCategoria))
  })
})
