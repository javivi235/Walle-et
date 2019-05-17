<template>
  <div class="home">
    <NavDrawer @actualizarCuenta="actualizarCuenta"/>
    <CuentaManager :cuenta="cuenta"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CuentaManager from '@/components/CuentaManager.vue'
import NavDrawer from '@/components/NavDrawer.vue'

export default {
  name: 'home',
  components: {
    CuentaManager,
    NavDrawer
  },
  props: {
    cuenta: Object
  },
  methods: {
    actualizarCuenta(cuenta) {
      this.cuenta = cuenta
    }
  }
}
</script>
