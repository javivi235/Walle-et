<template>
  <v-bottom-sheet v-model="sheet">
    <template v-slot:activator>
      <v-btn
        color="#64C195"
        dark
        round
        id="botonTransferencia"
      >
        Transferencia
      </v-btn>
    </template>
    <v-list>
    <p class="text-md-center">Nueva Transferencia</p>
      <v-layout column>
        <v-combobox
          :items="otrasCuentas"
          label="Seleccione la cuenta destinada"
          chips
          autofocus
          type="button"
          class="seleccion"
          v-model="cuentaDestino"
        >
        </v-combobox>
        <v-text-field
          class="input"
          label="Monto"
          type="number"
          v-model="monto"
        ></v-text-field>
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="fecha"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="fecha"
              label="Picker in menu"
              prepend-icon="event"
              readonly
              v-on="on"
              class="calendario"
            ></v-text-field>
          </template>
          <v-date-picker v-model="fecha" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(fecha)">OK</v-btn>
          </v-date-picker>
        </v-menu>
        <v-btn
          color="#64C195"
          dark
          round
          class="input"
          id="AgregarTransferencia"
          @click="transferir"
        >
          Enviar
        </v-btn>
      </v-layout>
    </v-list>
  </v-bottom-sheet>
</template>
<script>
export default {
  props: {
    cuenta: Object
  },
  data() {
    return {
      sheet: false,
      fecha: new Date().toISOString().substr(0, 10),
      monto: 0,
      cuentaDestino: ''
    }
  },
  computed: {
    otrasCuentas() {
      return this.$store.state.cuentas.filter((cuenta) => cuenta.nombre !== this.cuenta.nombre).map(function(i) {
        return i.nombre
      })
    }
  },
  methods: {
    transferir() {
      try {
        if (this.cuentaDestino === '') {
          throw new Error('Seleccione la cuenta objetivo')
        } else if (this.monto <= 0) {
          throw new Error('Ingrese un monto mayor a 0')
        }
        this.cuenta.fondos = Number(this.cuenta.fondos) - Number(this.monto)
        this.$store.dispatch('agregarEgreso', {
          cuenta: this.cuenta.nombre, fecha: this.fecha, monto: this.monto, categoria: 'Transferencia' })
        this.$store.dispatch('actualizarSaldo', this.cuenta)
        this.$store.dispatch('agregarIngreso', {
          cuenta: this.cuentaDestino, fecha: this.fecha, monto: this.monto, categoria: 'Transferencia' })
        const cuentaObjActualizada = this.$store.state.cuentas.find((cuenta) => cuenta.nombre === this.cuentaDestino)
        cuentaObjActualizada.fondos = Number(cuentaObjActualizada.fondos) + Number(this.monto)
        this.$store.dispatch('actualizarSaldo', cuentaObjActualizada)
        this.generarAlerta({ mensaje: 'Agregado exitosamente', tipo: 'success', visible: true, color: '#64C195' })
      } catch (error) {
        this.generarAlerta({ mensaje: error, tipo: 'error', visible: true, color: 'red' })
      } finally {
        this.sheet = false
        this.fecha = new Date().toISOString().substr(0, 10)
        this.monto = 0
        this.cuentaDestino = ''
      }
    },
    generarAlerta(alerta) {
      this.$emit('setAlerta', alerta)
    }
  }
}
</script>
<style scoped>
.calendario {
  width: 30%;
  margin-left: 35%;
}
.seleccion {
  width: 80%;
  margin-left: 10%;
}
.input {
  width: 30%;
  margin-left: 35%;
}
</style>
