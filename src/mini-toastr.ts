import { Config, FullConfig, Styles } from './Config'
import { MiniToastr } from './MiniToastr'
import { DEFAULT_TIMEOUT, EMPTY_STRING, LIB_NAME } from './common.const'
import { ERROR_CLASS, INFO_CLASS, MessageClass, SUCCESS_CLASS, WARN_CLASS } from './MessageClass'
import { ERROR, INFO, MessageType, SUCCESS, WARN } from './MessageType'
import { MiniToastrError } from './mini-toastr-error.class'
import { CONTAINER_CLASS, ICON_CLASS, MESSAGE_CLASS, NOTIFICATION_CLASS, TITLE_CLASS } from './StyleClass'

function fadeOut (element: HTMLElement, cb?: Function): void {
  let opacity: number = element.style.opacity ? +element.style.opacity : 0.9

  if (opacity > 0.05) {
    opacity -= 0.05
  } else if (opacity <= 0.1) {
    if (element.parentNode) {
      element.parentNode.removeChild(element)
      if (cb) cb()
    }
  } else {
    opacity = 0.9
  }

  element.style.opacity = opacity.toString()
  // setTimeout(() => fadeOut.apply((<any>this), [element, cb]), 1000 / 30) // TODO (S.Panfilov) wtf is this here?
}

