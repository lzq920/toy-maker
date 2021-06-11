import { isArray, mergeWith } from 'lodash'
import Blocks from './Block'

/**
 * @description 音频组件
 * @class BlocksAudio
 */
export default class BlocksAudio extends Blocks {
  constructor (config) {
    config = mergeWith(
      {
        componentName: 'blocks-audio',
        description: '音频组件',
        rect: {
          height: 50,
          width: 50,
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
