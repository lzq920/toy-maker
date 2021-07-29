<script>
import { h } from 'vue'
import useComponentCommon from '@/hooks/useComponentCommon'

export default {
  name: 'blocks-qrcode',
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
    return () => h('img', {
      id: props.config.id,
      src: `https://vercel-runtimes-api.vercel.app/api/qrcode?text=${props.config.text}`,
      style: computedStyle(props.config),
      onClick: handleClick
    })
  }
}
</script>

<style></style>
