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
      computedStyle,
      getExpression
    } = useComponentCommon(props.config)
    return {
      computedStyle,
      getExpression
    }
  },
  render () {
    return h('textarea', {
      style: this.computedStyle,
      required: this.config.required,
      disabled: this.config.disabled,
      readonly: this.config.readonly,
      name: this.config.name,
      maxlength: this.config.maxlength,
      placeholder: this.config.placeholder
    })
  }
}
</script>
