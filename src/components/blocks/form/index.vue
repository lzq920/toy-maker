<template>
  <form :id="config.id" class="form-config">
    <component :is="item.componentName" v-for="item in config.children" :key="item.id" :config="item"
               @on-submit="onSubmit"></component>
  </form>
</template>
<script>
import useComponentCommon from '@/hooks/useComponentCommon'
import { httpPost } from '@/utils'
import useConsole from '@/hooks/useConsole'

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
    const { logger } = useConsole()
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
          return logger.primary(JSON.stringify(formObject))
        } else if (location.href.includes('preview.html')) {
          return logger.primary(JSON.stringify(formObject))
        } else {
          try {
            const response = await httpPost('', formObject)
            if (response.data.success) {
              alert('提交成功')
            } else {
              alert('提交失败')
            }
          } catch (e) {
            alert(e.message)
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
