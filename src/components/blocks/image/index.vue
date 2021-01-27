<script>
import { h } from 'vue'
export default {
  name: 'blocks-image',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  render () {
    return h('img', {
      src: this.config.src
    })
  }
}
</script>

<style></style>
