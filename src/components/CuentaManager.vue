<template>
  <v-container fluid class="contenedor">
    <div>
      <InformacionCuenta
        :cuentaActual="cuenta.nombre"
        :cuentaOriginal="cuenta.nombre"
        :fondos="saldo"
        id="informacionCuenta"/>
      <Lista :items = "ingresos" :cuenta = "cuenta" titulo="Ingresos" style="heigth: 10%" id="listaIngresos"/>
      <Lista :items = "egresos" :cuenta = "cuenta" titulo="Egresos" height="15%" id="listaEgresos"/>
      <Herramientas :cuenta="cuenta" height="25%" id="herramientas"/>
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
      if (this.cuenta.nombre !== 'Global') {
        return this.$store.state.ingresos.filter((ingreso) => ingreso.cuenta === this.cuenta.nombre)
      } else {
        return this.$store.state.ingresos
      }
    },
    egresos() {
      if (this.cuenta.nombre !== 'Global') {
        return this.$store.state.egresos.filter((egreso) => egreso.cuenta === this.cuenta.nombre)
      } else {
        return this.$store.state.egresos
      }
    },
    saldo() {
      if (this.cuenta.nombre !== 'Global') {
        return this.cuenta.fondos
      } else {
        let saldo = 0

        this.$store.state.ingresos.forEach((ingreso) => {
          saldo += Number(ingreso.monto)
        })
        this.$store.state.egresos.forEach((egreso) => {
          saldo -= Number(egreso.monto)
        })
        this.$store.dispatch('actualizarSaldoGlobal', Number(saldo))
        return saldo
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
