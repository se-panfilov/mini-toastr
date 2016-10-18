var miniToastr = (function () {
  'use strict'

  const PACKAGE_NAME = 'mini-toastr'

  /**
   * @param  {Node} element
   */
  function fadeOut (element) {
    if (element.style.opacity && element.style.opacity > 0.05) {
      element.style.opacity = element.style.opacity - 0.05
    } else if (element.style.opacity && element.style.opacity <= 0.1) {
      if (element.parentNode) {
        element.parentNode.removeChild(element)
      }
    } else {
      element.style.opacity = 0.9
    }
    setTimeout(() => fadeOut.apply(this, [element]), 1000 / 30)
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
    timeout: 60,
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
        // font: 'normal 13px \'Lucida Sans Unicode\', \'Lucida Grande\', Verdana, Arial, Helvetica, sans-serif',
        'border-radius': '3px',
        'box-shadow': '#3c3b3b 0 0 12px',
        width: '300px',
        [`&.${CLASSES.error}`]: {
          'background-color': '#FF0000'
        },
        [`&.${CLASSES.warn}`]: {
          'background-color': '#f9a937'
        },
        [`&.${CLASSES.success}`]: {
          'background-color': '#73b573'
        },
        [`&.${CLASSES.info}`]: {
          'background-color': '#58abc3'
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

  /**
   * @param  {String} message
   * @param  {String} title
   * @param  {String} type
   * @param  {Number} timeout
   * @param  {Function} cb
   * @param  {Object} config
   */
  function showMessage (message, title, type, timeout, cb, config) {
    config = config || exports.config

    const notificationElem = document.createElement('div')
    notificationElem.className = `${CLASSES.notification} ${CLASSES[type]}`

    notificationElem.onclick = function () {
      fadeOut(notificationElem)
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

    config.node.insertBefore(notificationElem, config.node.firstChild)
    setTimeout(() => fadeOut(notificationElem), timeout || config.timeout)

    if (cb) cb()
  }

  const exports = {
    config: defaultConfig,
    /**
     * @param  {Object} config
     * @return  {exports}
     */
    init (config) {
      this.config = config || defaultConfig
      const cssStr = makeCss(this.config.style)
      appendStyles(cssStr)

      this.config.node.id = `${CLASSES.container}`
      this.config.node.className = `${CLASSES.container}`
      this.config.appendTarget.appendChild(this.config.node)
      return this
    },
    /**
     * @param  {String} message
     * @param  {String} title
     * @param  {Number} timeout
     * @param  {Function} cb
     * @param  {Object} config
     * @return  {exports}
     */
    info (message, title, timeout, cb, config) {
      showMessage(message, title, TYPES.info, timeout, cb, config)
      return this
    },
    /**
     * @param  {String} message
     * @param  {String} title
     * @param  {Number} timeout
     * @param  {Function} cb
     * @param  {Object} config
     * @return  {exports}
     */
    warn (message, title, timeout, cb, config) {
      showMessage(message, title, TYPES.warn, timeout, cb, config)
    },
    /**
     * @param  {String} message
     * @param  {String} title
     * @param  {Number} timeout
     * @param  {Function} cb
     * @param  {Object} config
     * @return  {exports}
     */
    success (message, title, timeout, cb, config) {
      showMessage(message, title, TYPES.success, timeout, cb, config)
    },
    /**
     * @param  {String} message
     * @param  {String} title
     * @param  {Number} timeout
     * @param  {Function} cb
     * @param  {Object} config
     * @return  {exports}
     */
    error (message, title, timeout, cb, config) {
      showMessage(message, title, TYPES.error, timeout, cb, config)
    }
  }

  return exports
})()

export default miniToastr
