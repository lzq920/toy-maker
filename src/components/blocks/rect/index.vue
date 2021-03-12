<script>
import { h } from 'vue'
import useComponentCommon from '@/hooks/useComponentCommon'
export default {
  name: 'blocks-rect',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const { handleClick, computedStyle, getExpression } = useComponentCommon(props.config)
    return {
      handleClick,
      getExpression,
      computedStyle
    }
  },
  render () {
    return h(
      'div',
      {
        id: this.config.id,
        style: this.computedStyle,
        onClick: this.handleClick
      },
      ''
    )
  }
}
</script>

<style></style>
