function applyStyles (element, styleObj) {
  return Object.keys(styleObj).forEach(v => element.style[v] = styleObj[v])
}

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

var config = {
  timeOut: 5000,
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
        boxShadow: "#999 0 0 12px",
        width: "300px"
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

applyStyles(config.node, config.style.container)

document.body.appendChild(config.node)

function notify (message, title, type, timeout, cb) {
  var notification = document.createElement('div')
  applyStyles(notification, config.style.box.base)

  notification.onmouseover = function () {
    applyStyles(this, config.style.box.hover)
  }
  notification.onmouseout = function () {
    applyStyles(this, config.style.box.base)
  }
  notification.onclick = function () {
    this.style.display = 'none'
  }

  var text = document.createElement('div')
  applyStyles(text, config.style.text)

  notification.appendChild(text)

  if (title) {
    var title_text = document.createElement('div')
    applyStyles(title_text, config.style.title)
    title_text.appendChild(document.createTextNode(title))
    text.appendChild(title_text)
  }

  if (message) {
    var message_text = document.createElement('div')
    message_text.appendChild(document.createTextNode(message))
    text.appendChild(message_text)
  }

  config.node.insertBefore(notification, config.node.firstChild)

  setTimeout(function () {
    fadeOut(notification)
  }, timeout || config.timeOut)

  if (cb) cb()
}

const exports = {
  info (message, title, timeout, cb) {
    this.notify(message, title, 'info', timeout, cb)
  },
  warning (message, title, timeout, cb) {
    this.notify(message, title, 'warning', timeout, cb)
  },
  success (message, title, timeout, cb) {
    this.notify(message, title, 'success', timeout, cb)
  },
  error (message, title, timeout, cb) {
    this.notify(message, title, 'error', timeout, cb)
  }
}