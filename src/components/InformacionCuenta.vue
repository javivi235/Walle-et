<template>
  <v-hover>
    <v-container fluid class="contenedor">
      <v-layout column>
        <v-flex xs12>
          <div>
            <v-layout>
              <div>
                <h3 class="titulo">Cuenta: </h3>
                <v-text-field
                  v-model="cuentaActual"
                  :readonly="!edicion"
                  id="nombreCuenta"
                ></v-text-field>
              </div>
              <v-btn
                class="boton"
                icon
                v-if="!edicion"
                @click="edicion = true"
                id="editarCuenta"
              >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn
                class="boton"
                icon
                v-else
                @click="editarNombre"
                id="guardarCuenta"
              >
                <v-icon>save</v-icon>
              </v-btn>
              <h3 class="saldo" id="saldoCuenta">SALDO: {{fondos}}</h3>
              <v-spacer></v-spacer>
              <v-expand-transition>
                <div
                  :v-if= "alerta.visible"
                  class="d-flex transition-fast-in-fast- v-card--reveal display-3 white--text"
                >
                  <v-alert
                    :value="alerta.visible"
                    :type="alerta.tipo"
                    transition="scale-transition"
                    :color= "alerta.color"
                    outline
                    id="alertaSuperior"
                  >
                    {{alerta.mensaje}}
                  </v-alert>
                </div>
              </v-expand-transition>
              <v-btn
                class="boton"
                icon
                @click="borrarCuenta"
                id="borrarCuenta"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-hover>
</template>
<script>
export default {
  props: {
    cuentaActual: String,
    cuentaOriginal: String,
    fondos: Number
  },
  data() {
    return {
      edicion: false,
      alerta: { mensaje: '', tipo: 'success', visible: false, color: '#64C195' },
    }
  },
  methods: {
    editarNombre() {
      try {
        if (this.cuentaOriginal === 'Global') {
          throw new Error('No se puede cambiar el nombre de la cuenta global')
        } else if (this.cuentaActual === '') {
          throw new Error('Inserte un nuevo nombre')
        } else if (this.cuentaActual === this.cuentaOriginal) {
          throw new Error('No se realizo ningun cambio, pues es el mismo nombre')
        } else if (this.otrasCuentas.find((cuentaAuxiliar) =>
          cuentaAuxiliar === this.cuentaActual) !== undefined) {
          throw new Error('Nombre ya existente')
        }
        this.$store.dispatch('editarCuentaNombre', {
          nombreNuevo: this.cuentaActual, nombreAntiguo: this.cuentaOriginal, })
        this.alerta = { mensaje: 'Modificado exitosamente', tipo: 'success', visible: true, color: '#64C195' }
        this.cuentaOriginal = this.cuentaActual
        this.$router.push('/cuentas/' + this.cuentaActual)
      } catch (error) {
        this.cuentaActual = this.cuentaOriginal
        this.alerta = { mensaje: error, tipo: 'error', visible: true, color: 'red' }
      } finally {
        this.edicion = false
      }
    },
    borrarCuenta() {
      try {
        if (this.cuentaOriginal === 'Global') {
          throw new Error('No se puede borrar la cuenta global')
        } else if (this.$store.state.ingresos.find((ingreso) => ingreso.cuenta === this.cuentaOriginal) !== undefined) {
          throw new Error('No se puede borrar una cuenta que tiene ingresos')
        } else if (this.$store.state.egresos.find((egreso) => egreso.cuenta === this.cuentaOriginal) !== undefined) {
          throw new Error('No se puede borrar una cuenta que tiene egresos')
        } else if (Number(this.fondos) !== 0) {
          throw new Error('No se puede borrar una cuenta que tiene saldo')
        }
        this.$store.dispatch('borrarCuenta', { nombre: this.cuentaOriginal })
        this.$router.push('/cuentas/Global')
        this.alerta = { mensaje: 'Eliminado exitosamente', tipo: 'success', visible: true, color: '#64C195' }
      } catch (error) {
        this.alerta = { mensaje: error, tipo: 'error', visible: true, color: 'red' }
      } finally {
      }
    }
  },
  computed: {
    otrasCuentas() {
      return this.$store.state.cuentas.filter((cuenta) =>
        cuenta.nombre !== this.cuentaActual.nombre).map(function(i) {
        return i.nombre
      })
    }
  }
}
</script>
<style scoped>
.titulo {
  text-transform: uppercase;
  text-align: center;
  color: #64C195;
}
.saldo {
  text-align: right;
  color: #64C195;
  margin-left: 10%;
}
.contenedor {
  width: 80%;
  margin-left: 10%
}
.boton {
  margin-top: 5%;
  width: 20px;
  height: 20px;
}
</style>
