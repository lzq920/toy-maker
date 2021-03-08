import { isArray, mergeWith } from 'lodash'
import Blocks from './Block'
/**
 * @description 图片组件
 * @class BlocksImage
 */
export default class BlocksImage extends Blocks {
  constructor (config) {
    config = mergeWith(
      {
        componentName: 'blocks-image',
        description: '图片组件',
        rect: {
          height: 200,
          width: 375,
          left: 0,
          top: 0
        },
        styles: {
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        },
        events: [],
        animations: [],
        src: ''
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
