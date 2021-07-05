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
    return () => h('video', {
      id: props.config.id,
      poster: getExpression(props.config.poster),
      style: computedStyle(props.config),
      onClick: handleClick,
      controls: mode === 'mobile'
    }, [h('source', {
      src: props.config.src
    })])
  }
}
</script>

<style></style>
