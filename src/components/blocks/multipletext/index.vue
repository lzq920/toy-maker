<script>
import { h } from 'vue'
import useComponentCommon from '@/hooks/useComponentCommon'

export default {
  name: 'blocks-multiple-text',
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
        style: Object.assign(computedStyle, {
          display: '-webkit-box',
          '-webkit-line-clamp': props.config.lineClamp,
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }),
        onClick: handleClick
      },
      getExpression(props.config.innerText)
    )
  }
}
</script>

<style></style>
