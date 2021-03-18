import { generatorUUID } from '@/utils'
import { isArray, mergeWith } from 'lodash'

/**
 * @description 公共组件
 * @class Blocks
 */
export default class Blocks {
  constructor (config) {
    config = mergeWith(
      {
        id: `blocks-${generatorUUID()}`
      },
      config,
      function (objValue, srcValue) {
        if (isArray(objValue)) {
          return srcValue
        }
      }
    )
    return config
  }
}
