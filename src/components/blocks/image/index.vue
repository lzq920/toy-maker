<script>
import { h, inject } from 'vue'
import { transferStyleMode } from '../../../utils/index'
import useClickedEvents from '@/hooks/useClickedEvents'
import useDataSource from '@/hooks/useDataSource'

export default {
  name: 'blocks-image',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const mode = inject('mode')
    const dataSource = inject('dataSource')
    const { handleClick } = useClickedEvents(props.config, mode)
    const { isExpression, getExpression } = useDataSource(dataSource)
    return {
      dataSource,
      handleClick,
      isExpression,
      getExpression
    }
  },
  render () {
    return h('img', {
      id: this.config.id,
      src: this.isExpression(this.config.src) ? this.getExpression(this.config.src) : this.config.src,
      style: transferStyleMode(this.config, this.mode),
      onClick: this.handleClick
    })
  }
}
</script>

<style></style>
