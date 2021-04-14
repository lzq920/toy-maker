<template>
  <div class="w-full h-full">
    <div ref="cropper" style="height:500px"></div>
    <div class="flex justify-center mt-10">
      <el-button @click="getCropResult">确定</el-button>
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Croppie from 'croppie'
import 'croppie/croppie.css'

export default {
  name: 'image-cropper',
  props: {
    url: String
  },
  emits: ['choose'],
  setup (props, {
    emit
  }) {
    const cropper = ref()
    const cropperInstance = ref()
    const bindImage = (params) => {
      cropperInstance.value.bind(params)
    }
    const getCropResult = async () => {
      const { points } = await cropperInstance.value.get()
      const width = points[2] - points[0]
      const height = points[3] - points[1]
      const result = await cropperInstance.value.result()
      emit('choose', {
        width,
        height,
        result
      })
    }
    onMounted(() => {
      cropperInstance.value = new Croppie(cropper.value, {
        enableResize: true,
        enableOrientation: true,
        enableExif: true,
        viewport: { width: 375, height: 375 }
      })
      bindImage({
        url: props.url
      })
    })
    onBeforeUnmount(() => {
      cropperInstance.value.destroy()
    })
    return {
      cropper,
      getCropResult
    }
  }
}
</script>

<style scoped>

</style>
