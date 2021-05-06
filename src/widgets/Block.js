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
        id: generatorUUID(),
        styles: {
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          borderTopWidth: 0,
          borderRightWidth: 0,
          borderBottomWidth: 0,
          borderLeftWidth: 0,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0
        }
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
