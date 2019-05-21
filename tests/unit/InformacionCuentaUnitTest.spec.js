import { shallowMount } from '@vue/test-utils'
import TestUtil from '../../src/Utils/TestUtil.js'
import InformacionCuenta from '@/components/InformacionCuenta.vue'

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

suite('Modificar datos cuenta', () => {
  let wrapper
  let store
  const assert = require('chai').assert

  setup(function () {
    store = TestUtil.getDefaultStore()
    store.state.cuentas.push(store.state.cuentas.push({
      icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/'
    }))
    wrapper = shallowMount(InformacionCuenta,
      {
        store,
        propsData: {
          cuentaActual: 'ahorros',
          cuentaOriginal: 'ahorros',
          fondos: 0
        }
      })
  })

  test('editar nombre de cuenta', () => {
    const nuevoNombre = 'Emergencias'

    wrapper.vm.cuentaActual = nuevoNombre

    wrapper.vm.editarNombre()

    assert.exists(store.state.cuentas.find(cuenta => cuenta.nombre === nuevoNombre),
      'El nombre no cambia')
  })
  test('borrar cuenta', () => {
    const cuentaOriginal = wrapper.vm.cuentaOriginal

    wrapper.vm.borrarCuenta()

    assert.notExists(store.state.cuentas.find(cuenta => cuenta.nombre === cuentaOriginal),
      'Aun existe la cuenta')
  })
})
describe('Nombres de cuenta invalidos', () => {
  let wrapper
  let store
  const assert = require('chai').assert

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    store.state.cuentas.push(store.state.cuentas.push({
      icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/'
    }))
    wrapper = shallowMount(InformacionCuenta,
      {
        store,
        propsData: {
          cuentaActual: 'ahorros',
          cuentaOriginal: 'ahorros',
          fondos: 0
        }
      })
  })

  it('Nombre vacio', () => {
    wrapper.vm.cuentaActual = ''

    wrapper.vm.editarNombre()

    assert.notExists(store.state.cuentas.find(cuenta => cuenta.nombre === ''),
      'Se encontro cuenta vacia')
    assert.equal(wrapper.vm.alerta.visible, true, 'alerta no aparece')
  })
  it('Nombre Global', () => {
    const nombreGlobal = 'Global'

    wrapper.vm.cuentaActual = nombreGlobal

    wrapper.vm.editarNombre()

    assert.equal(wrapper.vm.alerta.visible, true, 'alerta no aparece')
    assert.equal(store.state.cuentas.filter(cuenta => cuenta.nombre === nombreGlobal).length, 1,
      'Dos cuentas globales existententes')
  })
  it('Nombre repetido', () => {
    const otraCuenta = 'Estudios'

    store.state.cuentas.push({ icon: 'account_balance', nombre: otraCuenta, fondos: 0, route: '/' })
    wrapper.vm.cuentaActual = otraCuenta

    wrapper.vm.editarNombre()

    assert.equal(wrapper.vm.alerta.visible, true, 'alerta no aparece')
    assert.equal(store.state.cuentas.filter(cuenta => cuenta.nombre === otraCuenta).length, 1,
      'Dos cuentas de mismo nombre')
  })
})
describe('Borrar Cuentas invalidas', () => {
  let wrapper
  let store
  const assert = require('chai').assert

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    store.state.cuentas.push(store.state.cuentas.push({
      icon: 'account_balance', nombre: 'ahorros', fondos: 0, route: '/'
    }))
    wrapper = shallowMount(InformacionCuenta,
      {
        store,
        propsData: {
          cuentaActual: 'ahorros',
          cuentaOriginal: 'ahorros',
          fondos: 0
        }
      })
  })

  it('Borrar cuenta global', () => {
    const nombreGlobal = 'Global'

    wrapper.vm.cuentaOriginal = nombreGlobal
    wrapper.vm.cuentaActual = nombreGlobal

    wrapper.vm.borrarCuenta()

    assert.exists(store.state.cuentas.find(cuenta => cuenta.nombre === nombreGlobal),
      'Se borro la cuenta global')
    assert.equal(wrapper.vm.alerta.visible, true, 'alerta no aparece')
  })
  it('Borrar cuenta con saldo', () => {
    const cuentaOriginal = wrapper.vm.cuentaOriginal

    wrapper.vm.fondos = 100

    wrapper.vm.borrarCuenta()

    assert.exists(store.state.cuentas.find(cuenta => cuenta.nombre === cuentaOriginal),
      'Se borro cuenta con fondos')
    assert.equal(wrapper.vm.alerta.visible, true, 'alerta no aparece')
  })
  it('Borrar cuenta con ingresos', () => {
    const cuentaOriginal = wrapper.vm.cuentaOriginal

    store.state.ingresos.push({
      cuenta: cuentaOriginal,
      fecha: '2019-05-23',
      monto: 50,
      categoria: 'Salario'
    })

    wrapper.vm.borrarCuenta()

    assert.exists(store.state.cuentas.find(cuenta => cuenta.nombre === cuentaOriginal),
      'Se borro cuenta con Ingresos')
    assert.equal(wrapper.vm.alerta.visible, true, 'alerta no aparece')
  })
  it('Borrar cuenta con egresos', () => {
    const cuentaOriginal = wrapper.vm.cuentaOriginal

    store.state.egresos.push({
      cuenta: cuentaOriginal,
      fecha: '2019-05-23',
      monto: 50,
      categoria: 'Otros'
    })

    wrapper.vm.borrarCuenta()

    assert.exists(store.state.cuentas.find(cuenta => cuenta.nombre === cuentaOriginal),
      'Se borro cuenta con Egresos')
    assert.equal(wrapper.vm.alerta.visible, true, 'alerta no aparece')
  })
})
describe('Render informacion cuenta', () => {
  let wrapper
  let store
  const assert = require('chai').assert

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    store.state.cuentas.push(store.state.cuentas.push({
      icon: 'account_balance',
      nombre: 'ahorros',
      fondos: 0,
      route: '/'
    }))
    wrapper = shallowMount(InformacionCuenta,
      {
        store,
        propsData: {
          cuentaActual: 'ahorros',
          cuentaOriginal: 'ahorros',
          fondos: 0
        }
      })
  })

  it('Componentes iniciales renderizan', () => {
    assert.equal(wrapper.find('.titulo').exists(), true)
    assert.equal(wrapper.find('#nombreCuenta').exists(), true)
    assert.equal(wrapper.find('#editarCuenta').exists(), true)
    assert.equal(wrapper.find('#saldoCuenta').exists(), true)
    assert.equal(wrapper.find('#borrarCuenta').exists(), true)
    assert.equal(wrapper.find('#guardarCuenta').exists(), false)
    assert.equal(wrapper.find('#alertaSuperior').exists(), true)
  })
  it('Boton editar cambia a guardar al click', () => {
    assert.equal(wrapper.find('#editarCuenta').exists(), true)
    assert.equal(wrapper.find('#guardarCuenta').exists(), false)

    wrapper.vm.edicion = true

    assert.equal(wrapper.find('#editarCuenta').exists(), false)
    assert.equal(wrapper.find('#guardarCuenta').exists(), true)

    wrapper.vm.edicion = false

    assert.equal(wrapper.find('#editarCuenta').exists(), true)
    assert.equal(wrapper.find('#guardarCuenta').exists(), false)
  })
})
