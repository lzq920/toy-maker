<script>
import { h, onBeforeUnmount, onMounted, ref } from 'vue'
import useComponentCommon from '@/hooks/useComponentCommon'
import lottie from 'lottie-web'

export default {
  name: 'blocks-lottie',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const {
      handleClick,
      computedStyle
    } = useComponentCommon(props.config)
    const lottieAnimation = ref()
    onMounted(() => {
      const config = {
        container: document.querySelector(`#${props.config.id}`),
        ...props.config.lottieConfig
      }
      lottieAnimation.value = lottie.loadAnimation(config)
    })
    onBeforeUnmount(() => {
      lottieAnimation.value.destroy()
    })
    return () => h(
      'div',
      {
        id: props.config.id,
        style: computedStyle,
        onClick: handleClick
      }
    )
  }
}
</script>

<style></style>
