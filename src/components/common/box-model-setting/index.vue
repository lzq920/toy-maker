<template>
  <div class="w-full flex items-center flex-col">
    <div class="box box-margin border font-mono text-gray-500" @click.self="handleClickType('margin')">
      margin
      <div class="box box-border border font-mono text-gray-500" @click.self="handleClickType('border')">
        border
        <div class="box box-padding border font-mono text-gray-500" @click.self="handleClickType('padding')">
          padding
          <div class="box box-content border font-mono text-gray-500" @click.self="handleClickType('')">
            {{ config.rect.width }}*{{ config.rect.height }}
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4" v-if="checkedType">
      <el-checkbox-group v-model="checkedArrow">
        <el-checkbox v-for="item in enums" :key="item" :label="item">{{ enumsString[item] }}</el-checkbox>
      </el-checkbox-group>
      <div class="flex flex-col items-center gap-2 mt-2">
        <el-input
          v-if="checkedArrow.includes('Top')"
          v-model="checkedValue[0]" @change="handleChange">
          <template #prefix>
            <span>{{ enumsString['Top'] }}</span>
          </template>
          <template #suffix>
            <span>px</span>
          </template>
        </el-input>
        <el-input
          v-if="checkedArrow.includes('Right')"
          v-model="checkedValue[1]" @change="handleChange">
          <template #prefix>
            <span>{{ enumsString['Right'] }}</span>
          </template>
          <template #suffix>
            <span>px</span>
          </template>
        </el-input>
        <el-input
          v-if="checkedArrow.includes('Bottom')"
          v-model="checkedValue[2]" @change="handleChange">
          <template #prefix>
            <span>{{ enumsString['Bottom'] }}</span>
          </template>
          <template #suffix>
            <span>px</span>
          </template>
        </el-input>
        <el-input
          v-if="checkedArrow.includes('Left')"
          v-model="checkedValue[3]" @change="handleChange">
          <template #prefix>
            <span>{{ enumsString['Left'] }}</span>
          </template>
          <template #suffix>
            <span>px</span>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'box-model-setting',
  props: {
    config: {
      required: true,
      type: Object
    }
  },
  setup (props) {
    const store = useStore()
    const styles = computed(() => {
      return props.config.styles
    })
    // 遵循上右下左原则
    const enums = reactive(['Top', 'Right', 'Bottom', 'Left'])
    const enumsString = reactive({
      Top: '上',
      Right: '右',
      Bottom: '下',
      Left: '左'
    })
    const checkedType = ref('')
    const checkedArrow = ref([])
    const checkedValue = ref([])
    const getCheckedValue = (val) => {
      const values = []
      switch (val) {
        case 'margin':
          enums.forEach(item => {
            values.push(styles.value[`margin${item}`])
          })
          break
        case 'border':
          enums.forEach(item => {
            values.push(styles.value[`border${item}Width`])
          })
          break
        case 'padding':
          enums.forEach(item => {
            values.push(styles.value[`padding${item}`])
          })
          break
        default:
          break
      }
      return values
    }
    const handleClickType = (val) => {
      checkedType.value = val
      checkedArrow.value = []
      checkedValue.value = getCheckedValue(val)
    }
    const handleChange = async () => {
      const newStyle = Object.assign({}, styles.value)
      switch (checkedType.value) {
        case 'margin':
          enums.forEach((item, i) => {
            newStyle[`margin${item}`] = Number(checkedValue.value[i])
          })
          break
        case 'border':
          enums.forEach((item, i) => {
            newStyle[`border${item}Width`] = Number(checkedValue.value[i])
          })
          break
        case 'padding':
          enums.forEach((item, i) => {
            newStyle[`padding${item}`] = Number(checkedValue.value[i])
          })
          break
        default:
          break
      }
      await store.dispatch('editor/updateItem', {
        id: props.config.id,
        path: 'styles',
        value: newStyle
      })
    }
    return {
      styles,
      enums,
      enumsString,
      checkedType,
      checkedArrow,
      checkedValue,
      handleClickType,
      handleChange
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  display: inline-block;
  text-align: center;
  line-height: 20px;
  cursor: pointer;
}

.box-margin {
  width: 200px;
  height: 200px;

  .box-border {
    width: 160px;
    height: 160px;

    .box-padding {
      width: 120px;
      height: 120px;

      .box-content {
        width: 80px;
        height: 80px;
        line-height: 80px;
      }
    }
  }
}

</style>
