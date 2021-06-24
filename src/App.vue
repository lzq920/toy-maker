<template>
  <router-view :key="$route.fullPath"></router-view>
</template>
<script>
import { useFavicon } from '@vueuse/core'
export default {
  setup () {
    const favicon = useFavicon()
    favicon.value = 'favicon.ico'
  }
}
</script>
<style>
</style>
