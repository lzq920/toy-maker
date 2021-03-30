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
      if (!form.reportValidity()) {
        for (const formElement of form.elements) {
          formElement.setCustomValidity('')
          if (formElement.validity.valueMissing) {
            return formElement.setCustomValidity('该项不能为空')
          }
          if (formElement.validity.patternMismatch) {
            return formElement.setCustomValidity('该项格式不正确')
          }
        }
      } else {
        const formData = new FormData(form)
        const formObject = Array.from(formData).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value
          }),
          {}
        )
        console.log('收集到表单信息', formObject)
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
            },
            style: {
              width: '100%'
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
            placeholder: item.placeholder,
            style: {
              width: '100%'
            }
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
            placeholder: item.placeholder,
            style: {
              width: '100%'
            }
          })
          break
        case 'input-number':
          temp = h('input', {
            type: 'number',
            required: item.required,
            disabled: item.disabled,
            readonly: item.readonly,
            name: item.name,
            placeholder: item.placeholder,
            style: {
              width: '100%'
            }
          })
          break
        case 'input-email':
          temp = h('input', {
            type: 'email',
            required: item.required,
            disabled: item.disabled,
            readonly: item.readonly,
            name: item.name,
            placeholder: item.placeholder,
            style: {
              width: '100%'
            }
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
            placeholder: item.placeholder,
            style: {
              width: '100%'
            }
          })
          break
      }
      return temp
    })
    return h(
      'form',
      {
        id: this.config.id,
        style: Object.assign(this.computedStyle, {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        })
      },
      children
    )
  }
}
</script>

<style></style>
