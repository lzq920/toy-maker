<script>
import useComponentCommon from '@/hooks/useComponentCommon'
import { h } from 'vue'

export default {
  name: 'form-input-email',
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
      type: 'email',
      style: computedStyle(props.config),
      required: props.config.required,
      disabled: props.config.disabled,
      readonly: props.config.readonly,
      name: props.config.name,
      placeholder: props.config.placeholder
    })
  }
}
</script>
