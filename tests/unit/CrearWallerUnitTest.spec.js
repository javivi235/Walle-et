import { shallowMount, createLocalVue } from '@vue/test-utils'
import TestUtil from '../../src/Utils/TestUtil.js'
import CrearWallet from '@/components/CrearWallet.vue'

import Vuex from 'vuex'
import VueRouter from 'vue-router'

suite('Cuenta, funcional', () => {
  let wrapper
  let store
  const assert = require('chai').assert
  let localVue
  let router

  setup(function () {
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)
    router = new VueRouter()
    store = TestUtil.getDefaultStore()
    wrapper = shallowMount(CrearWallet,
      {
        store,
        localVue,
        router
      })
    wrapper.setData({
      nombre: '',
      nombreExiste: false,
      snackbar: false,
      timeout: 2500,
      snackbarText: ''
    })
  })

  test('Crear Cuenta, funcional', () => {
    wrapper.vm.nombre = 'nuevaWallet'

    wrapper.vm.addCuenta()

    assert.exists(store.state.cuentas.find(cuenta => cuenta.nombre === 'nuevaWallet'),
      'no se crea la cuenta')
  })
})
describe('Cuentas invalidas', () => {
  let wrapper
  let store
  const assert = require('chai').assert
  let localVue
  let router

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)
    router = new VueRouter()
    wrapper = shallowMount(CrearWallet,
      {
        store,
        localVue,
        router
      })
    wrapper.setData({
      nombre: '',
      nombreExiste: false,
      snackbar: false,
      timeout: 2500,
      snackbarText: ''
    })
  })

  it('cuenta de nombre vacio', () => {
    wrapper.vm.nombre = ''

    wrapper.vm.addCuenta()

    assert.notExists(store.state.cuentas.find(cuenta => cuenta.nombre === ''),
      'cuenta sin nombre creada')
  })
  it('cuenta de nombre Global', () => {
    const nombreGlobal = 'Global'

    wrapper.vm.nombre = nombreGlobal

    wrapper.vm.addCuenta()

    assert.equal(1, store.state.cuentas.filter(cuenta => cuenta.nombre === nombreGlobal).length,
      'cuenta con nombre global creada')
  })
  it('cuenta de nombre ya existente', () => {
    const nombre = 'ahorros'

    store.state.cuentas.push({ icon: 'account_balance', nombre: nombre, fondos: 0, route: '/' })
    wrapper.vm.nombre = nombre

    wrapper.vm.addCuenta()

    assert.equal(1, store.state.cuentas.filter(cuenta => cuenta.nombre === nombre).length,
      'cuenta con nombre existente creada')
  })
})
describe('Render crear cuenta', () => {
  let wrapper
  let store
  const assert = require('chai').assert
  let localVue
  let router

  beforeEach(function () {
    store = TestUtil.getDefaultStore()
    localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)
    router = new VueRouter()
    wrapper = shallowMount(CrearWallet,
      {
        store,
        localVue,
        router
      })
    wrapper.setData({
      nombre: '',
      nombreExiste: false,
      snackbar: false,
      timeout: 2500,
      snackbarText: ''
    })
  })

  it('elementos iniciales', () => {
    assert.equal(wrapper.find('.Header').exists(), true)
    assert.equal(wrapper.find('#nombreCrearCuenta').exists(), true)
    assert.equal(wrapper.find('#crearCuenta').exists(), true)
    assert.equal(wrapper.find('#volverHome').exists(), true)
    assert.equal(wrapper.find('#snackbarCrearCuenta').exists(), true)
    assert.equal(wrapper.find('#okSnackbar').exists(), true)
  })
})
