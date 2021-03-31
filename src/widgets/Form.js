import { isArray, mergeWith } from 'lodash'
import Blocks from './Block'

/**
 * @description 表单组件
 * @class BlocksForm
 */
export default class BlocksForm extends Blocks {
  constructor (config) {
    config = mergeWith(
      {
        componentName: 'blocks-form',
        description: '表单组件',
        rect: {
          height: 200,
          width: 375,
          left: 0,
          top: 0
        },
        styles: {
          width: '100%',
          height: '100%'
        },
        animations: [],
        events: [],
        children: []
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
