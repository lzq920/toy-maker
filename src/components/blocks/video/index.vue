<script>
import { h, inject } from 'vue'
import { transferStyleMode } from '../../../utils/index'
import useClickedEvents from '@/hooks/useClickedEvents'
import useDataSource from '@/hooks/useDataSource'

export default {
  name: 'blocks-video',
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
      mode,
      isExpression,
      getExpression
    }
  },
  render () {
    return h('video', {
      id: this.config.id,
      poster: this.isExpression(this.config.poster) ? this.getExpression(this.config.poster) : this.config.poster,
      style: transferStyleMode(this.config, this.mode),
      onClick: this.handleClick,
      controls: this.mode === 'mobile'
    }, [h('source', {
      src: this.config.src
    })])
  }
}
</script>

<style></style>
