/**
 * @description 组件样式转换
 * @param {Object} component 组件数据
 * @param {Number} scale 缩放 pc=>1 mobile=>100
 * @param {Number} zoom 比例 pc=>1 mobile=>2
 * @param {String} unit 单位 pc=>px mobile=>rem
 * @returns 转换后的样式
 */
import useConsole from '@/hooks/useConsole'
import confetti from 'canvas-confetti'

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
    'borderRadius',
    'letterSpacing',
    'borderLeftWidth',
    'borderRightWidth',
    'borderTopWidth',
    'borderBottomWidth',
    'lineHeight'
  ]
  const noUnitStr = ['opacity', 'fontWeight']
  const style = {}
  for (const key in styleObj) {
    if (needUnitStr.includes(key)) {
      if (typeof styleObj[key] === 'string' && styleObj[key].includes('%')) {
        style[key] = styleObj[key]
      } else {
        style[key] = parseFloat(Number(styleObj[key]) * zoom / scale) + unit
      }
    } else if (noUnitStr.includes(key)) {
      style[key] = parseFloat(styleObj[key])
    } else {
      style[key] = styleObj[key]
    }
  }
  return style
}

/**
 * @description 生成组件UUID
 */
export function generatorUUID () {
  return 'blocks-' + ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
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
 * @description 原生Ajax封装POST请求
 * @param url {String} 请求地址
 * @param data {Object} 请求参数
 * @returns {Promise<unknown>}
 */
export function httpPost (url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url, true)
    xhr.responseType = 'json'
    xhr.setRequestHeader('Content-Type', 'application/json')
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
    xhr.send(JSON.stringify(data))
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

/**
 * @description 获取远程地址文件流
 * @param url
 * @param responseType
 * @returns {Promise<unknown>}
 */
export function loadFile (url, responseType = 'blob') {
  const { logger } = useConsole()
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', `${url}?v=${new Date().getTime()}`)
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      }
    }
    xhr.onerror = () => {
      reject(new Error('请求出错'))
    }
    xhr.onprogress = (event) => {
      logger.primary(`Received ${event.loaded} of ${event.total}`)
    }
    xhr.responseType = responseType
    xhr.send()
  })
}

/**
 * @description 生成烟花
 */
export function fire () {
  const myCanvas = document.createElement('canvas')
  myCanvas.style.position = 'fixed'
  myCanvas.style.left = '0px'
  myCanvas.style.top = '0px'
  myCanvas.style.width = '100vw'
  myCanvas.style.height = '100vh'
  document.body.appendChild(myCanvas)
  const myConfetti = confetti.create(myCanvas, { resize: true })
  const randomInRange = (min, max) => {
    return Math.random() * (max - min) + min
  }
  myConfetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(100, 300),
    origin: { y: 0.8 }
  }).then(() => {
    myConfetti.reset()
    document.body.removeChild(myCanvas)
  })
}
