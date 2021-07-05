<template>
    <el-form :data="styles" label-width="80px">
      <el-form-item label="字号" v-if="hasKey('fontSize')">
        <el-input v-model.number="styles.fontSize" @change="onChange"></el-input>
      </el-form-item>
      <el-form-item label="背景色" v-if="hasKey('backgroundColor')">
        <el-color-picker v-model.number="styles.backgroundColor" @change="onChange"></el-color-picker>
      </el-form-item>
      <el-form-item label="字体颜色" v-if="hasKey('color')">
        <el-color-picker v-model.number="styles.color" @change="onChange"></el-color-picker>
      </el-form-item>
    </el-form>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { has } from 'lodash'

export default {
  name: 'style-setting',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const styles = computed({
      get: () => {
        return props.config.styles
      },
      set: () => {

      }
    })
    const onChange = () => {
      onUpdate(styles.value)
    }
    const onUpdate = async (value) => {
      await store.dispatch('editor/updateItem', {
        id: props.config.id,
        path: 'styles',
        value: value
      })
    }
    const hasKey = (key) => has(styles.value, key)
    return {
      styles,
      onChange,
      hasKey
    }
  }
}
</script>

<style scoped>

</style>
