import BlocksImage from '@/widgets/Image'
import BlocksRect from '@/widgets/Rect'
import BlocksText from '@/widgets/Text'
import BlocksVideo from '@/widgets/Video'
import BlocksSingleText from '@/widgets/SingleText'
import BlocksMultipleText from '@/widgets/MultipleText'
import BlocksForm from '@/widgets/Form'
import BlocksChart from '@/widgets/Chart'

/**
 * @description 更新组件数据Hook
 * @returns {{mergeComponent: (function(*=): BlocksText|BlocksRect|BlocksImage|BlocksVideo|BlocksSingleText|BlocksMultipleText)}}
 */
export default function useUpdateComponent () {
  const mergeComponent = (params) => {
    let block
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
        break
      case 'blocks-single-text':
        block = new BlocksSingleText(params)
        break
      case 'blocks-multiple-text':
        block = new BlocksMultipleText(params)
        break
      case 'blocks-form':
        block = new BlocksForm(params)
        break
      case 'blocks-chart':
        block = new BlocksChart(params)
        break
      default:
        console.error('没有找到需要更新的组件')
        block = params
        break
    }
    return block
  }
  return {
    mergeComponent
  }
}
