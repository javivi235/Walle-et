<template>
  <v-bottom-sheet v-model="sheet">
    <template v-slot:activator>
      <v-btn
        color="#64C195"
        dark
        round
      >
        +{{tipo}}
      </v-btn>
    </template>
    <v-list>
      <p class="text-md-center">Nuevo {{tipo}}</p>
      <v-layout column>
        <v-combobox
          :items="categorias"
          label="Seleccione una categoria"
          chips
          autofocus
          type="button"
          class="seleccion"
          v-model="categoria"
        ></v-combobox>
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
          @click="agregar"
        >
          Agregar
        </v-btn>
      </v-layout>
    </v-list>
  </v-bottom-sheet>
</template>
<script>
export default {
  props: {
    tipo: String,
    categorias: Array,
    cuenta: Object
  },
  data() {
    return {
      sheet: false,
      fecha: new Date().toISOString().substr(0, 10),
      categoria: '',
      monto: 0
    }
  },
  methods: {
    agregar() {
      try {
        if (this.categoria === '') {
          throw new Error('Seleccione una categoria')
        } else if (this.monto <= 0) {
          throw new Error('Ingrese un monto mayor a 0')
        }
        switch (this.tipo) {
          case 'Ingreso':
            this.cuenta.fondos = Number(this.monto) + Number(this.cuenta.fondos)
            this.$store.dispatch('agregarIngreso',
                { cuenta: this.cuenta.nombre, fecha: this.fecha, monto: this.monto, categoria: this.categoria })
            break
          case 'Egreso':
            if (Number(this.monto) > Number(this.cuenta.fondos)) {
              throw new Error('Saldo insuficiente')
            }
            this.cuenta.fondos = Number(this.cuenta.fondos) - Number(this.monto)
            this.$store.dispatch('agregarEgreso',
                { cuenta: this.cuenta.nombre, fecha: this.fecha, monto: this.monto, categoria: this.categoria })
            break
        }
        this.$store.dispatch('actualizarSaldo', this.cuenta)
        this.generarAlerta({ mensaje: 'Agregado exitosamente', tipo: 'success', visible: true, color: '#64C195' })
      } catch (error) {
        this.generarAlerta({ mensaje: error, tipo: 'error', visible: true, color: 'red' })
      } finally {
        this.sheet = false
        this.fecha = new Date().toISOString().substr(0, 10)
        this.categoria = ''
        this.monto = 0
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
