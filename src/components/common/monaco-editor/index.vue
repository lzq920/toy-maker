<template>
  <div id="monaco-editor"></div>
</template>

<script>
import * as monaco from 'monaco-editor'
import { onBeforeUnmount, onMounted } from 'vue'

export default {
  name: 'monaco-editor',
  props: {
    code: {
      type: String,
      required: true
    }
  },
  setup (props, { emit }) {
    let editorInstance
    onMounted(() => {
      editorInstance = monaco.editor.create(document.querySelector('#monaco-editor'), {
        value: '',
        language: 'json',
        theme: 'vs-dark',
        formatOnPaste: true,
        fontSize: 18,
        automaticLayout: true
      })
      editorInstance.setValue(props.code)
      editorInstance.onDidChangeModelContent(() => {
        emit('change', editorInstance.getValue())
      })
    })
    onBeforeUnmount(() => {
      editorInstance.dispose()
    })
    return {}
  }
}
</script>

<style scoped>

</style>
