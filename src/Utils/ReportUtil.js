import Vuex from 'vuex'

export default {
  name: 'ReportUtil',

  getDefaultStore() {
    return new Vuex.Store({
      state: {
        cuentas: [{ nombre: 'ahorros', fondos: 100 }],
        categoriaIngresos: ['Salario', 'Transferencia', 'Otros'],
        categoriaEgresos: ['Expensas', 'Transferencia', 'Otros'],
        ingresos: [{ id: 'ingresos', fecha: '2019-05-01', monto: 100, categoria: 'Salario' },
          { id: 'ingresos', fecha: '2019-03-25', monto: 300, categoria: 'Otros' },
          { id: 'ingresos', fecha: '2019-04-23', monto: 400, categoria: 'Transferencia' }],
        egresos: [{ id: 'egresos', fecha: '2019-05-03', monto: 100, categoria: 'Expensas' },
          { id: 'egresos', fecha: '2019-01-30', monto: 1000, categoria: 'Transferencia' },
          { id: 'egresos', fecha: '2019-04-21', monto: 550, categoria: 'Expensas' }]
      },
      getters: {
        hacerReporte(state) {
          return state.ingresos.concat(state.egresos)
        },
        obtenerCategorias(state) {
          const cat = state.categoriaIngresos.concat(state.categoriaEgresos)
          for (let i = 0; i < cat.length; i++) {
            for (let j = i + 1; j < cat.length; ++j) {
              if (cat[i] === cat[j]) {
                cat.splice(j--, 1)
              }
            }
          }
          return cat
        },
        obtenerFechas(state) {
          const cat = state.ingresos.concat(state.egresos)
          const fechas = cat.map((dato) => dato.fecha)
          return fechas
        }
      },
      mutations: {

      },
      actions: {

      }
    })
  }
}
