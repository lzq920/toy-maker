<script>
import useComponentCommon from '@/hooks/useComponentCommon'
import { h } from 'vue'

export default {
  name: 'form-input-textarea',
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
    return () => h('textarea', {
      id: props.config.id,
      style: computedStyle(props.config),
      required: props.config.required,
      disabled: props.config.disabled,
      readonly: props.config.readonly,
      name: props.config.name,
      maxlength: props.config.maxlength,
      placeholder: props.config.placeholder
    })
  }
}
</script>
