import { get } from 'lodash'

/**
 * @description 获取数据源Hook
 * @param source Object 数据源
 * @returns {{getExpression: (function(*): *), isExpression: (function(*=): boolean)}}
 */
export default function useDataSource (source) {
  /**
   * @description 判断是否是插值表达式
   * @param value String
   * @returns {boolean}
   */
  const isExpression = (value) => {
    return /^#\{\{.*\}\}$/.test(value)
  }
  /**
   * @description 获取插值表达式结果
   * @param value String
   * @returns {string}
   */
  const getExpression = (value) => {
    const path = value.slice(3, -2)
    return get(source, path, '')
  }
  return {
    isExpression,
    getExpression
  }
}
