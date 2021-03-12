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
    return {
      handleClick,
      getExpression,
      computedStyle
    }
  },
  render () {
    return h('img', {
      id: this.config.id,
      src: this.getExpression(this.config.src),
      style: this.computedStyle,
      onClick: this.handleClick
    })
  }
}
</script>

<style></style>