function flatten (obj: any = {}, into: any = {}, prefix: string = EMPTY_STRING): Object { // TODO (S.Panfilov) "into" and "obj" are any
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

function makeCss (styles: Styles): string {
  const flat = flatten(styles)
  let str = JSON.stringify(flat, null, 2)
  str = str.replace(/"([^"]*)": {/g, '$1 {')
    .replace(/"([^"]*)"/g, '$1')
    .replace(/(\w*-?\w*): ([\w\d .#]*),?/g, '$1: $2;')
    .replace(/},/g, '}\n')
    .replace(/ &([.:])/g, '$1')

  str = str.substr(1, str.lastIndexOf('}') - 1)

  return str
}

function isStyleSheet (element: Node | CSSImportRule): element is CSSImportRule {
  return !!(<any>element).styleSheet
}

function appendStyles (css: string): void {
  const head = document.head || document.getElementsByTagName('head')[0]
  const styleElem = makeNode('style') as HTMLStyleElement // TODO (S.Panfilov) casting to HTMLStyleElement
  styleElem.id = `${LIB_NAME}-styles`
  styleElem.type = 'text/css'

  if (isStyleSheet(styleElem)) {
    styleElem.styleSheet.cssText = css // TODO (S.Panfilov) deprecated
  } else {
    styleElem.appendChild(document.createTextNode(css))
  }

  head.appendChild(styleElem)
}

const config: FullConfig = {
  types: { ERROR, WARN, SUCCESS, INFO },
  animation: fadeOut,
  timeout: DEFAULT_TIMEOUT,
  icons: {},
  appendTarget: document.body,
  node: makeNode(),
  allowHtml: false,
  style: {
    [`.${CONTAINER_CLASS}`]: {
      position: 'fixed',
      'z-index': 99999,
      right: '12px',
      top: '12px'
    },
    [`.${NOTIFICATION_CLASS}`]: {
      cursor: 'pointer',
      padding: '12px 18px',
      margin: '0 0 6px 0',
      'background-color': '#000',
      opacity: 0.8,
      color: '#fff',
      'border-radius': '3px',
      'box-shadow': '#3c3b3b 0 0 12px',
      width: '300px',
      [`&.${ ERROR_CLASS}`]: {
        'background-color': '#D5122B'
      },
      [`&.${ WARN_CLASS}`]: {
        'background-color': '#F5AA1E'
      },
      [`&.${ SUCCESS_CLASS}`]: {
        'background-color': '#7AC13E'
      },
      [`&.${ INFO_CLASS}`]: {
        'background-color': '#4196E1'
      },
      '&:hover': {
        opacity: 1,
        'box-shadow': '#000 0 0 12px'
      }
    },
    [`.${TITLE_CLASS}`]: {
      'font-weight': '500'
    },
    [`.${MESSAGE_CLASS}`]: {
      display: 'inline-block',
      'vertical-align': 'middle',
      width: '240px',
      padding: '0 12px'
    }
  }
}

function makeNode (type: string = 'div'): HTMLElement {
  return document.createElement(type)
}

function createIcon (node: HTMLElement, type: MessageType, config: FullConfig): void {
  const iconNode = makeNode(config.icons[type].nodeType)
  const attrs = config.icons[type].attrs

  for (const k in attrs) {
    if (attrs.hasOwnProperty(k)) {
      iconNode.setAttribute(k, attrs[k])
    }
  }

  node.appendChild(iconNode)
}

function addElem (node: HTMLElement, text: string, className: string, config: FullConfig): void {
  const elem = makeNode()
  elem.className = className
  if (config.allowHtml) {
    elem.innerHTML = text
  } else {
    elem.appendChild(document.createTextNode(text))
  }
  node.appendChild(elem)
}

function getTypeClass (type: MessageType): MessageClass {
  if (type === SUCCESS) return SUCCESS_CLASS
  if (type === WARN) return WARN_CLASS
  if (type === ERROR) return ERROR_CLASS
  if (type === INFO) return INFO_CLASS

  throw new MiniToastrError('Unknown class type. Check mini-toastr\'s config\s style section"')
}

const miniToastr: MiniToastr = {
  config,
  isInitialised: false,
  showMessage (message: string, title: string, type: MessageType, timeout: number, cb: Function, overrideConf: Config): MiniToastr {
    const config = { ...this.config, ...overrideConf } as FullConfig // TODO (S.Panfilov) "Config" casting

    const notificationElem = makeNode()
    notificationElem.className = `${NOTIFICATION_CLASS} ${getTypeClass(type)}`
    notificationElem.onclick = () => config.animation(notificationElem)

    if (title) addElem(notificationElem, title, TITLE_CLASS, config)
    if (config.icons[type]) createIcon(notificationElem, type, config)
    if (message) addElem(notificationElem, message, MESSAGE_CLASS, config)

    config.node.insertBefore(notificationElem, config.node.firstChild)
    setTimeout(() => config.animation(notificationElem, cb), timeout || config.timeout
    )

    if (cb) cb()
    return this
  },
  init (aConfig: Config): MiniToastr {
    this.config = { ...config, ...aConfig } as FullConfig // TODO (S.Panfilov) "config" is a kinda global scope and "Config" casting

    const cssStr = makeCss(this.config.style)
    appendStyles(cssStr)

    this.config.node.id = CONTAINER_CLASS
    this.config.node.className = CONTAINER_CLASS
    this.config.appendTarget.appendChild(this.config.node)

    // Object.keys(this.config.types).forEach(v => {
    //     this[this.config.types[v]] = function (message: string, title: string, timeout: number, cb: Function, config: Config) {
    //       this.showMessage(message, title, this.config.types[v], timeout, cb, config)
    //       return this
    //     }.bind(this) // TODO (S.Panfilov) bind?
    //   }
    // )

    // TODO (S.Panfilov) check if it's working
    Object.keys(miniToastr.config.types).forEach(v => {
        miniToastr[miniToastr.config.types[v]] = function (message: string, title: string, timeout: number, cb: Function, config: Config) {
          miniToastr.showMessage(message, title, miniToastr.config.types[v], timeout, cb, config)
          return miniToastr
        }.bind(this) // TODO (S.Panfilov) bind?
      }
    )

    this.isInitialised = true

    return this
  },
  setIcon (type: string, nodeType: string = 'i', attrs: any = []): MiniToastr { // TODO (S.Panfilov) attrs is any
    attrs.class = attrs.class ? attrs.class + ' ' + ICON_CLASS : ICON_CLASS

    this.config.icons[type] = { nodeType, attrs }

    return this
  }
}

export default miniToastr