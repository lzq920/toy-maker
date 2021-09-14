<template>
  <form :id="config.id" class="form-config" :style="computedStyle">
    <component :is="item.componentName" v-for="item in config.children" :key="item.id" :config="item"
               @on-submit="onSubmit"></component>
  </form>
</template>
<script>
import useComponentCommon from '@/hooks/useComponentCommon'
import { httpPost, Toast } from '@/utils'
import useConsole from '@/hooks/useConsole'
import { isArray, isString } from 'lodash'

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
        formData.append('pageId', window._pageId)
        const formMap = new Map()
        for (const [key, value] of formData) {
          if (formMap.has(key)) {
            const oldValue = formMap.get(key)
            if (isArray(oldValue)) {
              formMap.set(key, [...oldValue, value])
            } else if (isString(oldValue)) {
              formMap.set(key, [oldValue, value])
            }
          } else {
            formMap.set(key, value)
          }
        }
        const formObject = Object.fromEntries(formMap)
        if (mode === 'pc') {
          return logger.primary(JSON.stringify(formObject))
        } else if (location.href.includes('preview.html')) {
          return logger.primary(JSON.stringify(formObject))
        } else {
          try {
            const response = await httpPost('https://toy-maker-0gzrfa7132f7c204-1254002251.ap-shanghai.app.tcloudbase.com/submit', formObject)
            if (response && response.id) {
              Toast('提交成功')
            } else {
              Toast('提交失败')
            }
          } catch (e) {
            Toast(e.message)
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
