;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.miniToastr = factory();
  }
}(this, function() {
'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var miniToastr = function () {
  'use strict';

  var _ref, _style;

  var PACKAGE_NAME = 'mini-toastr';

  /**
   * @param  {Node} element
   * @param  {Function} cb
   */
  function fadeOut(element, cb) {
    var _this = this;

    if (element.style.opacity && element.style.opacity > 0.05) {
      element.style.opacity = element.style.opacity - 0.05;
    } else if (element.style.opacity && element.style.opacity <= 0.1) {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
        if (cb) cb();
      }
    } else {
      element.style.opacity = 0.9;
    }
    setTimeout(function () {
      return fadeOut.apply(_this, [element, cb]);
    }, 1000 / 30);
  }

  var TYPES = {
    error: 'error',
    warn: 'warn',
    success: 'success',
    info: 'info'
  };

  var CLASSES = {
    container: '' + PACKAGE_NAME,
    notification: PACKAGE_NAME + '__notification',
    title: PACKAGE_NAME + '-notification__title',
    message: PACKAGE_NAME + '-notification__message',
    error: '-' + TYPES.error,
    warn: '-' + TYPES.warn,
    success: '-' + TYPES.success,
    info: '-' + TYPES.info
  };

  /**
   * @param  {Object} obj
   * @param  {Object} into
   * @param  {String} prefix
   * @return {Object}
   */
  function flatten(obj, into, prefix) {
    into = into || {};
    prefix = prefix || '';

    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        var prop = obj[k];
        if (prop && (typeof prop === 'undefined' ? 'undefined' : (0, _typeof3['default'])(prop)) === 'object' && !(prop instanceof Date || prop instanceof RegExp)) {
          flatten(prop, into, prefix + k + ' ');
        } else {
          if (into[prefix] && (0, _typeof3['default'])(into[prefix]) === 'object') {
            into[prefix][k] = prop;
          } else {
            into[prefix] = {};
            into[prefix][k] = prop;
          }
        }
      }
    }

    return into;
  }

  /**
   * @param  {Object} obj
   * @return {String}
   */
  function makeCss(obj) {
    var flat = flatten(obj);
    var str = (0, _stringify2['default'])(flat, null, 2);
    str = str.replace(/"([^"]*)": \{/g, '$1 {').replace(/"([^"]*)"/g, '$1').replace(/(\w*-?\w*): ([\w\d .#]*),?/g, '$1: $2;').replace(/},/g, '}\n').replace(/ &([.:])/g, '$1');

    str = str.substr(1, str.lastIndexOf('}') - 1);

    return str;
  }

  /**
   * @param  {String} css
   */
  function appendStyles(css) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styleElem = document.createElement('style');
    styleElem.id = PACKAGE_NAME + '-styles';
    styleElem.type = 'text/css';

    if (styleElem.styleSheet) {
      styleElem.styleSheet.cssText = css;
    } else {
      styleElem.appendChild(document.createTextNode(css));
    }

    head.appendChild(styleElem);
  }

  var defaultConfig = {
    types: TYPES,
    animation: fadeOut,
    timeout: 3000,
    appendTarget: document.body,
    node: document.createElement('div'),
    style: (_style = {}, (0, _defineProperty3['default'])(_style, '.' + CLASSES.container, {
      position: 'fixed',
      'z-index': 99999,
      right: '12px',
      top: '12px'
    }), (0, _defineProperty3['default'])(_style, '.' + CLASSES.notification, (_ref = {
      cursor: 'pointer',
      padding: '12px 18px',
      margin: '0 0 6px 0',
      'background-color': '#000',
      opacity: 0.8,
      color: '#fff',
      'border-radius': '3px',
      'box-shadow': '#3c3b3b 0 0 12px',
      width: '300px'
    }, (0, _defineProperty3['default'])(_ref, '&.' + CLASSES.error, {
      'background-color': '#D5122B'
    }), (0, _defineProperty3['default'])(_ref, '&.' + CLASSES.warn, {
      'background-color': '#F5AA1E'
    }), (0, _defineProperty3['default'])(_ref, '&.' + CLASSES.success, {
      'background-color': '#7AC13E'
    }), (0, _defineProperty3['default'])(_ref, '&.' + CLASSES.info, {
      'background-color': '#4196E1'
    }), (0, _defineProperty3['default'])(_ref, '&:hover', {
      opacity: 1,
      'box-shadow': '#000 0 0 12px'
    }), _ref)), (0, _defineProperty3['default'])(_style, '.' + CLASSES.title, {
      'font-weight': '500'
    }), (0, _defineProperty3['default'])(_style, '.' + CLASSES.message, {
      display: 'inline-block',
      'vertical-align': 'middle',
      width: '240px',
      padding: '0 12px'
    }), _style)
  };

  var exports = {
    config: defaultConfig,
    /**
     * @param  {String} message
     * @param  {String} title
     * @param  {String} type
     * @param  {Number} timeout
     * @param  {Function} cb
     * @param  {Object} config
     */
    showMessage: function showMessage(message, title, type, timeout, cb, config) {
      var newConfig = {};
      (0, _assign2['default'])(newConfig, this.config);
      (0, _assign2['default'])(newConfig, config);

      var notificationElem = document.createElement('div');
      notificationElem.className = CLASSES.notification + ' ' + CLASSES[type];

      notificationElem.onclick = function () {
        newConfig.animation(notificationElem, null);
      };

      if (title) {
        var titleElem = document.createElement('div');
        titleElem.className = CLASSES.title;
        titleElem.appendChild(document.createTextNode(title));
        notificationElem.appendChild(titleElem);
      }

      if (message) {
        var messageText = document.createElement('div');
        messageText.className = CLASSES.message;
        messageText.appendChild(document.createTextNode(message));
        notificationElem.appendChild(messageText);
      }

      newConfig.node.insertBefore(notificationElem, newConfig.node.firstChild);
      setTimeout(function () {
        return newConfig.animation(notificationElem, cb);
      }, timeout || newConfig.timeout);

      if (cb) cb();
      return this;
    },

    /**
     * @param  {Object} config
     * @return  {exports}
     */
    init: function init(config) {
      var _this2 = this;

      var newConfig = {};
      (0, _assign2['default'])(newConfig, defaultConfig);
      (0, _assign2['default'])(newConfig, config);

      var cssStr = makeCss(newConfig.style);
      appendStyles(cssStr);

      newConfig.node.id = '' + CLASSES.container;
      newConfig.node.className = '' + CLASSES.container;
      newConfig.appendTarget.appendChild(newConfig.node);

      (0, _keys2['default'])(newConfig.types).forEach(function (v) {
        /**
         * @param  {String} message
         * @param  {String} title
         * @param  {Number} timeout
         * @param  {Function} cb
         * @param  {Object} config
         * @return  {exports}
         */
        exports[newConfig.types[v]] = function (message, title, timeout, cb, config) {
          this.showMessage(message, title, newConfig.types[v], timeout, cb, config);
          return this;
        }.bind(_this2);
      });

      return this;
    }
  };

  return exports;
}();
return miniToastr;
}));
