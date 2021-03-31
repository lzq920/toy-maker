<script>
import useComponentCommon from '@/hooks/useComponentCommon'
import { h } from 'vue'

export default {
  name: 'form-input-text',
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
      type: 'text',
      required: this.config.required,
      disabled: this.config.disabled,
      readonly: this.config.readonly,
      name: this.config.name,
      maxlength: this.config.maxlength,
      minlength: this.config.minlength,
      placeholder: this.config.placeholder
    })
  }
}
</script>
