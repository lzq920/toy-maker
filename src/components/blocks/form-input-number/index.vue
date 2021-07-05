<script>
import useComponentCommon from '@/hooks/useComponentCommon'
import { h } from 'vue'

export default {
  name: 'form-input-number',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const {
      computedStyle
    } = useComponentCommon(props.config)
    return () => h('input', {
      id: props.config.id,
      style: computedStyle(props.config),
      type: 'number',
      required: props.config.required,
      disabled: props.config.disabled,
      readonly: props.config.readonly,
      name: props.config.name,
      max: props.config.max,
      min: props.config.min,
      placeholder: props.config.placeholder
    })
  }
}
</script>
