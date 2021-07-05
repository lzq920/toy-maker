<script>
import { h } from 'vue'
import useComponentCommon from '@/hooks/useComponentCommon'

export default {
  name: 'blocks-single-text',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  inject: ['mode'],
  setup (props) {
    const {
      handleClick,
      computedStyle,
      getExpression
    } = useComponentCommon(props.config)
    return () => h(
      'div',
      {
        id: props.config.id,
        style: computedStyle(props.config),
        onClick: handleClick
      },
      getExpression(props.config.innerText)
    )
  }
}
</script>

<style></style>
