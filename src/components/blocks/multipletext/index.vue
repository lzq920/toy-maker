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
    return {
      computedStyle,
      handleClick,
      getExpression
    }
  },
  render () {
    return h(
      'div',
      {
        id: this.config.id,
        style: Object.assign(this.computedStyle, {
          display: '-webkit-box',
          '-webkit-line-clamp': this.config.lineClamp,
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }),
        onClick: this.handleClick
      },
      this.getExpression(this.config.innerText)
    )
  }
}
</script>

<style></style>
