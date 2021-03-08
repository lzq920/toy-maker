<script>
import { h, inject } from 'vue'
import { transferStyleMode } from '../../../utils/index'
import useClickedEvents from '@/hooks/useClickedEvents'

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
      this.config.innerText
    )
  }
}
</script>

<style></style>
