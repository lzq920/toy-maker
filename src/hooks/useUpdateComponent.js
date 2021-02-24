import Image from '../widgets/Image'
import Rect from '../widgets/Rect'
import Text from '../widgets/Text'

/**
 * @description 更新组件数据Hook
 * @returns {{mergeComponent: (function(*=): null)}}
 */
export default function useUpdateComponent () {
  const mergeComponent = (params) => {
    let block = null
    switch (params.componentName) {
      case 'blocks-text':
        block = new Text(params)
        break
      case 'blocks-rect':
        block = new Rect(params)
        break
      case 'blocks-image':
        block = new Image(params)
        break
    }
    return block
  }
  return {
    mergeComponent
  }
}
