<script>
import { h } from 'vue'
import useComponentCommon from '@/hooks/useComponentCommon'

export default {
  name: 'blocks-image',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const {
      handleClick,
      computedStyle,
      getExpression
    } = useComponentCommon(props.config)
    return () => h('img', {
      id: props.config.id,
      src: getExpression(props.config.src),
      style: computedStyle(props.config),
      onClick: handleClick
    })
  }
}
</script>

<style></style>
