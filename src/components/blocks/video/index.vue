<script>
import { h, inject } from 'vue'
import { transferStyleMode } from '../../../utils/index'
import useClickedEvents from '@/hooks/useClickedEvents'

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
    const { handleClick } = useClickedEvents(props.config.events, mode)
    return {
      handleClick,
      mode
    }
  },
  render () {
    return h('video', {
      poster: this.config.poster,
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
