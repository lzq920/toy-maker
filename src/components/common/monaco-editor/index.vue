<template>
  <div id="monaco-editor"></div>
</template>

<script>
import * as monaco from 'monaco-editor'
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useStore } from 'vuex'
import { isPlainObject } from 'lodash'

export default {
  name: 'monaco-editor',
  setup () {
    let editorInstance
    const store = useStore()
    const code = computed(() => {
      return store.state.editor.dataSource
    })
    onMounted(() => {
      editorInstance = monaco.editor.create(document.querySelector('#monaco-editor'), {
        value: '',
        language: 'json',
        theme: 'vs-dark',
        formatOnPaste: true,
        fontSize: 18,
        automaticLayout: true
      })
      editorInstance.setValue(`${JSON.stringify(code.value)}`)
      editorInstance.onDidChangeModelContent(() => {
        try {
          const result = JSON.parse(editorInstance.getValue())
          if (isPlainObject(result)) {
            store.dispatch('editor/setDataSource', result)
          }
        } catch (e) {
          console.log('json format error')
        }
      })
    })
    onBeforeUnmount(() => {
      editorInstance.dispose()
    })
    return { code }
  }
}
</script>

<style scoped>

</style>
