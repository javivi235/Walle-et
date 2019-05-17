import Vuex from 'vuex'

export default {
  name: 'TestUtil',

  getDefaultStore() {
    return new Vuex.Store({
      state: {
        cuentas: [{ nombre: 'ahorros', fondos: 100 }, { nombre: 'comida', fondos: 200 },
          { nombre: 'Fiesta', fondos: 200 }],
        categoriaIngresos: ['Salario', 'Transferencia', 'Otros'],
        categoriaEgresos: ['Expensas', 'Transferencia', 'Otros'],
        ingresos: [],
        egresos: [],
      },
      mutations: {
        agregarIngreso(context, nuevoIngreso) {
          context.ingresos.unshift(nuevoIngreso)
        },
        agregarEgreso(context, nuevoEgreso) {
          context.egresos.unshift(nuevoEgreso)
        },
        actualizarSaldo(context, cuentaModificada) {
          context.cuentas.find((cuenta) =>
            cuenta.nombre === cuentaModificada.nombre).fondos = cuentaModificada.fondos
        },
        agregarCategoriaIngreso(context, nuevaCategoria) {
          context.categoriaIngresos.unshift(nuevaCategoria)
        },
        agregarCategoriaEgreso(context, nuevaCategoria) {
          context.categoriaEgresos.unshift(nuevaCategoria)
        },
        editarCuentaNombre(context, cuentas) {
          context.cuentas.find((cuenta) =>
            cuenta.nombre === cuentas.nombreAntiguo).nombre = cuentas.nombreNuevo
          context.ingresos.forEach(function(ingreso) {
            if (ingreso.cuenta === cuentas.nombreAntiguo) {ingreso.cuenta = cuentas.nombreNuevo}
          })
          context.egresos.forEach(function(egreso) {
            if (egreso.cuenta === cuentas.nombreAntiguo) {egreso.cuenta = cuentas.nombreNuevo}
          })
        },
        addCuenta(context, newCuenta) {
          context.cuentas.push(newCuenta)
        },
        borrarCuenta(context, cuentaData) {
          context.cuentas.forEach(function(cuenta, indice) {
            if (cuenta.nombre === cuentaData.nombre) {context.cuentas.splice(indice, 1)}
          })
        }
      },
      actions: {
        agregarIngreso(context, nuevoIngreso) {
          context.commit('agregarIngreso', nuevoIngreso)
        },
        agregarEgreso(context, nuevoEgreso) {
          context.commit('agregarEgreso', nuevoEgreso)
        },
        actualizarSaldo(context, cuentaModificada) {
          context.commit('actualizarSaldo', cuentaModificada)
        },
        agregarCategoriaIngreso(context, nuevaCategoria) {
          context.commit('agregarCategoriaIngreso', nuevaCategoria)
        },
        agregarCategoriaEgreso(context, nuevaCategoria) {
          context.commit('agregarCategoriaEgreso', nuevaCategoria)
        },
        editarCuentaNombre(context, cuentas) {
          context.commit('editarCuentaNombre', cuentas)
        },
        addCuenta(context, newCuenta) {
          context.commit('addCuenta', newCuenta)
        },
        borrarCuenta(context, cuentaData) {
          context.commit('borrarCuenta', cuentaData)
        }
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
    })
  },
}
