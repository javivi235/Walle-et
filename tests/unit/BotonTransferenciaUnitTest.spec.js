import { shallowMount } from '@vue/test-utils'
import TestUtil from '@/Utils/TestUtil.js'
import BotonTransferencia from '@/components/BotonTransferencia'

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

describe('Unit tests relacionados a hacer una transferencia', () => {
  let wrapper
  let store
  const assert = require('chai').assert
  const datosTransferencia = [
    { cuenta: 'comida', fecha: '2019-05-06', monto: 20, categoria: 'Transferencia'
    }]
  const cuenta = { nombre: 'ahorros', fondos: '100' }

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    wrapper = shallowMount(BotonTransferencia,
      {
        store, propsData: { cuenta: cuenta }
      })
  })
  it('Agrega la transferencia al inicio del array egresos de la store', () => {
    wrapper.vm.monto = datosTransferencia[0].monto
    wrapper.vm.fecha = datosTransferencia[0].fecha
    wrapper.vm.cuentaDestino = datosTransferencia[0].cuenta

    wrapper.vm.transferir()

    assert.equal(cuenta.nombre, store.state.egresos[0].cuenta, 'no se agrega la cuenta de origen correctamente')
    assert.equal(datosTransferencia[0].fecha, store.state.egresos[0].fecha, 'no se agrega la fecha correctamente')
    assert.equal(datosTransferencia[0].monto, store.state.egresos[0].monto, 'no se agrega el monto correctamente')
    assert.equal(datosTransferencia[0].categoria, store.state.egresos[0].categoria, 'no se agrega la categoria correctamente')
    assert.equal(80, store.state.cuentas.find(cuentaAux => cuentaAux.nombre === cuenta.nombre).fondos, 'no se actualiza el saldo en la cuenta de origen')

    assert.equal(datosTransferencia[0].cuenta, store.state.ingresos[0].cuenta, 'no se agrega la cuenta destino correctamente')
    assert.equal(datosTransferencia[0].fecha, store.state.ingresos[0].fecha, 'no se agrega la fecha correctamente')
    assert.equal(datosTransferencia[0].monto, store.state.ingresos[0].monto, 'no se agrega el monto correctamente')
    assert.equal(datosTransferencia[0].categoria, store.state.ingresos[0].categoria, 'no se agrega la categoria correctamente')
    assert.equal(220, store.state.cuentas.find(cuentaAux => cuentaAux.nombre === datosTransferencia[0].cuenta).fondos, 'no se actualiza el saldo en la cuenta destino ' + store.state.cuentas.find(cuentaAux => cuentaAux.nombre === datosTransferencia[0].cuenta).fondos)
  })
  it('No se pueden agregar transferencias de montos menores o iguales a 0', () => {
    wrapper.vm.monto = -9
    wrapper.vm.fecha = datosTransferencia[0].fecha
    wrapper.vm.cuentaDestino = datosTransferencia[0].cuenta
    wrapper.vm.transferir()
    assert.equal(0, store.state.egresos.length, 'se ha agregado un egreso de transferencia negativo')
    assert.equal(0, store.state.ingresos.length, 'se ha agregado un ingreso de transferencia negativo')

    wrapper.vm.monto = 0
    wrapper.vm.fecha = datosTransferencia[0].fecha
    wrapper.vm.cuentaDestino = datosTransferencia[0].cuenta
    wrapper.vm.transferir()
    assert.equal(0, store.state.egresos.length, 'se ha agregado un egreso de transferencia de monto 0')
    assert.equal(0, store.state.ingresos.length, 'se ha agregado un ingreso de transferencia de monto 0')
  })
  it('No se puede hacer una tranferencia de monto mayor a tu saldo', () => {
    wrapper.vm.monto = 1000
    wrapper.vm.fecha = datosTransferencia[0].fecha
    wrapper.vm.cuenta = datosTransferencia[0].cuenta
    wrapper.vm.transferir()
    assert.equal(0, store.state.egresos.length, 'se ha realizado un egreso de transferencia sin tener saldo suficiiente')
    assert.equal(0, store.state.ingresos.length, 'se ha realizado un ingreso de transferencia sin tener saldo suficiiente')
  })
})
