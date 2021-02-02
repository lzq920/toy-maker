<script>
import { h } from 'vue'
import { transferStyleMode } from '../../../utils/index'
export default {
  name: 'blocks-image',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  inject: ['mode'],
  render () {
    return h('img', {
      src: this.config.src,
      style: transferStyleMode(this.config, this.mode)
    })
  }
}
</script>

<style></style>
