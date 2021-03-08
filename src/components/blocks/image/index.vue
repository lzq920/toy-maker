<script>
import { h, inject } from 'vue'
import { transferStyleMode } from '../../../utils/index'
import useClickedEvents from '@/hooks/useClickedEvents'

export default {
  name: 'blocks-image',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  inject: ['mode'],
  setup (props) {
    const mode = inject('mode')
    const { handleClick } = useClickedEvents(props.config, mode)
    return {
      handleClick
    }
  },
  render () {
    return h('img', {
      id: this.config.id,
      src: this.config.src,
      style: transferStyleMode(this.config, this.mode),
      onClick: this.handleClick
    })
  }
}
</script>

<style></style>
