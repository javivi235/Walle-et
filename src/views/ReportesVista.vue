<template>
  <Report :cuenta="cuenta"/>
</template>

<script>
import Report from '@/components/Report.vue'
export default {
  components: {
    Report
  },
  props: {
    cuenta: Object
  }
}
</script>
