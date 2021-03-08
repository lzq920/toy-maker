<script>
import { transferStyleMode } from '../../../utils/index'
import { h, inject } from 'vue'
import useClickedEvents from '@/hooks/useClickedEvents'
export default {
  name: 'blocks-rect',
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
