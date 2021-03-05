<template>
  <router-view></router-view>
</template>
<script>
import { onBeforeMount } from 'vue'
import { initJsStore } from '@/service/idbConfig'

export default {
  setup () {
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
  }
}
</script>
<style>
</style>
