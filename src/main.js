//fix for server-side rendering
// if (typeof window === 'undefined') {
//   return {
//     init: () => {
//     }
//   }
// }

export default {
  _makeNode (type = 'div') {
    return document.createElement(type)
  },
  config: {
    name: 'mini-toastr',
    types: {
      error: 'error',
      warn: 'warn',
      success: 'success',
      info: 'info'
    },
    animation (element, cb) {
      // TODO (S.Panfilov) fix it with css classes
      // if (element.style.opacity && element.style.opacity > 0.05) {
      //   element.style.opacity = element.style.opacity - 0.05
      // } else if (element.style.opacity && element.style.opacity <= 0.1) {
      //   if (element.parentNode) {
      //     element.parentNode.removeChild(element)
      //     if (cb) cb()
      //   }
      // } else {
      //   element.style.opacity = 0.9
      // }
      // setTimeout(() => fadeOut.apply(this, [element, cb]), 1000 / 30)
    },
    timeout: 3000,
    icons: {},
    appendTarget: document.body,
    node: this._makeNode()
  },
  _addElem (node, text, className) {
    const elem = this._makeNode()
    elem.className = className
    elem.appendChild(document.createTextNode(text))
    node.appendChild(elem)
  },
  _createIcon (node, type, config) {
    const iconNode = this._makeNode(config.icons[type].nodeType)
    const attrs = config.icons[type].attrs

    // TODO (S.Panfilov) check
    for (const k of attrs) {
      iconNode.setAttribute(k, attrs[k])
    }

    node.appendChild(iconNode)
  },
  showMessage (message, title, type, timeout, cb, overrideConf) {
    const config = {}
    Object.assign(config, this.config)
    Object.assign(config, overrideConf)

    const notificationElem = _makeNode()
    notificationElem.className = `${this.name}__notification -${type}`

    notificationElem.onclick = function () {
      config.animation(notificationElem, null)
    }

    if (title) this._addElem(notificationElem, title, `${this.name}-notification__title`)
    if (config.icons[type]) this._createIcon(notificationElem, type, config)
    if (message) this._addElem(notificationElem, message, `${this.name}-notification__message`)

    config.node.insertBefore(notificationElem, config.node.firstChild)
    setTimeout(() => config.animation(notificationElem, cb), timeout || config.timeout)

    if (cb) cb()
    return this
  },
  init (aConfig) {
    const newConfig = {}
    Object.assign(newConfig, config)
    Object.assign(newConfig, aConfig)
    this.config = newConfig

    // TODO (S.Panfilov) id not uniq
    // newConfig.node.id = 'mini-toastr'
    newConfig.node.className = 'mini-toastr'
    newConfig.appendTarget.appendChild(newConfig.node)

    for (const k of newConfig.types) {
      const typeName = newConfig.types[k]
      // TODO (S.Panfilov) check this
      this[newConfig.types[typeName]] = (message, title, timeout, cb, config) => {
        this.showMessage(message, title, newConfig.types[typeName], timeout, cb, config)
        return this
      }
    }

    return this
  },
  setIcon (type, nodeType = 'i', attrs = []) {
    const iconClass = `${this.name}-notification__icon`
    attrs.class = attrs.class ? `${attrs.class}  ${iconClass}` : iconClass

    this.config.icons[type] = {
      nodeType,
      attrs
    }
  }
}
