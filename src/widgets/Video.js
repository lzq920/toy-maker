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
