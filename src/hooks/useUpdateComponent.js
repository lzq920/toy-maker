import BlocksImage from '@/widgets/Image'
import BlocksRect from '@/widgets/Rect'
import BlocksText from '@/widgets/Text'
import BlocksVideo from '@/widgets/Video'
import BlocksSingleText from '@/widgets/SingleText'
import BlocksMultipleText from '@/widgets/MultipleText'
import BlocksForm from '@/widgets/Form'
import BlocksChart from '@/widgets/Chart'

/**
 * @description 更新组件数据Hook，合并老数据
 * @returns {{mergeComponent: (function(*=): *)}}
 */
export default function useUpdateComponent () {
  const enums = {
    'blocks-text': (params) => new BlocksText(params),
    'blocks-rect': (params) => new BlocksRect(params),
    'blocks-image': (params) => new BlocksImage(params),
    'blocks-video': (params) => new BlocksVideo(params),
    'blocks-single-text': (params) => new BlocksSingleText(params),
    'blocks-multiple-text': (params) => new BlocksMultipleText(params),
    'blocks-form': (params) => new BlocksForm(params),
    'blocks-chart': (params) => new BlocksChart(params)
  }
  const mergeComponent = (params) => {
    return enums[params.componentName](params)
  }
  return {
    mergeComponent
  }
}
