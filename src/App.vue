<template>
  <div>
    <TyHeader />
    <TyRace />
  </div>
</template>

<script>
import { provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'

import apolloClient from '@/libs/apollo'
import TyHeader from '@/components/TyHeader'
import TyRace from '@/components/TyRace'

export default {
  name: 'App',

  components: {
    TyHeader,
    TyRace
  },

  setup () {
    provide(DefaultApolloClient, apolloClient)
  }
}
</script>

<style lang="scss">
body {
  @apply bg-gray-200;
}

#app {
  @apply w-3/4 mx-auto;
}
</style>
