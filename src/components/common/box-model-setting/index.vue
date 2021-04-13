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
    watch(props.config.styles, (val) => {
      style = merge(style, val)
    }, {
      deep: true,
      immediate: true
    })
    return { }
  }
}
</script>

<style lang="scss" scoped>

</style>
