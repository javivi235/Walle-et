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
      const account = this.$store.state.cuentas.find((cuenta) => cuenta.nombre === nombreCuenta)
      return account
    }
  },
  methods: {
    actualizarCuenta(cuenta) {
      this.cuenta = cuenta
    }
  }
}
</script>
