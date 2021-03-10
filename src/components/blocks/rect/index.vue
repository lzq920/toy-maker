<script>
import { transferStyleMode } from '../../../utils/index'
import { h, inject } from 'vue'
import useClickedEvents from '@/hooks/useClickedEvents'
import useDataSource from '@/hooks/useDataSource'

export default {
  name: 'blocks-rect',
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
    return h(
      'div',
      {
        id: this.config.id,
        style: transferStyleMode(this.config, this.mode),
        onClick: this.handleClick
      },
      ''
    )
  }
}
</script>

<style></style>
