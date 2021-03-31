import { isArray, mergeWith } from 'lodash'
import Blocks from './Block'

/**
 * @description 图表组件
 * @class BlocksChart
 */
export default class BlocksChart extends Blocks {
  constructor (config) {
    config = mergeWith(
      {
        componentName: 'blocks-chart',
        description: '图表组件',
        rect: {
          height: 200,
          width: 375,
          left: 0,
          top: 0
        },
        styles: {
          width: '100%',
          height: '100%'
        },
        animations: [],
        events: [],
        options: {}
      },
      config,
      function (objValue, srcValue) {
        if (isArray(objValue)) {
          return srcValue
        }
      }
    )
    super(config)
  }
}
