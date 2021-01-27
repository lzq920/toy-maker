import { merge } from 'lodash'
import Blocks from './Block'
/**
 * @description 图片组件
 * @class BlocksImage
 */
export default class BlocksImage extends Blocks {
  constructor (config) {
    config = merge(
      {
        componentName: 'blocks-image',
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
        src: ''
      },
      config
    )
    super(config)
  }
}
