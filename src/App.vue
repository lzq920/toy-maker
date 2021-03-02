<template>
  <router-view :key="key"></router-view>
</template>
<script>
import { useRoute } from 'vue-router'
import { onBeforeMount, ref, watch } from 'vue'
import { initJsStore } from '@/service/idbConfig'

export default {
  setup () {
    const route = useRoute()
    const key = ref(route.fullPath)
    watch(route, (val) => {
      key.value = val.fullPath
    })
    onBeforeMount(async () => {
      try {
        const isDbCreated = await initJsStore()
        if (isDbCreated) {
          console.log('db created')
        } else {
          console.log('db opened')
        }
      } catch (ex) {
        console.error(ex)
      }
    })
    return {
      key: key
    }
  }
}
</script>
<style lang="scss"></style>
