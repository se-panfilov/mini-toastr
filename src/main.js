var miniToastr = (function () {
  'use strict';

  /**
   * @param  {Node} element
   * @param  {Object} styleObj
   */
  function applyStyles (element, styleObj) {
    return Object.keys(styleObj).forEach(v => element.style[v] = styleObj[v])
  }

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

  const defaultConfig = {
    timeOut: 5000,
    appendTarget: document.body,
    node: document.createElement('div'),
    style: {
      container: {
        position: "fixed",
        zIndex: 99999,
        right: "12px",
        top: "12px"
      },
      box: {
        base: {
          cursor: "pointer",
          padding: "12px 18px",
          margin: "0 0 6px 0",
          backgroundColor: "#000",
          opacity: 0.8,
          color: "#fff",
          font: "normal 13px 'Lucida Sans Unicode', 'Lucida Grande', Verdana, Arial, Helvetica, sans-serif",
          borderRadius: "3px",
          boxShadow: "#3c3b3b 0 0 12px",
          width: "300px"
        },
        error: {
          backgroundColor: "#FF0000",
        },
        warn: {
          backgroundColor: "#f9a937",
        },
        success: {
          backgroundColor: "#73b573",
        },
        info: {
          backgroundColor: "#58abc3",
        },
        hover: {
          opacity: 1,
          boxShadow: "#000 0 0 12px"
        }
      },
      title: {
        fontWeight: "700"
      },
      text: {
        display: "inline-block",
        verticalAlign: "middle",
        width: "240px",
        padding: "0 12px"
      }
    }
  }
  const TYPES = {
    error: 'error',
    warn: 'warn',
    success: 'success',
    info: 'info'
  }

  const CLASSES = {
    basic: 'mini-toastr-notification',
    error: `-${TYPES.error}`,
    warn: `-${TYPES.warn}`,
    success: `-${TYPES.success}`,
    info: `-${TYPES.info}`
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
    console.info(notificationElem)
    notificationElem.class = `${CLASSES.basic} ${CLASSES[type]}`

    applyStyles(notificationElem, config.style.box.base)
    applyStyles(notificationElem, config.style.box[type])

    notificationElem.onmouseover = function () {
      applyStyles(this, config.style.box.hover)
    }
    notificationElem.onmouseout = function () {
      applyStyles(this, config.style.box.base)
    }
    notificationElem.onclick = function () {
      this.style.display = 'none'
    }

    var textElem = document.createElement('div')
    applyStyles(textElem, config.style.text)

    notificationElem.appendChild(textElem)

    if (title) {
      var titleText = document.createElement('div')
      applyStyles(titleText, config.style.title)
      titleText.appendChild(document.createTextNode(title))
      textElem.appendChild(titleText)
    }

    if (message) {
      var messageText = document.createElement('div')
      messageText.appendChild(document.createTextNode(message))
      textElem.appendChild(messageText)
    }
    config.node.insertBefore(notificationElem, config.node.firstChild);

    // setTimeout(function () {
    //   fadeOut(notificationElem)
    // }, timeout || config.timeOut)

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
      applyStyles(this.config.node, this.config.style.container)
      this.config.node.id = 'qqq'
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
