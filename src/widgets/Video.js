import { isArray, mergeWith } from 'lodash'
import Blocks from './Block'

/**
 * @description 视频组件
 * @class BlocksVideo
 */
export default class BlocksVideo extends Blocks {
  constructor (config) {
    config = mergeWith(
      {
        componentName: 'blocks-video',
        description: '视频组件',
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
        src: '',
        poster: ''
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
