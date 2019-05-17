<template>
  <v-bottom-sheet v-model="sheet">
    <template v-slot:activator>
      <v-btn
        color="#64C195"
        dark
        round
        id="botonCategoria"
        >
          +Categoria
      </v-btn>
    </template>
    <v-list>
      <p class="text-md-center">Nueva Categoria</p>
      <v-layout column>
        <v-combobox
          :items= "this.tiposCategoria"
          label="Seleccione el tipo de categoria"
          chips
          autofocus
          type="button"
          class="seleccion"
          v-model="tipo"
        ></v-combobox>
        <v-text-field
          class="input"
          label="Nombre"
          v-model="nombre"
        ></v-text-field>
        <v-btn
          color="#64C195"
          dark
          round
          class="input"
          id="AgregarCategoria"
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
    categoriaIngresos: Array,
    categoriaEgresos: Array,
  },
  data() {
    return {
      tiposCategoria: ['Ingreso', 'Egreso'],
      tipo: '',
      nombre: '',
      sheet: false
    }
  },
  methods: {
    agregar() {
      try {
        if (this.nombre === '') {
          throw new Error('Introdusca un nombre')
        } else if (this.tipo === '') {
          throw new Error('Seleccione un tipo')
        }
        switch (this.tipo) {
          case 'Ingreso':
            if (this.categoriaIngresos.find((categoria) => categoria === this.nombre) !== undefined) {
              throw new Error('Cateogria ya existente')
            }
            this.$store.dispatch('agregarCategoriaIngreso', this.nombre)
            break
          case 'Egreso':
            if (this.categoriaEgresos.find((categoria) => categoria === this.nombre) !== undefined) {
              throw new Error('Cateogria ya existente')
            }
            this.$store.dispatch('agregarCategoriaEgreso', this.nombre)
            break
        }
        this.generarAlerta({ mensaje: 'Agregado exitosamente', tipo: 'success', visible: true, color: '#64C195' })
      } catch (error) {
        this.generarAlerta({ mensaje: error, tipo: 'error', visible: true, color: 'red' })
      } finally {
        this.sheet = false
        this.tipo = ''
        this.nombre = ''
      }
    },
    generarAlerta(alerta) {
      this.$emit('setAlerta', alerta)
    }
  }
}
</script>
<style scoped>
.seleccion {
  width: 80%;
  margin-left: 10%;
}
.input {
  width: 30%;
  margin-left: 35%;
}
</style>

