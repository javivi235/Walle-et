<template>
  <Report :cuenta="cuenta"/>
</template>

<script>
import Report from '@/components/Report.vue'
export default {
  components: {
    Report
  },
  computed: {
    cuenta() {
      const cuentaNombre = this.$route.params.cuentaNombre
      return this.$store.state.cuentas.find((cuenta) => cuenta.nombre === cuentaNombre)
    }
  }
}
</script>
