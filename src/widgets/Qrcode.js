import { isArray, mergeWith } from 'lodash'
import Blocks from './Block'
/**
 * @description 二维码组件
 * @class BlocksQrCode
 */
export default class BlocksQrCode extends Blocks {
  constructor (config) {
    config = mergeWith(
      {
        componentName: 'blocks-qrcode',
        description: '二维码组件',
        rect: {
          height: 200,
          width: 200,
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
        text: ''
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
