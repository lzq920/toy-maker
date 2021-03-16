import { isArray, mergeWith } from 'lodash'
import Blocks from './Block'

/**
 * @description 文本组件
 * @class BlocksSingleText
 */
export default class BlocksSingleText extends Blocks {
  constructor (config) {
    config = mergeWith(
      {
        componentName: 'blocks-single-text',
        description: '文本组件',
        rect: {
          height: 50,
          width: 375,
          left: 0,
          top: 0
        },
        styles: {
          width: '100%',
          height: '100%',
          color: 'rgba(0,0,0,1)',
          fontSize: 12,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        },
        innerText: '单行文本组件',
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
