var miniToastr = (function () {
  'use strict';

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
    container: `${PACKAGE_NAME}-container`,
    base: `${PACKAGE_NAME}-notification`,
    error: `-${TYPES.error}`,
    warn: `-${TYPES.warn}`,
    success: `-${TYPES.success}`,
    info: `-${TYPES.info}`
  }

  /**
   * @param  {Object} obj
   * @return {String}
   */
  function makeCssString (obj) {
    return Object.keys(obj).reduce(function (prev, key) {
      return prev + key + ':' + obj[key] + '; ';
    }, '');
  }

  function getCss (config) {
    return {
      [CLASSES.container]: makeCssString(config.style.container),
      [CLASSES.base]: makeCssString(config.style.box.base),
      [CLASSES.error]: makeCssString(config.style.box.error),
      [CLASSES.warn]: makeCssString(config.style.box.warn),
      [CLASSES.success]: makeCssString(config.style.box.success),
      [CLASSES.info]: makeCssString(config.style.box.info)
    }
  }

  /**
   * @param  {String} css
   */
  function appendStyles (css) {
    let head = document.head || document.getElementsByTagName('head')[0]
    let styleElem = document.createElement('style')
    styleElem.id = `${PACKAGE_NAME}-styles`
    styleElem.type = 'text/css';

    if (styleElem.styleSheet) {
      styleElem.styleSheet.cssText = css;
    } else {
      styleElem.appendChild(document.createTextNode(css));
    }

    head.appendChild(styleElem);
  }

  const defaultConfig = {
    timeOut: 5000,
    appendTarget: document.body,
    node: document.createElement('div'),
    style: {
      container: {
        position: 'fixed',
        'z-index': 99999,
        right: '12px',
        top: '12px'
      },
      box: {
        base: {
          cursor: 'pointer',
          padding: '12px 18px',
          margin: '0 0 6px 0',
          'background-color': '#000',
          opacity: 0.8,
          color: '#fff',
          // font: 'normal 13px \'Lucida Sans Unicode\', \'Lucida Grande\', Verdana, Arial, Helvetica, sans-serif',
          'border-radius': '3px',
          'box-shadow': '#3c3b3b 0 0 12px',
          width: '300px'
        },
        error: {
          'background-color': '#FF0000'
        },
        warn: {
          'background-color': '#f9a937'
        },
        success: {
          'background-color': '#73b573'
        },
        info: {
          'background-color': '#58abc3'
        },
        hover: {
          opacity: 1,
          'box-shadow': '#000 0 0 12px'
        }
      },
      title: {
        'font-weight': '500'
      },
      text: {
        display: 'inline-block',
        'vertical-align': 'middle',
        width: '240px',
        padding: '0 12px'
      }
    }
  }

  /**
   * @param  {String} type
   * @return  {String}
   */
  function makeClassStr (type) {
    return `${CLASSES.base} ${CLASSES[type]}`
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
    notificationElem.className = makeClassStr(type)

    notificationElem.onmouseover = function () {
      // applyStyles(this, config.style.box.hover)
    }
    notificationElem.onmouseout = function () {
      // applyStyles(this, config.style.box.base)
    }
    notificationElem.onclick = function () {
      this.style.display = 'none'
    }

    var textElem = document.createElement('div')
    // applyStyles(textElem, config.style.text)

    notificationElem.appendChild(textElem)

    if (title) {
      var titleText = document.createElement('div')
      // applyStyles(titleText, config.style.title)
      titleText.appendChild(document.createTextNode(title))
      textElem.appendChild(titleText)
    }

    if (message) {
      var messageText = document.createElement('div')
      messageText.appendChild(document.createTextNode(message))
      textElem.appendChild(messageText)
    }
    config.node.insertBefore(notificationElem, config.node.firstChild);

    // TODO (S.Panfilov) revert
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
      const cssObj = getCss(this.config)
      const cssStr = Object.keys(cssObj).map(v => `.${v} \{ ${cssObj[v]} \}`).join(' ')

      appendStyles(cssStr)
      this.config.node.id = `${PACKAGE_NAME}-container`
      this.config.node.className = `${PACKAGE_NAME}-container`
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
