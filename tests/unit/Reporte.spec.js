import { assert } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Report from '@/components/Report.vue'
import ReportUtil from '@/Utils/ReportUtil.js'

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

describe('Unit tests del reporte', () => {
  let wrapper
  let store

  beforeEach(function () {
    store = ReportUtil.getDefaultStore()
    wrapper = shallowMount(Report,
      {
        store
      })
  })
  it('Recibe las fechas con exito', () => {
    var fechas = store.getters.obtenerFechas
    assert.equal(fechas.length, 6)
  })

  it('Reporte obtenido con 6 objetos', () => {
    assert.exists(wrapper.vm.nuevoReporte)
    assert.lengthOf(wrapper.vm.nuevoReporte, 6)
  })

  it('Categorias concatenadas para el filtro', () => {
    var catIngreso = store.state.categoriaIngresos
    var catEgreso = store.state.categoriaEgresos
    var concatenacion = store.getters.obtenerCategorias
    var total = catIngreso.length + catEgreso.length
    assert.isAtMost(concatenacion.length, total)
  })
})
