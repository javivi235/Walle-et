import { shallowMount } from '@vue/test-utils'
import TestUtil from '@/Utils/TestUtil.js'
import BotonTransacciones from '@/components/BotonTransacciones'

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

describe('Unit tests relacionados a agregar un nuevo ingreso', () => {
  let wrapper
  let store
  const assert = require('chai').assert
  const datosTransaccion = [
    { cuenta: 'ahorros', fecha: '06/05/2019', monto: 120, categoria: 'Salario'
    }]
  const cuenta = { nombre: 'ahorros', fondos: '100' }

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    wrapper = shallowMount(BotonTransacciones,
      {
        store, propsData: { tipo: 'Ingreso', cuenta: cuenta, categorias: store.state.categoriaIngresos }
      })
  })
  it('Agrega el nuevo ingreso al inicio del array ingresos de la store', () => {
    wrapper.vm.monto = datosTransaccion[0].monto
    wrapper.vm.fecha = datosTransaccion[0].fecha
    wrapper.vm.categoria = datosTransaccion[0].categoria

    wrapper.vm.agregar()
    assert.equal(datosTransaccion[0].cuenta, store.state.ingresos[0].cuenta, 'no se agrega la cuenta correctamente')
    assert.equal(datosTransaccion[0].fecha, store.state.ingresos[0].fecha, 'no se agrega la fecha correctamente')
    assert.equal(datosTransaccion[0].monto, store.state.ingresos[0].monto, 'no se agrega el monto correctamente')
    assert.equal(datosTransaccion[0].categoria, store.state.ingresos[0].categoria, 'no se agrega la categoria correctamente')
    assert.equal(220, store.state.cuentas.find(cuenta => cuenta.nombre === datosTransaccion[0].cuenta).fondos, 'no se actualiza el saldo en la cuenta ' + store.state.cuentas[0].fondos)
  })
  it('No se pueden agregar ingresos de montos menores o iguales a 0', () => {
    wrapper.vm.monto = -9
    wrapper.vm.fecha = datosTransaccion[0].fecha
    wrapper.vm.categoria = datosTransaccion[0].categoria
    wrapper.vm.agregar()
    assert.equal(0, store.state.ingresos.length, 'se ha agregado un ingreso negativo, , ' + store.state.ingresos.length)
    wrapper.vm.monto = 0
    wrapper.vm.fecha = datosTransaccion[0].fecha
    wrapper.vm.categoria = datosTransaccion[0].categoria
    wrapper.vm.agregar()
    assert.equal(0, store.state.ingresos.length, 'se ha agregado un ingresode monto 0, ' + store.state.ingresos.length)
  })
})
describe('Unit tests relacionados a agregar un nuevo egreso', () => {
  let wrapper
  let store
  const assert = require('chai').assert
  const datosTransaccion = [
    { cuenta: 'ahorros', fecha: '06/05/2019', monto: 10, categoria: 'Otros'
    }]
  const cuenta = { nombre: 'ahorros', fondos: '100' }

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    wrapper = shallowMount(BotonTransacciones,
      {
        store, propsData: { tipo: 'Egreso', cuenta: cuenta, categorias: store.state.categoriaEgresos }
      })
  })
  it('Agrega el nuevo egreso al inicio del array egresos de la store', () => {
    wrapper.vm.monto = datosTransaccion[0].monto
    wrapper.vm.fecha = datosTransaccion[0].fecha
    wrapper.vm.categoria = datosTransaccion[0].categoria

    wrapper.vm.agregar()
    assert.equal(datosTransaccion[0].cuenta, store.state.egresos[0].cuenta, 'no se agrega la cuenta correctamente')
    assert.equal(datosTransaccion[0].fecha, store.state.egresos[0].fecha, 'no se agrega la fecha correctamente')
    assert.equal(datosTransaccion[0].monto, store.state.egresos[0].monto, 'no se agrega el monto correctamente')
    assert.equal(datosTransaccion[0].categoria, store.state.egresos[0].categoria, 'no se agrega la categoria correctamente')
    assert.equal(90, store.state.cuentas.find(cuenta => cuenta.nombre === datosTransaccion[0].cuenta).fondos, 'no se actualiza el saldo en la cuenta ')
  })
  it('No se pueden agregar egresos de montos menores o iguales a 0', () => {
    wrapper.vm.monto = -9
    wrapper.vm.fecha = datosTransaccion[0].fecha
    wrapper.vm.categoria = datosTransaccion[0].categoria
    wrapper.vm.agregar()
    assert.equal(0, store.state.egresos.length, 'se ha agregado un egreso negativo')
    wrapper.vm.monto = 0
    wrapper.vm.fecha = datosTransaccion[0].fecha
    wrapper.vm.categoria = datosTransaccion[0].categoria
    wrapper.vm.agregar()
    assert.equal(0, store.state.egresos.length, 'se ha agregado un egreso de monto 0')
  })
  it('No se puede hacer un egreso de monto mayor a tu saldo', () => {
    wrapper.vm.monto = 150
    wrapper.vm.fecha = datosTransaccion[0].fecha
    wrapper.vm.categoria = datosTransaccion[0].categoria
    wrapper.vm.agregar()
    assert.equal(0, store.state.egresos.length, 'se ha realizado un egreso sin tener saldo suficiiente')
  })
})
