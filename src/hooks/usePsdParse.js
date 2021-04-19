import { ref } from 'vue'
import { useStore } from 'vuex'
import useUpdateComponent from '@/hooks/useUpdateComponent'
import useConsole from '@/hooks/useConsole'

const PSD = require('psd.js')

export default function usePsdParse () {
  const store = useStore()
  const { logger } = useConsole()
  const { mergeComponent } = useUpdateComponent()
  const blobData = ref('')
  const uploadFile = async (event) => {
    const file = event.target.files[0]
    event.value = ''
    blobData.value = window.URL.createObjectURL(file)
    await parsePsd()
    window.URL.revokeObjectURL(blobData.value)
  }
  const parsePsd = async () => {
    const psd = await PSD.fromURL(blobData.value)
    const descendantsList = psd.tree().descendants()
    logger.info(descendantsList)
    descendantsList.reverse()
    const psdSourceList = []
    for (let i = 0; i < descendantsList.length; i++) {
      if (descendantsList[i].isGroup()) continue
      if (!descendantsList[i].visible) continue
      try {
        const img = descendantsList[i].toPng()
        const { width, height, left, top } = descendantsList[i].export()
        psdSourceList.push({
          componentName: 'blocks-image',
          rect: {
            height: height,
            width: width,
            left: left,
            top: top
          },
          styles: {
            width: '100%',
            height: '100%',
            overflow: 'hidden'
          },
          events: [],
          src: img.src
        })
      } catch (e) {
      }
    }
    if (psdSourceList.length) {
      const vdrList = psdSourceList.map(item => {
        return mergeComponent(item)
      })
      await store.dispatch('editor/setAllItems', vdrList)
    }
  }
  return {
    uploadFile
  }
}
