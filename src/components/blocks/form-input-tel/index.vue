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
      computedStyle,
      getExpression
    } = useComponentCommon(props.config)
    return {
      computedStyle,
      getExpression
    }
  },
  render () {
    return h('input', {
      style: this.computedStyle,
      type: 'tel',
      required: this.config.required,
      disabled: this.config.disabled,
      readonly: this.config.readonly,
      name: this.config.name,
      maxlength: 11,
      placeholder: this.config.placeholder,
      pattern: '^1[3-9]\\d{9}'
    })
  }
}
</script>
