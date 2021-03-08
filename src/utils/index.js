/**
 * @description 组件样式转换
 * @param {Object} component 组件数据
 * @param {Number} scale 缩放 pc=>1 mobile=>100
 * @param {Number} zoom 比例 pc=>1 mobile=>2
 * @param {String} unit 单位 pc=>px mobile=>rem
 * @returns 转换后的样式
 */
export function transferStyle (component, scale = 1, zoom = 1, unit = 'px') {
  const styleObj = {
    ...component.styles
  }
  const needUnitStr = [
    'width',
    'height',
    'top',
    'left',
    'bottom',
    'right',
    'minHeight',
    'minWidth',
    'maxHeight',
    'maxWidth',
    'paddingTop',
    'paddingLeft',
    'paddingRight',
    'paddingBottom',
    'marginTop',
    'marginLeft',
    'marginRight',
    'marginBottom',
    'borderWidth',
    'fontSize',
    'borderRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'letterSpacing',
    'lineHeight'
  ]
  const style = {}
  for (const key in styleObj) {
    if (needUnitStr.includes(key)) {
      style[key] = styleObj[key].toString().includes('%')
        ? styleObj[key]
        : (styleObj[key] * zoom) / scale + unit
    } else {
      style[key] = styleObj[key]
    }
  }
  return style
}
/**
 * @description 生成UUID
 */
export function generatorUUID () {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )
}
/**
 * @description 转换模式
 * @param {Object} component 组件数据
 * @param {String} mode pc or mobile
 */
export function transferStyleMode (component, mode = 'pc') {
  if (mode === 'pc') {
    return transferStyle(component, 1, 1, 'px')
  } else if (mode === 'mobile') {
    return transferStyle(component, 100, 2, 'rem')
  }
}

/**
 * @description 原生ajax封装GET请求
 * @param url {String} 请求地址
 */
export function httpGet (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'json'
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)
      } else {
        reject(xhr.statusText)
      }
    }
    xhr.onerror = function () {
      reject(xhr.statusText)
    }
    xhr.send()
  })
}

/**
 * @description 动画预览播放
 * @param $el dom元素
 * @param animations 动画列表
 * @returns {Promise<void>}
 */
export async function runAnimation ($el, animations = []) {
  const play = (animation) => new Promise(resolve => {
    $el.classList.add(animation, 'animated')
    const removeAnimation = () => {
      $el.removeEventListener('animationend', removeAnimation)
      $el.removeEventListener('animationcancel', removeAnimation)
      $el.classList.remove(animation, 'animated')
      resolve()
    }

    $el.addEventListener('animationend', removeAnimation)
    $el.addEventListener('animationcancel', removeAnimation)
  })

  for (let i = 0, len = animations.length; i < len; i++) {
    await play(animations[i])
  }
}
