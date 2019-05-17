<template>
  <v-container fluid class="contenedor">
    <div>
      <InformacionCuenta
        :cuentaActual="cuenta.nombre"
        :cuentaOriginal="cuenta.nombre"
        :fondos="cuenta.fondos"
        @actualizarCuenta="actualizarCuenta"/>
      <Lista :items = "ingresos" titulo="Ingresos" style="heigth: 10%"/>
      <Lista :items = "egresos" titulo="Egresos" height="15%"/>
      <Herramientas :cuenta="cuenta" height="25%"/>
    </div>
  </v-container>
</template>
<script>
import Lista from '@/components/Lista.vue'
import Herramientas from '@/components/Herramientas.vue'
import InformacionCuenta from '@/components/InformacionCuenta.vue'
export default {
  components: {
    Lista,
    Herramientas,
    InformacionCuenta
  },
  props: {
    cuenta: Object
  },
  computed: {
    ingresos() {
      return this.$store.state.ingresos.filter((ingreso) => ingreso.cuenta === this.cuenta.nombre)
    },
    egresos() {
      return this.$store.state.egresos.filter((egreso) => egreso.cuenta === this.cuenta.nombre)
    },
  },
  methods: {
    actualizarCuenta(cuenta) {
      if (this.$store.state.cuentas.find((cuentaAuxiliar) => cuentaAuxiliar.nombre === cuenta.nombre) !== undefined) {
        this.cuenta = this.$store.state.cuentas.find((cuentaAuxiliar) => cuentaAuxiliar.nombre === cuenta.nombre)
      } else {
        this.cuenta = this.$store.state.cuentas[0]
      }
    }
  }
}
</script>
<style scoped>
.contenedor {
  display: inline-block;
}
</style>
