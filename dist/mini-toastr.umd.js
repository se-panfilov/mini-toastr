var miniToastr = function () {
  'use strict'
  var t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (t, n) {
    t.__proto__ = n
  } || function (t, n) {
    for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e])
  }
  var n = Object.assign || function (t) {
      for (var n, e = 1, o = arguments.length; e < o; e++) for (var i in n = arguments[e]) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
      return t
    }, e = 'mini-toastr', o = '', i = 'error', r = 'warn', a = 'success', c = 'info', s = '-' + i, d = '-' + r,
    p = '-' + a, f = '-' + c, l = function (n) {
      function e (t) {
        var e = n.call(this, t) || this
        return e.message = t, e.name = 'MiniToastrError', e
      }

      return function (n, e) {
        function o () {
          this.constructor = n
        }

        t(n, e), n.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, new o)
      }(e, n), e
    }(Error), u = e, h = e + '__notification', g = e + '-notification__title', y = e + '-notification__icon',
    m = e + '-notification__message'

  function v (t) {
    var n = function t (n, e, i) {
      for (var r in void 0 === n && (n = {}), void 0 === e && (e = {}), void 0 === i && (i = o), n) if (n.hasOwnProperty(r)) {
        var a = n[r]
        a && 'object' == typeof a && !(a instanceof Date || a instanceof RegExp) ? t(a, e, i + r + ' ') : e[i] && 'object' == typeof e[i] ? e[i][r] = a : (e[i] = {}, e[i][r] = a)
      }
      return e
    }(t), e = JSON.stringify(n, null, 2)
    return e = (e = e.replace(/"([^"]*)": {/g, '$1 {').replace(/"([^"]*)"/g, '$1').replace(/(\w*-?\w*): ([\w\d .#]*),?/g, '$1: $2;').replace(/},/g, '}\n').replace(/ &([.:])/g, '$1')).substr(1, e.lastIndexOf('}') - 1)
  }

  var b = {
    types: { ERROR: i, WARN: r, SUCCESS: a, INFO: c },
    animation: function (t, n) {
      var e = t.style.opacity ? +t.style.opacity : .9
      e > .05 ? e -= .05 : e <= .1 ? t.parentNode && (t.parentNode.removeChild(t), n && n()) : e = .9, t.style.opacity = e.toString()
    },
    timeout: 3e3,
    icons: {},
    appendTarget: document.body,
    node: w(),
    allowHtml: !1,
    style: (_ = {}, _['.' + u] = {
      position: 'fixed',
      'z-index': 99999,
      right: '12px',
      top: '12px'
    }, _['.' + h] = (O = {
      cursor: 'pointer',
      padding: '12px 18px',
      margin: '0 0 6px 0',
      'background-color': '#000',
      opacity: .8,
      color: '#fff',
      'border-radius': '3px',
      'box-shadow': '#3c3b3b 0 0 12px',
      width: '300px'
    }, O['&.' + s] = { 'background-color': '#D5122B' }, O['&.' + d] = { 'background-color': '#F5AA1E' }, O['&.' + p] = { 'background-color': '#7AC13E' }, O['&.' + f] = { 'background-color': '#4196E1' }, O['&:hover'] = {
      opacity: 1,
      'box-shadow': '#000 0 0 12px'
    }, O), _['.' + g] = { 'font-weight': '500' }, _['.' + m] = {
      display: 'inline-block',
      'vertical-align': 'middle',
      width: '240px',
      padding: '0 12px'
    }, _)
  }

  function w (t) {
    return void 0 === t && (t = 'div'), document.createElement(t)
  }

  function x (t, n, e, o) {
    var i = w()
    i.className = e, o.allowHtml ? i.innerHTML = n : i.appendChild(document.createTextNode(n)), t.appendChild(i)
  }

  var _, O, C = {
    config: b, isInitialised: !1, showMessage: function (t, e, o, u, y, v) {
      var b = n({}, this.config, v), _ = w()
      return _.className = h + ' ' + function (t) {
        if (t === a) return p
        if (t === r) return d
        if (t === i) return s
        if (t === c) return f
        throw new l('Unknown class type. Check mini-toastr\'s configs style section"')
      }(o), _.onclick = function () {
        return b.animation(_)
      }, e && x(_, e, g, b), b.icons[o] && function (t, n, e) {
        var o = w(e.icons[n].nodeType), i = e.icons[n].attrs
        for (var r in i) i.hasOwnProperty(r) && o.setAttribute(r, i[r])
        t.appendChild(o)
      }(_, o, b), t && x(_, t, m, b), b.node.insertBefore(_, b.node.firstChild), setTimeout(function () {
        return b.animation(_, y)
      }, u || b.timeout), y && y(), this
    }, init: function (t) {
      var o = this
      this.config = n({}, b, t)
      var i, r, a, c = v(this.config.style)
      return i = c, r = document.head || document.getElementsByTagName('head')[0], (a = w('style')).id = e + '-styles', a.type = 'text/css', a.styleSheet ? a.styleSheet.cssText = i : a.appendChild(document.createTextNode(i)), r.appendChild(a), this.config.node.id = u, this.config.node.className = u, this.config.appendTarget.appendChild(this.config.node), Object.keys(C.config.types).forEach(function (t) {
        C[C.config.types[t]] = function (n, e, o, i, r) {
          return C.showMessage(n, e, C.config.types[t], o, i, r), C
        }.bind(o)
      }), this.isInitialised = !0, this
    }, setIcon: function (t, n, e) {
      return void 0 === n && (n = 'i'), void 0 === e && (e = []), e.class = e.class ? e.class + ' ' + y : y, this.config.icons[t] = {
        nodeType: n,
        attrs: e
      }, this
    }
  }
  return C
}()
//# sourceMappingURL=mini-toastr.umd.js.map
