<script>
import useComponentCommon from '@/hooks/useComponentCommon'
import { h } from 'vue'

export default {
  name: 'form-input-select',
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
    return () => h('select', {
      id: props.config.id,
      style: computedStyle(props.config),
      required: props.config.required,
      disabled: props.config.disabled,
      readonly: props.config.readonly,
      name: props.config.name,
      multiple: props.config.multiple,
      size: 1
    }, props.config.options.map(item => {
      return h('option', {
        value: item.value
      }, item.label)
    }))
  }
}
</script>
