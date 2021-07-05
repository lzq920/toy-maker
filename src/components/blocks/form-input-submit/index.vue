<script>
import useComponentCommon from '@/hooks/useComponentCommon'
import { h } from 'vue'

export default {
  name: 'form-input-submit',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props, { emit }) {
    const {
      computedStyle
    } = useComponentCommon(props.config)
    return () => h('button', {
      style: computedStyle(props.config),
      id: props.config.id,
      onClick: event => {
        event.preventDefault()
        event.stopPropagation()
        emit('on-submit')
      }
    }, props.config.innerText)
  }
}
</script>
