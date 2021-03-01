<template>
  <router-view :key="key"></router-view>
</template>
<script>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

export default {
  setup () {
    const route = useRoute()
    const key = ref(route.fullPath)
    watch(route, (val) => {
      key.value = val.fullPath
    })
    return {
      key: key
    }
  }
}
</script>
<style lang="scss"></style>
