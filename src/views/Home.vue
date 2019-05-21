<template>
  <div class="home">
    <NavDrawer/>
    <CuentaManager :cuenta="cuenta"/>
  </div>
</template>

<script>
import CuentaManager from '@/components/CuentaManager.vue'
import NavDrawer from '@/components/NavDrawer.vue'

export default {
  name: 'home',
  components: {
    CuentaManager,
    NavDrawer
  },
  watch: {
    '$route'(to, from) {
    }
  },
  computed: {
    cuenta() {
      const nombreCuenta = this.$route.params.cuentaNombre
      return this.$store.state.cuentas.find((cuenta) => cuenta.nombre === nombreCuenta)
    }
  },
  methods: {
    actualizarCuenta(cuenta) {
      this.cuenta = cuenta
    }
  }
}
</script>
