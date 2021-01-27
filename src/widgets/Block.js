import { generatorUUID } from '../utils'
import { merge } from 'lodash'
/**
 * @description 公共组件
 * @class Blocks
 */
export default class Blocks {
  constructor (config) {
    config = merge(
      {
        id: `blocks-${generatorUUID()}`
      },
      config
    )
    return config
  }
}
