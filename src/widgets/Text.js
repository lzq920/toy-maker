import { merge } from 'lodash'
import Blocks from './Block'
/**
 * @description 文本组件
 * @class BlocksText
 */
export default class BlocksText extends Blocks {
  constructor (config) {
    config = merge(
      {
        componentName: 'blocks-text',
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
          fontSize: 10
        },
        innerText: '文本组件'
      },
      config
    )
    super(config)
  }
}
