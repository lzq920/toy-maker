<script>
import { h, inject } from 'vue'
import { transferStyleMode } from '../../../utils/index'
import useClickedEvents from '@/hooks/useClickedEvents'
import useDataSource from '@/hooks/useDataSource'

export default {
  name: 'blocks-text',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  inject: ['mode'],
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
      this.isExpression(this.config.innerText) ? this.getExpression(this.config.innerText) : this.config.innerText
    )
  }
}
</script>

<style></style>
