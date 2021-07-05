<script>
import useComponentCommon from '@/hooks/useComponentCommon'
import { h } from 'vue'

export default {
  name: 'form-input-tel',
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
      type: 'tel',
      required: props.config.required,
      disabled: props.config.disabled,
      readonly: props.config.readonly,
      name: props.config.name,
      maxlength: 11,
      placeholder: props.config.placeholder,
      pattern: '^1[3-9]\\d{9}'
    })
  }
}
</script>
