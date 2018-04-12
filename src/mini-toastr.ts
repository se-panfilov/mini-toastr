import { Config } from './Config'
import { MiniToastr } from './MiniToastr'
import { DEFAULT_TIMEOUT, EMPTY_STRING, LIB_NAME } from './common.const'
import { MessageClass } from './MessageClass'
import { StyleClass } from './StyleClass'
import { MessageType } from './MessageType'
import { MiniToastrError } from './mini-toastr-error.class'

export function fadeOut (element: HTMLElement, cb?: Function): void {
  if (element.style.opacity && element.style.opacity > 0.05) {
    element.style.opacity = element.style.opacity - 0.05
  } else if (element.style.opacity && element.style.opacity <= 0.1) {
    if (element.parentNode) {
      element.parentNode.removeChild(element)
      if (cb) cb()
    }
  } else {
    element.style.opacity = 0.9
  }
  setTimeout(() => fadeOut.apply(this, [element, cb]), 1000 / 30
  )
}

export function flatten (obj: Object, into?: Object = {}, prefix?: string = EMPTY_STRING): Object {
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      const prop = obj[k]
      if (prop && typeof prop === 'object' && !(prop instanceof Date || prop instanceof RegExp)) {
        flatten(prop, into, prefix + k + ' ')
      } else {
        if (into[prefix] && typeof into[prefix] === 'object') {
          into[prefix][k] = prop
        } else {
          into[prefix] = {}
          into[prefix][k] = prop
        }
      }
    }
  }

  return into
}

export function makeCss (obj: Object): string {
  const flat = flatten(obj)
  let str = JSON.stringify(flat, null, 2)
  str = str.replace(/"([^"]*)": {/g, '$1 {')
    .replace(/"([^"]*)"/g, '$1')
    .replace(/(\w*-?\w*): ([\w\d .#]*),?/g, '$1: $2;')
    .replace(/},/g, '}\n')
    .replace(/ &([.:])/g, '$1')

  str = str.substr(1, str.lastIndexOf('}') - 1)

  return str
}

export function appendStyles (css: string): void {
  let head = document.head || document.getElementsByTagName('head')[0]
  let styleElem = makeNode('style')
  styleElem.id = `${LIB_NAME}-styles`
  styleElem.type = 'text/css'

  if (styleElem.styleSheet) {
    styleElem.styleSheet.cssText = css
  } else {
    styleElem.appendChild(document.createTextNode(css))
  }

  head.appendChild(styleElem)
}

const { ERROR, WARN, SUCCESS, INFO } = MessageType;

export const config: Config = {
  types: { ERROR, WARN, SUCCESS, INFO },
  animation: fadeOut,
  timeout: DEFAULT_TIMEOUT,
  icons: {},
  appendTarget: document.body,
  node: makeNode(),
  allowHtml: false,
  style: {
    [`.${StyleClass.CONTAINER_CLASS}`]: {
      position: 'fixed',
      'z-index': 99999,
      right: '12px',
      top: '12px'
    },
    [`.${StyleClass.NOTIFICATION_CLASS}`]: {
      cursor: 'pointer',
      padding: '12px 18px',
      margin: '0 0 6px 0',
      'background-color': '#000',
      opacity: 0.8,
      color: '#fff',
      'border-radius': '3px',
      'box-shadow': '#3c3b3b 0 0 12px',
      width: '300px',
      [`&.${ MessageClass.ERROR_CLASS}`]: {
        'background-color': '#D5122B'
      },
      [`&.${ MessageClass.WARN_CLASS}`]: {
        'background-color': '#F5AA1E'
      },
      [`&.${ MessageClass.SUCCESS_CLASS}`]: {
        'background-color': '#7AC13E'
      },
      [`&.${ MessageClass.INFO_CLASS}`]: {
        'background-color': '#4196E1'
      },
      '&:hover': {
        opacity: 1,
        'box-shadow': '#000 0 0 12px'
      }
    },
    [`.${StyleClass.TITLE_CLASS}`]: {
      'font-weight': '500'
    },
    [`.${StyleClass.MESSAGE_CLASS}`]: {
      display: 'inline-block',
      'vertical-align': 'middle',
      width: '240px',
      padding: '0 12px'
    }
  }
}

export function makeNode (type: string = 'div'): HTMLElement {
  return document.createElement(type)
}

export function createIcon (node: HTMLElement, type: MessageType, config: Config): void {
  const iconNode = makeNode(config.icons[type].nodeType)
  const attrs = config.icons[type].attrs

  for (const k in attrs) {
    if (attrs.hasOwnProperty(k)) {
      iconNode.setAttribute(k, attrs[k])
    }
  }

  node.appendChild(iconNode)
}

export function addElem (node: HTMLElement, text: string, className: string, config: Config): void {
  const elem = makeNode()
  elem.className = className
  if (config.allowHtml) {
    elem.innerHTML = text
  } else {
    elem.appendChild(document.createTextNode(text))
  }
  node.appendChild(elem)
}

export function getTypeClass (type: MessageType): MessageClass {
  if (type === SUCCESS) return MessageClass.SUCCESS_CLASS
  if (type === WARN) return MessageClass.WARN_CLASS
  if (type === ERROR) return MessageClass.ERROR_CLASS
  if (type === INFO) return MessageClass.INFO_CLASS

  throw new MiniToastrError('Unknown class type. Check mini-toastr\'s config\s style section"');
}

const miniToastr: MiniToastr = {
  config,
  isInitialised: false,
  showMessage (message: string, title: string, type: MessageType, timeout: Number, cb: Function, overrideConf: Config): MiniToastr {
    const config = {}
    Object.assign(config, this.config)
    Object.assign(config, overrideConf)

    const notificationElem = makeNode()
    notificationElem.className = `${StyleClass.NOTIFICATION_CLASS} ${getTypeClass(type)}`

    notificationElem.onclick = function () {
      config.animation(notificationElem, null)
    }

    if (title) addElem(notificationElem, title, StyleClass.TITLE_CLASS, config)
    if (config.icons[type]) createIcon(notificationElem, type, config)
    if (message) addElem(notificationElem, message, StyleClass.MESSAGE_CLASS, config)

    config.node.insertBefore(notificationElem, config.node.firstChild)
    setTimeout(() => config.animation(notificationElem, cb), timeout || config.timeout
    )

    if (cb) cb()
    return this
  },
  init (aConfig: Config): MiniToastr {
    const newConfig = {}
    Object.assign(newConfig, config)
    Object.assign(newConfig, aConfig)
    this.config = newConfig

    const cssStr = makeCss(newConfig.style)
    appendStyles(cssStr)

    newConfig.node.id = StyleClass.CONTAINER_CLASS
    newConfig.node.className = StyleClass.CONTAINER_CLASS
    newConfig.appendTarget.appendChild(newConfig.node)

    Object.keys(newConfig.types).forEach(v => {
        this[newConfig.types[v]] = function (message, title, timeout, cb, config) {
          this.showMessage(message, title, newConfig.types[v], timeout, cb, config)
          return this
        }.bind(this)
      }
    )

    this.isInitialised = true

    return this
  },
  setIcon (type: string, nodeType: string = 'i', attrs: ReadonlyArray<string> = []): MiniToastr {
    attrs.class = attrs.class ? attrs.class + ' ' + StyleClass.ICON_CLASS : StyleClass.ICON_CLASS

    this.config.icons[type] = { nodeType, attrs }

    return this
  }
}

export default miniToastr