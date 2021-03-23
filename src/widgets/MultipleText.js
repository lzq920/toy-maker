import { isArray, mergeWith } from 'lodash'
import Blocks from './Block'

/**
 * @description 文本组件
 * @class BlocksMultipleText
 */
export default class BlocksMultipleText extends Blocks {
  constructor (config) {
    config = mergeWith(
      {
        componentName: 'blocks-multiple-text',
        description: '多行文本组件',
        rect: {
          height: 50,
          width: 375,
          left: 0,
          top: 0
        },
        styles: {
          color: 'rgba(0,0,0,1)',
          fontSize: 12
        },
        lineClamp: 2,
        innerText: '多行文本组件',
        animations: [],
        events: []
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
