import { shallowMount } from '@vue/test-utils'
import TestUtil from '@/Utils/TestUtil.js'
import BotonTransacciones from '@/components/BotonTransacciones'

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

describe('Ingresos, funcional', () => {
  let wrapper
  let store
  const assert = require('chai').assert

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    store.state.cuentas.push({ icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/' })
    wrapper = shallowMount(BotonTransacciones,
      {
        store,
        propsData: {
          tipo: 'Ingreso',
          cuenta: { icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/' },
          categorias: store.state.categoriaIngresos }
      })
  })

  it('Agregar Ingreso', () => {
    const datosTransaccion = { cuenta: 'ahorros', fecha: '06/05/2019', monto: 120, categoria: 'Salario' }
    const saldoInicial = 0

    wrapper.vm.monto = datosTransaccion.monto
    wrapper.vm.fecha = datosTransaccion.fecha
    wrapper.vm.categoria = datosTransaccion.categoria

    wrapper.vm.agregar()

    assert.exists(store.state.ingresos.find(function (ingreso) {
      return (ingreso.cuenta === datosTransaccion.cuenta) &&
      (ingreso.fecha === datosTransaccion.fecha) &&
      (ingreso.categoria === datosTransaccion.categoria) &&
      (ingreso.monto === datosTransaccion.monto)
    }), 'No se encontro el ingreso')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransaccion.cuenta).fondos,
      (saldoInicial + datosTransaccion.monto), 'No se actualiza el saldo de la cuenta')
  })
})
describe('Egresos, funcional', () => {
  let wrapper
  let store
  const assert = require('chai').assert

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    store.state.cuentas.push({ icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/' })
    wrapper = shallowMount(BotonTransacciones,
      {
        store,
        propsData: {
          tipo: 'Egreso',
          cuenta: { icon: 'account_balance', nombre: 'ahorros', fondos: 200, route: '/' },
          categorias: store.state.categoriaEgresos }
      })
  })

  it('Agregar Egreso', () => {
    const datosTransaccion = { cuenta: 'ahorros', fecha: '06/05/2019', monto: 100, categoria: 'Expensas' }
    const saldoInicial = 200

    wrapper.vm.monto = datosTransaccion.monto
    wrapper.vm.fecha = datosTransaccion.fecha
    wrapper.vm.categoria = datosTransaccion.categoria

    wrapper.vm.agregar()

    assert.exists(store.state.egresos.find(function (egreso) {
      return (egreso.cuenta === datosTransaccion.cuenta) &&
      (egreso.fecha === datosTransaccion.fecha) &&
      (egreso.categoria === datosTransaccion.categoria) &&
      (egreso.monto === datosTransaccion.monto)
    }), 'No se encontro el egreso')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransaccion.cuenta).fondos,
      (saldoInicial - datosTransaccion.monto), 'No se actualiza el saldo de la cuenta')
  })
})
describe('Ingresos invalidos', () => {
  let wrapper
  let store
  const assert = require('chai').assert

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    store.state.cuentas.push({ icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/' })
    wrapper = shallowMount(BotonTransacciones,
      {
        store,
        propsData: {
          tipo: 'Ingreso',
          cuenta: { icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/' },
          categorias: store.state.categoriaIngresos }
      })
  })

  it('categoria vacia', () => {
    const datosTransaccion = { cuenta: 'ahorros', fecha: '06/05/2019', monto: 100, categoria: '' }
    const saldoInicial = 0

    wrapper.vm.monto = datosTransaccion.monto
    wrapper.vm.fecha = datosTransaccion.fecha
    wrapper.vm.categoria = datosTransaccion.categoria

    wrapper.vm.agregar()

    assert.notExists(store.state.ingresos.find(function (ingreso) {
      return (ingreso.cuenta === datosTransaccion.cuenta) &&
      (ingreso.fecha === datosTransaccion.fecha) &&
      (ingreso.categoria === datosTransaccion.categoria) &&
      (ingreso.monto === datosTransaccion.monto)
    }), 'Se agrego el ingreso')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransaccion.cuenta).fondos,
      saldoInicial, 'Se cambia el saldo de la cuenta')
  })
  it('fecha vacia', () => {
    const datosTransaccion = { cuenta: 'ahorros', fecha: '', monto: 100, categoria: 'Salario' }
    const saldoInicial = 0

    wrapper.vm.monto = datosTransaccion.monto
    wrapper.vm.fecha = datosTransaccion.fecha
    wrapper.vm.categoria = datosTransaccion.categoria

    wrapper.vm.agregar()

    assert.notExists(store.state.ingresos.find(function (ingreso) {
      return (ingreso.cuenta === datosTransaccion.cuenta) &&
      (ingreso.fecha === datosTransaccion.fecha) &&
      (ingreso.categoria === datosTransaccion.categoria) &&
      (ingreso.monto === datosTransaccion.monto)
    }), 'Se agrego el ingreso')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransaccion.cuenta).fondos,
      saldoInicial, 'Se cambia el saldo de la cuenta')
  })
  it('monto nulo', () => {
    const datosTransaccion = { cuenta: 'ahorros', fecha: '06/05/2019', monto: 0, categoria: 'Salario' }
    const saldoInicial = 0

    wrapper.vm.monto = datosTransaccion.monto
    wrapper.vm.fecha = datosTransaccion.fecha
    wrapper.vm.categoria = datosTransaccion.categoria

    wrapper.vm.agregar()

    assert.notExists(store.state.ingresos.find(function (ingreso) {
      return (ingreso.cuenta === datosTransaccion.cuenta) &&
      (ingreso.fecha === datosTransaccion.fecha) &&
      (ingreso.categoria === datosTransaccion.categoria) &&
      (ingreso.monto === datosTransaccion.monto)
    }), 'Se agrego el ingreso')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransaccion.cuenta).fondos,
      saldoInicial, 'Se cambia el saldo de la cuenta')
  })
  it('monto negativo', () => {
    const datosTransaccion = { cuenta: 'ahorros', fecha: '06/05/2019', monto: -50, categoria: 'Salario' }
    const saldoInicial = 0

    wrapper.vm.monto = datosTransaccion.monto
    wrapper.vm.fecha = datosTransaccion.fecha
    wrapper.vm.categoria = datosTransaccion.categoria

    wrapper.vm.agregar()

    assert.notExists(store.state.ingresos.find(function (ingreso) {
      return (ingreso.cuenta === datosTransaccion.cuenta) &&
      (ingreso.fecha === datosTransaccion.fecha) &&
      (ingreso.categoria === datosTransaccion.categoria) &&
      (ingreso.monto === datosTransaccion.monto)
    }), 'Se agrego el ingreso')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransaccion.cuenta).fondos,
      saldoInicial, 'Se cambia el saldo de la cuenta')
  })
  it('categoria inexistente', () => {
    const datosTransaccion = { cuenta: 'ahorros', fecha: '06/05/2019', monto: 50, categoria: 'Tienda' }
    const saldoInicial = 0

    wrapper.vm.monto = datosTransaccion.monto
    wrapper.vm.fecha = datosTransaccion.fecha
    wrapper.vm.categoria = datosTransaccion.categoria

    wrapper.vm.agregar()

    assert.notExists(store.state.ingresos.find(function (ingreso) {
      return (ingreso.cuenta === datosTransaccion.cuenta) &&
      (ingreso.fecha === datosTransaccion.fecha) &&
      (ingreso.categoria === datosTransaccion.categoria) &&
      (ingreso.monto === datosTransaccion.monto)
    }), 'Se agrego el ingreso')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransaccion.cuenta).fondos,
      saldoInicial, 'Se cambia el saldo de la cuenta')
  })
})
describe('Egresos invalidos', () => {
  let wrapper
  let store
  const assert = require('chai').assert

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    store.state.cuentas.push({ icon: 'account_balance', nombre: 'ahorros', fondos: 100, route: '/' })
    wrapper = shallowMount(BotonTransacciones,
      {
        store,
        propsData: {
          tipo: 'Egreso',
          cuenta: { icon: 'account_balance', nombre: 'ahorros', fondos: 100, route: '/' },
          categorias: store.state.categoriaEgresos }
      })
  })

  it('categoria vacia', () => {
    const datosTransaccion = { cuenta: 'ahorros', fecha: '06/05/2019', monto: 50, categoria: '' }
    const saldoInicial = 100

    wrapper.vm.monto = datosTransaccion.monto
    wrapper.vm.fecha = datosTransaccion.fecha
    wrapper.vm.categoria = datosTransaccion.categoria

    wrapper.vm.agregar()

    assert.notExists(store.state.egresos.find(function (egreso) {
      return (egreso.cuenta === datosTransaccion.cuenta) &&
      (egreso.fecha === datosTransaccion.fecha) &&
      (egreso.categoria === datosTransaccion.categoria) &&
      (egreso.monto === datosTransaccion.monto)
    }), 'Se agrego el egreso')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransaccion.cuenta).fondos,
      saldoInicial, 'Se cambia el saldo de la cuenta')
  })
  it('fecha vacia', () => {
    const datosTransaccion = { cuenta: 'ahorros', fecha: '', monto: 50, categoria: 'Expensas' }
    const saldoInicial = 100

    wrapper.vm.monto = datosTransaccion.monto
    wrapper.vm.fecha = datosTransaccion.fecha
    wrapper.vm.categoria = datosTransaccion.categoria

    wrapper.vm.agregar()

    assert.notExists(store.state.egresos.find(function (egreso) {
      return (egreso.cuenta === datosTransaccion.cuenta) &&
      (egreso.fecha === datosTransaccion.fecha) &&
      (egreso.categoria === datosTransaccion.categoria) &&
      (egreso.monto === datosTransaccion.monto)
    }), 'Se agrego el egreso')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransaccion.cuenta).fondos,
      saldoInicial, 'Se cambia el saldo de la cuenta')
  })
  it('monto nulo', () => {
    const datosTransaccion = { cuenta: 'ahorros', fecha: '06/05/2019', monto: 0, categoria: 'Expensas' }
    const saldoInicial = 100

    wrapper.vm.monto = datosTransaccion.monto
    wrapper.vm.fecha = datosTransaccion.fecha
    wrapper.vm.categoria = datosTransaccion.categoria

    wrapper.vm.agregar()

    assert.notExists(store.state.egresos.find(function (egreso) {
      return (egreso.cuenta === datosTransaccion.cuenta) &&
      (egreso.fecha === datosTransaccion.fecha) &&
      (egreso.categoria === datosTransaccion.categoria) &&
      (egreso.monto === datosTransaccion.monto)
    }), 'Se agrego el egreso')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransaccion.cuenta).fondos,
      saldoInicial, 'Se cambia el saldo de la cuenta')
  })
  it('monto negativo', () => {
    const datosTransaccion = { cuenta: 'ahorros', fecha: '06/05/2019', monto: -50, categoria: 'Expensas' }
    const saldoInicial = 100

    wrapper.vm.monto = datosTransaccion.monto
    wrapper.vm.fecha = datosTransaccion.fecha
    wrapper.vm.categoria = datosTransaccion.categoria

    wrapper.vm.agregar()

    assert.notExists(store.state.egresos.find(function (egreso) {
      return (egreso.cuenta === datosTransaccion.cuenta) &&
      (egreso.fecha === datosTransaccion.fecha) &&
      (egreso.categoria === datosTransaccion.categoria) &&
      (egreso.monto === datosTransaccion.monto)
    }), 'Se agrego el egreso')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransaccion.cuenta).fondos,
      saldoInicial, 'Se cambia el saldo de la cuenta')
  })
  it('monto mayor al saldo', () => {
    const datosTransaccion = { cuenta: 'ahorros', fecha: '06/05/2019', monto: 200, categoria: 'Expensas' }
    const saldoInicial = 100

    wrapper.vm.monto = datosTransaccion.monto
    wrapper.vm.fecha = datosTransaccion.fecha
    wrapper.vm.categoria = datosTransaccion.categoria

    wrapper.vm.agregar()

    assert.notExists(store.state.egresos.find(function (egreso) {
      return (egreso.cuenta === datosTransaccion.cuenta) &&
      (egreso.fecha === datosTransaccion.fecha) &&
      (egreso.categoria === datosTransaccion.categoria) &&
      (egreso.monto === datosTransaccion.monto)
    }), 'Se agrego el egreso')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransaccion.cuenta).fondos,
      saldoInicial, 'Se cambia el saldo de la cuenta')
  })
  it('categoria inexistente', () => {
    const datosTransaccion = { cuenta: 'ahorros', fecha: '06/05/2019', monto: 50, categoria: 'Tienda' }
    const saldoInicial = 100

    wrapper.vm.monto = datosTransaccion.monto
    wrapper.vm.fecha = datosTransaccion.fecha
    wrapper.vm.categoria = datosTransaccion.categoria

    wrapper.vm.agregar()

    assert.notExists(store.state.egresos.find(function (egreso) {
      return (egreso.cuenta === datosTransaccion.cuenta) &&
      (egreso.fecha === datosTransaccion.fecha) &&
      (egreso.categoria === datosTransaccion.categoria) &&
      (egreso.monto === datosTransaccion.monto)
    }), 'Se agrego el egreso')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransaccion.cuenta).fondos,
      saldoInicial, 'Se cambia el saldo de la cuenta')
  })
})
describe('Render test, transacciones', () => {
  let wrapper
  let store
  const assert = require('chai').assert

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    store.state.cuentas.push({ icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/' })
  })

  it('test ingreso', () => {
    wrapper = shallowMount(BotonTransacciones,
      {
        store,
        propsData: {
          tipo: 'Ingreso',
          cuenta: { icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/' },
          categorias: store.state.categoriaIngresos }
      })

    assert.exists(wrapper.find('#selectorIngreso'))
    assert.exists(wrapper.find('#montoIngreso'))
    assert.exists(wrapper.find('#menuCalendarioIngreso'))
    assert.exists(wrapper.find('#fechaCalendarioIngreso'))
    assert.exists(wrapper.find('#okCalendarioIngreso'))
    assert.exists(wrapper.find('#agregarIngreso'))
  })
  it('test egreso', () => {
    wrapper = shallowMount(BotonTransacciones,
      {
        store,
        propsData: {
          tipo: 'Egreso',
          cuenta: { icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/' },
          categorias: store.state.categoriaIngresos }
      })

    assert.exists(wrapper.find('#selectorEgreso'))
    assert.exists(wrapper.find('#montoEgreso'))
    assert.exists(wrapper.find('#menuCalendarioEgreso'))
    assert.exists(wrapper.find('#fechaCalendarioEgreso'))
    assert.exists(wrapper.find('#okCalendarioEgreso'))
    assert.exists(wrapper.find('#agregarEgreso'))
  })
})
