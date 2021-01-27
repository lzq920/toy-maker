<script>
import { h } from 'vue'
export default {
  name: 'blocks-text',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  render () {
    return h('div', {}, this.config.innerText)
  }
}
</script>

<style></style>
