import { mergeWith, isArray } from 'lodash'
import Blocks from './Block'

/**
 * @description 动画组件
 * @class BlocksLottie
 */
export default class BlocksLottie extends Blocks {
  constructor (config) {
    config = mergeWith(
      {
        componentName: 'blocks-lottie',
        description: '动画组件',
        rect: {
          height: 375,
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
        lottieConfig: {}
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
