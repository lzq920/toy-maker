<script>
import { h } from 'vue'
import useComponentCommon from '@/hooks/useComponentCommon'

export default {
  name: 'blocks-video',
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
      getExpression,
      mode
    } = useComponentCommon(props.config)
    return {
      handleClick,
      mode,
      getExpression,
      computedStyle
    }
  },
  render () {
    return h('video', {
      id: this.config.id,
      poster: this.getExpression(this.config.poster),
      style: this.computedStyle,
      onClick: this.handleClick,
      controls: this.mode === 'mobile'
    }, [h('source', {
      src: this.config.src
    })])
  }
}
</script>

<style></style>
