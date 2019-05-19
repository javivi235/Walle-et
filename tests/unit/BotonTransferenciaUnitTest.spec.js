import { shallowMount } from '@vue/test-utils'
import TestUtil from '@/Utils/TestUtil.js'
import BotonTransferencia from '@/components/BotonTransferencia'

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

describe('Transferencia, funcional', () => {
  let wrapper
  let store
  const assert = require('chai').assert

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    store.state.cuentas.push({ icon: 'account_balance', nombre: 'ahorros', fondos: 100, route: '/' })
    store.state.cuentas.push({ icon: 'account_balance', nombre: 'comida', fondos: 0, route: '/' })
    wrapper = shallowMount(BotonTransferencia,
      {
        store, propsData: { cuenta: { icon: 'account_balance', nombre: 'ahorros', fondos: 100, route: '/' } }
      })
  })

  it('Agregar Transferencia', () => {
    const datosTransferencia = {
      cuentaDestino: 'comida',
      fecha: '2019-05-06',
      monto: 50,
      categoria: 'Transferencia',
      cuentaOrigen: 'ahorros',
      saldoOrigenInicial: 100,
      saldoDestinoInicial: 0
    }

    wrapper.vm.monto = datosTransferencia.monto
    wrapper.vm.fecha = datosTransferencia.fecha
    wrapper.vm.cuentaDestino = datosTransferencia.cuentaDestino

    wrapper.vm.transferir()

    assert.exists(store.state.ingresos.find(function (ingreso) {
      return (ingreso.cuenta === datosTransferencia.cuentaDestino) &&
      (ingreso.fecha === datosTransferencia.fecha) &&
      (ingreso.categoria === datosTransferencia.categoria) &&
      (ingreso.monto === datosTransferencia.monto)
    }), 'No se encontro el ingreso en la cuenta destino' + store.state.egresos.length)
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransferencia.cuentaDestino).fondos,
      (datosTransferencia.saldoDestinoInicial + datosTransferencia.monto),
      'No se actualiza el saldo de la cuenta Destino')

    assert.exists(store.state.egresos.find(function (egreso) {
      return (egreso.cuenta === datosTransferencia.cuentaOrigen) &&
      (egreso.fecha === datosTransferencia.fecha) &&
      (egreso.categoria === datosTransferencia.categoria) &&
      (egreso.monto === datosTransferencia.monto)
    }), 'No se encontro el egreso en la cuenta origen')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransferencia.cuentaOrigen).fondos,
      (datosTransferencia.saldoOrigenInicial - datosTransferencia.monto),
      'No se actualiza el saldo de la cuenta origen')
  })
})
describe('Transferencias invalidas', () => {
  let wrapper
  let store
  const assert = require('chai').assert

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    store.state.cuentas.push({ icon: 'account_balance', nombre: 'ahorros', fondos: 100, route: '/' })
    store.state.cuentas.push({ icon: 'account_balance', nombre: 'comida', fondos: 0, route: '/' })
    wrapper = shallowMount(BotonTransferencia,
      {
        store, propsData: { cuenta: { icon: 'account_balance', nombre: 'ahorros', fondos: 100, route: '/' } }
      })
  })

  it('Fecha vacia', () => {
    const datosTransferencia = {
      cuentaDestino: 'comida',
      fecha: '',
      monto: 50,
      categoria: 'Transferencia',
      cuentaOrigen: 'ahorros',
      saldoOrigenInicial: 100,
      saldoDestinoInicial: 0
    }

    wrapper.vm.monto = datosTransferencia.monto
    wrapper.vm.fecha = datosTransferencia.fecha
    wrapper.vm.cuentaDestino = datosTransferencia.cuentaDestino

    wrapper.vm.transferir()

    assert.notExists(store.state.ingresos.find(function (ingreso) {
      return (ingreso.cuenta === datosTransferencia.cuentaDestino) &&
      (ingreso.fecha === datosTransferencia.fecha) &&
      (ingreso.categoria === datosTransferencia.categoria) &&
      (ingreso.monto === datosTransferencia.monto)
    }), 'Se encontro el ingreso en la cuenta destino')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransferencia.cuentaDestino).fondos,
      (datosTransferencia.saldoDestinoInicial),
      'Se actualiza el saldo de la cuenta Destino')

    assert.notExists(store.state.egresos.find(function (egreso) {
      return (egreso.cuenta === datosTransferencia.cuentaOrigen) &&
      (egreso.fecha === datosTransferencia.fecha) &&
      (egreso.categoria === datosTransferencia.categoria) &&
      (egreso.monto === datosTransferencia.monto)
    }), 'Se encontro el egreso en la cuenta origen')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransferencia.cuentaOrigen).fondos,
      (datosTransferencia.saldoOrigenInicial),
      'Se actualiza el saldo de la cuenta origen')
  })
  it('Cuenta destino vacia', () => {
    const datosTransferencia = {
      cuentaDestino: '',
      fecha: '2019-05-06',
      monto: 50,
      categoria: 'Transferencia',
      cuentaOrigen: 'ahorros',
      saldoOrigenInicial: 100,
      saldoDestinoInicial: 0
    }

    wrapper.vm.monto = datosTransferencia.monto
    wrapper.vm.fecha = datosTransferencia.fecha
    wrapper.vm.cuentaDestino = datosTransferencia.cuentaDestino

    wrapper.vm.transferir()

    assert.notExists(store.state.ingresos.find(function (ingreso) {
      return (ingreso.cuenta === datosTransferencia.cuentaDestino) &&
      (ingreso.fecha === datosTransferencia.fecha) &&
      (ingreso.categoria === datosTransferencia.categoria) &&
      (ingreso.monto === datosTransferencia.monto)
    }), 'Se encontro el ingreso en la cuenta destino')

    assert.notExists(store.state.egresos.find(function (egreso) {
      return (egreso.cuenta === datosTransferencia.cuentaOrigen) &&
      (egreso.fecha === datosTransferencia.fecha) &&
      (egreso.categoria === datosTransferencia.categoria) &&
      (egreso.monto === datosTransferencia.monto)
    }), 'Se encontro el egreso en la cuenta origen')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransferencia.cuentaOrigen).fondos,
      (datosTransferencia.saldoOrigenInicial),
      'Se actualiza el saldo de la cuenta origen')
  })
  it('monto nulo', () => {
    const datosTransferencia = {
      cuentaDestino: 'comida',
      fecha: '2019-05-06',
      monto: 0,
      categoria: 'Transferencia',
      cuentaOrigen: 'ahorros',
      saldoOrigenInicial: 100,
      saldoDestinoInicial: 0
    }

    wrapper.vm.monto = datosTransferencia.monto
    wrapper.vm.fecha = datosTransferencia.fecha
    wrapper.vm.cuentaDestino = datosTransferencia.cuentaDestino

    wrapper.vm.transferir()

    assert.notExists(store.state.ingresos.find(function (ingreso) {
      return (ingreso.cuenta === datosTransferencia.cuentaDestino) &&
      (ingreso.fecha === datosTransferencia.fecha) &&
      (ingreso.categoria === datosTransferencia.categoria) &&
      (ingreso.monto === datosTransferencia.monto)
    }), 'Se encontro el ingreso en la cuenta destino')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransferencia.cuentaDestino).fondos,
      (datosTransferencia.saldoDestinoInicial),
      'Se actualiza el saldo de la cuenta Destino')

    assert.notExists(store.state.egresos.find(function (egreso) {
      return (egreso.cuenta === datosTransferencia.cuentaOrigen) &&
      (egreso.fecha === datosTransferencia.fecha) &&
      (egreso.categoria === datosTransferencia.categoria) &&
      (egreso.monto === datosTransferencia.monto)
    }), 'Se encontro el egreso en la cuenta origen')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransferencia.cuentaOrigen).fondos,
      (datosTransferencia.saldoOrigenInicial),
      'Se actualiza el saldo de la cuenta origen')
  })
  it('monto negativo', () => {
    const datosTransferencia = {
      cuentaDestino: 'comida',
      fecha: '2019-05-06',
      monto: -30,
      categoria: 'Transferencia',
      cuentaOrigen: 'ahorros',
      saldoOrigenInicial: 100,
      saldoDestinoInicial: 0
    }

    wrapper.vm.monto = datosTransferencia.monto
    wrapper.vm.fecha = datosTransferencia.fecha
    wrapper.vm.cuentaDestino = datosTransferencia.cuentaDestino

    wrapper.vm.transferir()

    assert.notExists(store.state.ingresos.find(function (ingreso) {
      return (ingreso.cuenta === datosTransferencia.cuentaDestino) &&
      (ingreso.fecha === datosTransferencia.fecha) &&
      (ingreso.categoria === datosTransferencia.categoria) &&
      (ingreso.monto === datosTransferencia.monto)
    }), 'Se encontro el ingreso en la cuenta destino')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransferencia.cuentaDestino).fondos,
      (datosTransferencia.saldoDestinoInicial),
      'Se actualiza el saldo de la cuenta Destino')

    assert.notExists(store.state.egresos.find(function (egreso) {
      return (egreso.cuenta === datosTransferencia.cuentaOrigen) &&
      (egreso.fecha === datosTransferencia.fecha) &&
      (egreso.categoria === datosTransferencia.categoria) &&
      (egreso.monto === datosTransferencia.monto)
    }), 'Se encontro el egreso en la cuenta origen')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransferencia.cuentaOrigen).fondos,
      (datosTransferencia.saldoOrigenInicial),
      'Se actualiza el saldo de la cuenta origen')
  })
  it('saldo insuficiente', () => {
    const datosTransferencia = {
      cuentaDestino: 'comida',
      fecha: '2019-05-06',
      monto: 200,
      categoria: 'Transferencia',
      cuentaOrigen: 'ahorros',
      saldoOrigenInicial: 100,
      saldoDestinoInicial: 0
    }

    wrapper.vm.monto = datosTransferencia.monto
    wrapper.vm.fecha = datosTransferencia.fecha
    wrapper.vm.cuentaDestino = datosTransferencia.cuentaDestino

    wrapper.vm.transferir()

    assert.notExists(store.state.ingresos.find(function (ingreso) {
      return (ingreso.cuenta === datosTransferencia.cuentaDestino) &&
      (ingreso.fecha === datosTransferencia.fecha) &&
      (ingreso.categoria === datosTransferencia.categoria) &&
      (ingreso.monto === datosTransferencia.monto)
    }), 'Se encontro el ingreso en la cuenta destino')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransferencia.cuentaDestino).fondos,
      (datosTransferencia.saldoDestinoInicial),
      'Se actualiza el saldo de la cuenta Destino')

    assert.notExists(store.state.egresos.find(function (egreso) {
      return (egreso.cuenta === datosTransferencia.cuentaOrigen) &&
      (egreso.fecha === datosTransferencia.fecha) &&
      (egreso.categoria === datosTransferencia.categoria) &&
      (egreso.monto === datosTransferencia.monto)
    }), 'Se encontro el egreso en la cuenta origen')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransferencia.cuentaOrigen).fondos,
      (datosTransferencia.saldoOrigenInicial),
      'Se actualiza el saldo de la cuenta origen')
  })
  it('Destino inexistente', () => {
    const datosTransferencia = {
      cuentaDestino: 'banco',
      fecha: '2019-05-06',
      monto: 50,
      categoria: 'Transferencia',
      cuentaOrigen: 'ahorros',
      saldoOrigenInicial: 100,
      saldoDestinoInicial: 0
    }

    wrapper.vm.monto = datosTransferencia.monto
    wrapper.vm.fecha = datosTransferencia.fecha
    wrapper.vm.cuentaDestino = datosTransferencia.cuentaDestino

    wrapper.vm.transferir()

    assert.notExists(store.state.ingresos.find(function (ingreso) {
      return (ingreso.cuenta === datosTransferencia.cuentaDestino) &&
      (ingreso.fecha === datosTransferencia.fecha) &&
      (ingreso.categoria === datosTransferencia.categoria) &&
      (ingreso.monto === datosTransferencia.monto)
    }), 'Se encontro el ingreso en la cuenta destino')

    assert.notExists(store.state.egresos.find(function (egreso) {
      return (egreso.cuenta === datosTransferencia.cuentaOrigen) &&
      (egreso.fecha === datosTransferencia.fecha) &&
      (egreso.categoria === datosTransferencia.categoria) &&
      (egreso.monto === datosTransferencia.monto)
    }), 'Se encontro el egreso en la cuenta origen')
    assert.equal(store.state.cuentas.find(cuenta => cuenta.nombre === datosTransferencia.cuentaOrigen).fondos,
      (datosTransferencia.saldoOrigenInicial),
      'Se actualiza el saldo de la cuenta origen')
  })
})
describe('render tranferencia', () => {
  let wrapper
  let store
  const assert = require('chai').assert

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    store.state.cuentas.push({ icon: 'account_balance', nombre: 'ahorros', fondos: 100, route: '/' })
    store.state.cuentas.push({ icon: 'account_balance', nombre: 'comida', fondos: 0, route: '/' })
    wrapper = shallowMount(BotonTransferencia,
      {
        store, propsData: { cuenta: { icon: 'account_balance', nombre: 'ahorros', fondos: 100, route: '/' } }
      })
  })

  it('Elementos del formulario renderizan', () => {
    assert.exists(wrapper.find('#selectorCuentaTransferencua'))
    assert.exists(wrapper.find('#montoTransferencia'))
    assert.exists(wrapper.find('#menuCalendarioTransferencia'))
    assert.exists(wrapper.find('#fechaCalendarioTransferencia'))
    assert.exists(wrapper.find('#okCalendarioTransferencia'))
    assert.exists(wrapper.find('#agregarTransferencia'))
  })
})
