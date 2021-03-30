<script>
import { h } from 'vue'
import useComponentCommon from '@/hooks/useComponentCommon'

export default {
  name: 'blocks-form',
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
    const onSubmit = (id) => {
      const form = document.querySelector(`#${id}`)
      for (let index = 0; index < form.elements.length; index++) {
        const element = form.elements[index]
        if (element.checkValidity()) {
          console.log('true')
        }
      }
    }
    return {
      getExpression,
      computedStyle,
      onSubmit
    }
  },
  render () {
    const children = this.config.configs.map((item) => {
      let temp = ''
      switch (item.fieldset) {
        case 'input-submit':
          temp = h('button', {
            onClick: event => {
              event.preventDefault()
              event.stopPropagation()
              this.onSubmit(this.config.id)
            }
          }, '提交')
          break
        case 'input-text':
          temp = h('input', {
            type: 'text',
            required: item.required,
            disabled: item.disabled,
            readonly: item.readonly,
            name: item.name,
            maxlength: item.maxlength,
            minlength: item.maxlength,
            placeholder: item.placeholder
          })
          break
        case 'input-tel':
          temp = h('input', {
            type: 'tel',
            required: item.required,
            disabled: item.disabled,
            readonly: item.readonly,
            name: item.name,
            maxlength: 11,
            pattern: '^1[3-9]\\d{9}',
            placeholder: item.placeholder
          })
          break
        case 'input-number':
          temp = h('input', {
            type: 'number',
            required: item.required,
            disabled: item.disabled,
            readonly: item.readonly,
            name: item.name,
            placeholder: item.placeholder
          })
          break
        case 'input-email':
          temp = h('input', {
            type: 'email',
            required: item.required,
            disabled: item.disabled,
            readonly: item.readonly,
            name: item.name,
            pattern: '.+@foobar.com',
            placeholder: item.placeholder
          })
          break
        case 'input-textarea':
          temp = h('textarea', {
            required: item.required,
            disabled: item.disabled,
            readonly: item.readonly,
            minlength: item.minlength,
            maxlength: item.maxlength,
            name: item.name,
            placeholder: item.placeholder
          })
          break
      }
      return temp
    })
    return h(
      'form',
      {
        id: this.config.id,
        style: this.computedStyle
      },
      children
    )
  }
}
</script>

<style></style>
