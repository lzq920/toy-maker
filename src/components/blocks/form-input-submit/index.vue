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
      computedStyle,
      getExpression
    } = useComponentCommon(props.config)
    return {
      computedStyle,
      getExpression
    }
  },
  render () {
    return h('button', {
      style: this.computedStyle,
      onClick: event => {
        event.preventDefault()
        event.stopPropagation()
        this.$emit('on-submit')
      }
    }, '提交')
  }
}
</script>
