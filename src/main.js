// eslint-disable-next-line no-unused-vars
var miniToastr = (function () {
  'use strict'

  if (typeof window === 'undefined') return

  const PACKAGE_NAME = 'mini-toastr'

  /**
   * @param  {Node} element
   * @param  {Function} cb
   */
  function fadeOut (element, cb) {
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
    setTimeout(() => fadeOut.apply(this, [element, cb]), 1000 / 30)
  }

  const TYPES = {
    error: 'error',
    warn: 'warn',
    success: 'success',
    info: 'info'
  }

  const CLASSES = {
    container: `${PACKAGE_NAME}`,
    notification: `${PACKAGE_NAME}__notification`,
    title: `${PACKAGE_NAME}-notification__title`,
    message: `${PACKAGE_NAME}-notification__message`,
    error: `-${TYPES.error}`,
    warn: `-${TYPES.warn}`,
    success: `-${TYPES.success}`,
    info: `-${TYPES.info}`
  }

  /**
   * @param  {Object} obj
   * @param  {Object} into
   * @param  {String} prefix
   * @return {Object}
   */
  function flatten (obj, into, prefix) {
    into = into || {}
    prefix = prefix || ''

    for (let k in obj) {
      if (obj.hasOwnProperty(k)) {
        var prop = obj[k]
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

  /**
   * @param  {Object} obj
   * @return {String}
   */
  function makeCss (obj) {
    const flat = flatten(obj)
    let str = JSON.stringify(flat, null, 2)
    str = str.replace(/"([^"]*)": \{/g, '$1 {')
      .replace(/"([^"]*)"/g, '$1')
      .replace(/(\w*-?\w*): ([\w\d .#]*),?/g, '$1: $2;')
      .replace(/},/g, '}\n')
      .replace(/ &([.:])/g, '$1')

    str = str.substr(1, str.lastIndexOf('}') - 1)

    return str
  }

  /**
   * @param  {String} css
   */
  function appendStyles (css) {
    let head = document.head || document.getElementsByTagName('head')[0]
    let styleElem = document.createElement('style')
    styleElem.id = `${PACKAGE_NAME}-styles`
    styleElem.type = 'text/css'

    if (styleElem.styleSheet) {
      styleElem.styleSheet.cssText = css
    } else {
      styleElem.appendChild(document.createTextNode(css))
    }

    head.appendChild(styleElem)
  }

  const defaultConfig = {
    types: TYPES,
    animation: fadeOut,
    timeout: 3000,
    appendTarget: document.body,
    node: document.createElement('div'),
    style: {
      [`.${CLASSES.container}`]: {
        position: 'fixed',
        'z-index': 99999,
        right: '12px',
        top: '12px'
      },
      [`.${CLASSES.notification}`]: {
        cursor: 'pointer',
        padding: '12px 18px',
        margin: '0 0 6px 0',
        'background-color': '#000',
        opacity: 0.8,
        color: '#fff',
        'border-radius': '3px',
        'box-shadow': '#3c3b3b 0 0 12px',
        width: '300px',
        [`&.${CLASSES.error}`]: {
          'background-color': '#D5122B'
        },
        [`&.${CLASSES.warn}`]: {
          'background-color': '#F5AA1E'
        },
        [`&.${CLASSES.success}`]: {
          'background-color': '#7AC13E'
        },
        [`&.${CLASSES.info}`]: {
          'background-color': '#4196E1'
        },
        '&:hover': {
          opacity: 1,
          'box-shadow': '#000 0 0 12px'
        }
      },
      [`.${CLASSES.title}`]: {
        'font-weight': '500'
      },
      [`.${CLASSES.message}`]: {
        display: 'inline-block',
        'vertical-align': 'middle',
        width: '240px',
        padding: '0 12px'
      }
    }
  }

  const exports = {
    config: defaultConfig,
    /**
     * @param  {String} message
     * @param  {String} title
     * @param  {String} type
     * @param  {Number} timeout
     * @param  {Function} cb
     * @param  {Object} config
     */
    showMessage (message, title, type, timeout, cb, config) {
      const newConfig = {}
      Object.assign(newConfig, this.config)
      Object.assign(newConfig, config)

      const notificationElem = document.createElement('div')
      notificationElem.className = `${CLASSES.notification} ${CLASSES[type]}`

      notificationElem.onclick = function () {
        newConfig.animation(notificationElem, null)
      }

      if (title) {
        const titleElem = document.createElement('div')
        titleElem.className = CLASSES.title
        titleElem.appendChild(document.createTextNode(title))
        notificationElem.appendChild(titleElem)
      }

      if (message) {
        const messageText = document.createElement('div')
        messageText.className = CLASSES.message
        messageText.appendChild(document.createTextNode(message))
        notificationElem.appendChild(messageText)
      }

      newConfig.node.insertBefore(notificationElem, newConfig.node.firstChild)
      setTimeout(() => newConfig.animation(notificationElem, cb), timeout || newConfig.timeout)

      if (cb) cb()
      return this
    },
    /**
     * @param  {Object} config
     * @return  {exports}
     */
    init (config) {
      const newConfig = {}
      Object.assign(newConfig, defaultConfig)
      Object.assign(newConfig, config)

      const cssStr = makeCss(newConfig.style)
      appendStyles(cssStr)

      newConfig.node.id = `${CLASSES.container}`
      newConfig.node.className = `${CLASSES.container}`
      newConfig.appendTarget.appendChild(newConfig.node)

      Object.keys(newConfig.types).forEach(v => {
        /**
         * @param  {String} message
         * @param  {String} title
         * @param  {Number} timeout
         * @param  {Function} cb
         * @param  {Object} config
         * @return  {exports}
         */
        exports[newConfig.types[v]] = function (message, title, timeout, cb, config) {
          this.showMessage(message, title, newConfig.types[v], timeout, cb, config)
          return this
        }.bind(this)
      })

      return this
    }
  }

  return exports
})()
