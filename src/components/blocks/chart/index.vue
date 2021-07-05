<script>
import { computed, h, onMounted, ref, toRaw, watch } from 'vue'
import useComponentCommon from '@/hooks/useComponentCommon'
import * as echarts from 'echarts'
import { debounce } from 'lodash'

export default {
  name: 'blocks-chart',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  inject: ['mode'],
  setup (props) {
    const {
      computedStyle
    } = useComponentCommon(props.config)
    const chartRef = ref('')
    const rootRef = ref('')
    const options = computed(() => {
      return props.config.options
    })
    const rect = computed(() => {
      return props.config.rect
    })
    const updateOptions = async () => {
      chartRef.value.setOption(toRaw(options.value))
    }
    watch(options, async () => {
      await updateOptions()
    }, {
      deep: true
    })
    watch(rect, debounce(() => {
      chartRef.value.clear()
      chartRef.value.resize()
      updateOptions()
    }, 500), {
      deep: true
    })
    onMounted(async () => {
      chartRef.value = echarts.init(rootRef.value)
      await updateOptions()
    })
    return () => h('div', {
      id: props.config.id,
      style: computedStyle(props.config),
      ref: rootRef
    })
  }
}
</script>

<style></style>
