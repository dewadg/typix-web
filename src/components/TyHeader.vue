<template>
  <header class="header">
    <TyLogo />
  </header>
</template>

<script>
import TyLogo from '@/components/TyLogo'

export default {
  components: {
    TyLogo
  }
}
</script>

<style lang="scss">
.header {
  @apply py-4 mb-4;
}
</style>
