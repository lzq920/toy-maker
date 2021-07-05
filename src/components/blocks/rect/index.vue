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
    const {
      handleClick,
      computedStyle
    } = useComponentCommon(props.config)
    return () => h(
      'div',
      {
        id: props.config.id,
        style: computedStyle(props.config),
        onClick: handleClick
      }
    )
  }
}
</script>

<style></style>
