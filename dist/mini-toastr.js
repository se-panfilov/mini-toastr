(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("MiniToastr", [], factory);
	else if(typeof exports === 'object')
		exports["MiniToastr"] = factory();
	else
		root["MiniToastr"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var miniToastr = function () {
	  'use strict';

	  /**
	   * @param  {Node} element
	   * @param  {Object} styleObj
	   */

	  function applyStyles(element, styleObj) {
	    return (0, _keys2['default'])(styleObj).forEach(function (v) {
	      return element.style[v] = styleObj[v];
	    });
	  }

	  /**
	   * @param  {Node} element
	   */
	  function fadeOut(element) {
	    var _this = this;

	    if (element.style.opacity && element.style.opacity > 0.05) {
	      element.style.opacity = element.style.opacity - 0.05;
	    } else if (element.style.opacity && element.style.opacity <= 0.1) {
	      if (element.parentNode) {
	        element.parentNode.removeChild(element);
	      }
	    } else {
	      element.style.opacity = 0.9;
	    }
	    setTimeout(function () {
	      return fadeOut.apply(_this, [element]);
	    }, 1000 / 30);
	  }

	  var defaultConfig = {
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
	  };

	  /**
	   * @param  {String} message
	   * @param  {String} title
	   * @param  {type} title
	   * @param  {Number} timeout
	   * @param  {Function} cb
	   */
	  function showMessage(message, title, type, timeout, cb) {
	    var notificationElem = document.createElement('div');
	    applyStyles(notificationElem, config.style.box.base);

	    notificationElem.onmouseover = function () {
	      applyStyles(this, config.style.box.hover);
	    };
	    notificationElem.onmouseout = function () {
	      applyStyles(this, config.style.box.base);
	    };
	    notificationElem.onclick = function () {
	      this.style.display = 'none';
	    };

	    var textElem = document.createElement('div');
	    applyStyles(textElem, config.style.text);

	    notificationElem.appendChild(textElem);

	    if (title) {
	      var titleText = document.createElement('div');
	      applyStyles(titleText, config.style.title);
	      titleText.appendChild(document.createTextNode(title));
	      textElem.appendChild(titleText);
	    }

	    if (message) {
	      var messageText = document.createElement('div');
	      messageText.appendChild(document.createTextNode(message));
	      textElem.appendChild(messageText);
	    }
	    config.node.insertBefore(notificationElem, config.node.firstChild);

	    setTimeout(function () {
	      fadeOut(notificationElem);
	    }, timeout || config.timeOut);

	    if (cb) cb();
	  }

	  var exports = {
	    /**
	     * @param  {Object} config
	     * @return  {exports}
	     */
	    init: function init(config) {
	      config = config || defaultConfig;
	      applyStyles(config.node, config.style.container);
	      config.node.id = 'qqq';
	      config.appendTarget.appendChild(config.node);
	      return this;
	    },

	    /**
	     * @param  {String} message
	     * @param  {String} title
	     * @param  {Number} timeout
	     * @param  {Function} cb
	     * @return  {exports}
	     */
	    info: function info(message, title, timeout, cb) {
	      showMessage(message, title, 'info', timeout, cb);
	      return this;
	    },

	    /**
	     * @param  {String} message
	     * @param  {String} title
	     * @param  {Number} timeout
	     * @param  {Function} cb
	     * @return  {exports}
	     */
	    warning: function warning(message, title, timeout, cb) {
	      showMessage(message, title, 'warning', timeout, cb);
	    },

	    /**
	     * @param  {String} message
	     * @param  {String} title
	     * @param  {Number} timeout
	     * @param  {Function} cb
	     * @return  {exports}
	     */
	    success: function success(message, title, timeout, cb) {
	      showMessage(message, title, 'success', timeout, cb);
	    },

	    /**
	     * @param  {String} message
	     * @param  {String} title
	     * @param  {Number} timeout
	     * @param  {Function} cb
	     * @return  {exports}
	     */
	    error: function error(message, title, timeout, cb) {
	      showMessage(message, title, 'error', timeout, cb);
	    }
	  };

	  return exports;
	}();

	exports['default'] = miniToastr;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(3);
	module.exports = __webpack_require__(9).Object.keys;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(4);

	__webpack_require__(6)('keys', function ($keys) {
	  return function keys(it) {
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(5);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(7),
	    core = __webpack_require__(9),
	    fails = __webpack_require__(12);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY],
	      exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () {
	    fn(1);
	  }), 'Object', exp);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var global = __webpack_require__(8),
	    core = __webpack_require__(9),
	    ctx = __webpack_require__(10),
	    PROTOTYPE = 'prototype';

	var $export = function $export(type, name, source) {
	  var IS_FORCED = type & $export.F,
	      IS_GLOBAL = type & $export.G,
	      IS_STATIC = type & $export.S,
	      IS_PROTO = type & $export.P,
	      IS_BIND = type & $export.B,
	      IS_WRAP = type & $export.W,
	      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
	      target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
	      key,
	      own,
	      out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? function (C) {
	      var F = function F(param) {
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	      // make static versions for prototype methods
	    }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if (IS_PROTO) (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var core = module.exports = { version: '1.2.6' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// optional / simple context binding
	var aFunction = __webpack_require__(11);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ }
/******/ ])
});
;