<script>
import { computed, h, onBeforeUnmount, onMounted, ref, toRaw, watch } from 'vue'
import useComponentCommon from '@/hooks/useComponentCommon'
import * as echarts from 'echarts'

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
    const updateOptions = async () => {
      chartRef.value.setOption(toRaw(options.value))
    }
    watch(options, () => {
      updateOptions()
    }, {
      deep: true
    })
    onMounted(async () => {
      chartRef.value = echarts.init(rootRef.value)
      await updateOptions()
      window.addEventListener('resize', updateOptions)
    })
    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateOptions)
    })
    return {
      computedStyle,
      options,
      rootRef
    }
  },
  render () {
    return h('div', {
      id: this.config.id,
      style: this.computedStyle,
      ref: 'rootRef'
    })
  }
}
</script>

<style></style>
