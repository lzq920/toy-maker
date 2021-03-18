<template>
  <div ref="cropper"></div>
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
  setup () {
    const cropper = ref()
    const cropperInstance = ref()
    const get = () => {
      console.log(cropperInstance.value.get())
    }
    const bind = ({
      url,
      points,
      orientation,
      zoom
    }) => {
      cropperInstance.value.bind(url, points, orientation, zoom)
    }
    const result = async ({
      type,
      size,
      format,
      quality,
      circle
    }) => {
      return await cropperInstance.value.result({
        type,
        size,
        format,
        quality,
        circle
      })
    }
    onMounted(() => {
      cropperInstance.value = new Croppie(cropper.value, {
        enableResize: true,
        enableOrientation: true,
        enableExif: true,
        viewport: {
          width: 375,
          height: 200,
          type: 'square'
        }
      })
    })
    onBeforeUnmount(() => {
      cropperInstance.value.destroy()
    })
    return {
      cropper,
      get,
      bind,
      result
    }
  }
}
</script>

<style scoped>

</style>
