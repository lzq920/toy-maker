<script>
import { h, onBeforeUnmount, onMounted, ref, watch } from 'vue'
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
    const initLottieAnimation = () => {
      const config = {
        container: document.querySelector(`#${props.config.id}`),
        ...props.config.lottieConfig
      }
      lottieAnimation.value = lottie.loadAnimation(config)
    }
    watch(props.config.lottieConfig, () => {
      if (lottieAnimation.value) {
        lottieAnimation.value.destroy()
      }
      initLottieAnimation()
    }, {
      deep: true
    })
    onMounted(() => {
      initLottieAnimation()
    })
    onBeforeUnmount(() => {
      lottieAnimation.value.destroy()
    })
    return () => h(
      'div',
      {
        id: props.config.id,
        style: computedStyle(props.config),
        onClick: handleClick
      }
    )
  }
}
</script>

<style></style>
