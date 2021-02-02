import { merge } from 'lodash'
import Blocks from './Block'
/**
 * @description 矩形组件
 * @class BlocksRect
 */
export default class BlocksRect extends Blocks {
  constructor (config) {
    config = merge(
      {
        componentName: 'blocks-rect',
        rect: {
          height: 50,
          width: 375,
          left: 0,
          top: 0
        },
        styles: {
          width: '100%',
          height: '100%'
        }
      },
      config
    )
    super(config)
  }
}
