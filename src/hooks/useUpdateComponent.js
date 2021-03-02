import BlocksImage from '../widgets/Image'
import BlocksRect from '../widgets/Rect'
import BlocksText from '../widgets/Text'
import BlocksVideo from '../widgets/Video'

/**
 * @description 更新组件数据Hook
 * @returns {{mergeComponent: (function(*=): null)}}
 */
export default function useUpdateComponent () {
  const mergeComponent = (params) => {
    let block = null
    switch (params.componentName) {
      case 'blocks-text':
        block = new BlocksText(params)
        break
      case 'blocks-rect':
        block = new BlocksRect(params)
        break
      case 'blocks-image':
        block = new BlocksImage(params)
        break
      case 'blocks-video':
        block = new BlocksVideo(params)
    }
    return block
  }
  return {
    mergeComponent
  }
}
