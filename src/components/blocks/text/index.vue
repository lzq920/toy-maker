<script>
import { h } from 'vue'
import useComponentCommon from '@/hooks/useComponentCommon'

export default {
  name: 'blocks-text',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  inject: ['mode'],
  setup (props) {
    const { handleClick, computedStyle, getExpression } = useComponentCommon(props.config)
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
        style: this.computedStyle,
        onClick: this.handleClick
      },
      this.getExpression(this.config.innerText)
    )
  }
}
</script>

<style></style>
