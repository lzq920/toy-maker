<script>
import { transferStyleMode } from '../../../utils/index'
import { h } from 'vue'
export default {
  name: 'blocks-rect',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  inject: ['mode'],
  render () {
    return h(
      'div',
      {
        style: transferStyleMode(this.config, this.mode)
      },
      ''
    )
  }
}
</script>

<style></style>
