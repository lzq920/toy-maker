<template>
  <form :id="config.id" class="form-config">
    <component :is="item.componentName" v-for="item in config.children" :key="item.id" :config="item"
               @on-submit="onSubmit"></component>
  </form>
</template>
<script>
import useComponentCommon from '@/hooks/useComponentCommon'
import { httpPost } from '@/utils'

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
      getExpression,
      mode
    } = useComponentCommon(props.config)
    const onSubmit = async () => {
      const form = document.querySelector(`#${props.config.id}`)
      if (!form.reportValidity()) {
        return false
      } else {
        const formData = new FormData(form)
        const formObject = Array.from(formData).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value
          }),
          {}
        )
        if (mode.value === 'pc') {
          return console.log('收集到表单信息', formObject)
        } else if (location.href.includes('preview.html')) {
          return console.log('收集到表单信息', formObject)
        } else {
          try {
            const response = await httpPost('', formObject)
            console.log(response)
          } catch (e) {
            console.log(e)
          }
        }
      }
    }
    return {
      getExpression,
      computedStyle,
      onSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
.form-config {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
