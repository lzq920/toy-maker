<template>
  <div></div>
</template>

<script>
import { reactive, watch } from 'vue'
import { merge } from 'lodash'

export default {
  name: 'box-model-setting',
  props: {
    config: {
      required: true,
      type: Object
    }
  },
  setup (props) {
    let style = reactive({
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 0
    })
    let setting = reactive({
      text: '',
      type: ''
    })
    const statusLeft = reactive({
      show: false,
      value: ''
    })
    const statusRight = reactive({
      show: false,
      value: ''
    })
    const statusTop = reactive({
      show: false,
      value: ''
    })
    const statusBottom = reactive({
      show: false,
      value: ''
    })
    const restStatus = () => {
      statusLeft.show = false
      statusRight.show = false
      statusBottom.show = false
      statusTop.show = false
    }
    const handleClick = (type) => {
      const obj = {
        1: '外边距',
        2: '边框',
        3: '内边距'
      }
      restStatus()
      if (type !== 0) {
        setting = {
          type: type,
          text: obj[type]
        }
      } else {
        setting = {
          type: false,
          text: ''
        }
      }
    }
    const handleChecked = (type) => {
      status`${type}`.value = getValue(type)
    }
    const getValue = (arrow) => {
      let val = ''
      switch (setting.type) {
        case 1:
          val = style[`margin${arrow}`]
          break
        case 2:
          val = style[`border${arrow}Width`]
          break
        case 3:
          val = style[`padding${arrow}`]
          break
        default:
          val = ''
          break
      }
      return val
    }
    const handleChange = (type) => {
      switch (setting.type) {
        case 1:
          style[`margin${type}`] = Number(status`${type}`.value)
          break
        case 2:
          style[`border${type}Width`] = Number(`status${type}`.value)
          break
        case 3:
          style[`padding${type}`] = Number(status`${type}`.value)
          break
      }
    }
    watch(props.config.styles, (val) => {
      style = merge(style, val)
    }, {
      deep: true,
      immediate: true
    })
    return { handleClick, handleChange, handleChecked }
  }
}
</script>

<style lang="scss" scoped>

</style>
