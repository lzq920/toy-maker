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
      type: 'email',
      required: this.config.required,
      disabled: this.config.disabled,
      readonly: this.config.readonly,
      name: this.config.name,
      placeholder: this.config.placeholder
    })
  }
}
</script>
