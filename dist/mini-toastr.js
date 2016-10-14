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

	var _defineProperty2 = __webpack_require__(1);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _stringify = __webpack_require__(5);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _typeof2 = __webpack_require__(8);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var miniToastr = function () {
	  'use strict';

	  var _ref, _style;

	  var PACKAGE_NAME = 'mini-toastr';

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
	    prefix = prefix || "";

	    for (var k in obj) {
	      if (obj.hasOwnProperty(k)) {
	        var prop = obj[k];
	        if (prop && (typeof prop === 'undefined' ? 'undefined' : (0, _typeof3['default'])(prop)) === "object" && !(prop instanceof Date || prop instanceof RegExp)) {
	          flatten(prop, into, prefix + k + " ");
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
	    str = str.replace(/"([^"]*)": \{/g, '$1 {');
	    str = str.replace(/"([^"]*)"/g, '$1');
	    str = str.replace(/(\w*-?\w*): ([\w\d .#]*),?/g, '$1: $2;');
	    str = str.replace(/},/g, '}\n');
	    str = str.replace(/( &\.)/g, '.');

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
	    timeOut: 5000,
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
	      // font: 'normal 13px \'Lucida Sans Unicode\', \'Lucida Grande\', Verdana, Arial, Helvetica, sans-serif',
	      'border-radius': '3px',
	      'box-shadow': '#3c3b3b 0 0 12px',
	      width: '300px'
	    }, (0, _defineProperty3['default'])(_ref, '&.' + CLASSES.error, {
	      'background-color': '#FF0000'
	    }), (0, _defineProperty3['default'])(_ref, '&.' + CLASSES.warn, {
	      'background-color': '#f9a937'
	    }), (0, _defineProperty3['default'])(_ref, '&.' + CLASSES.success, {
	      'background-color': '#73b573'
	    }), (0, _defineProperty3['default'])(_ref, '&.' + CLASSES.info, {
	      'background-color': '#58abc3'
	    }), (0, _defineProperty3['default'])(_ref, ':hover', {
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

	  /**
	   * @param  {String} message
	   * @param  {String} title
	   * @param  {String} type
	   * @param  {Number} timeout
	   * @param  {Function} cb
	   * @param  {Object} config
	   */
	  function showMessage(message, title, type, timeout, cb, config) {
	    config = config || exports.config;

	    var notificationElem = document.createElement('div');
	    notificationElem.className = CLASSES.notification + ' ' + CLASSES[type];

	    // notificationElem.onmouseover = function () {
	    //   // applyStyles(this, config.style.box.hover)
	    // }
	    // notificationElem.onmouseout = function () {
	    //   // applyStyles(this, config.style.box.base)
	    // }

	    notificationElem.onclick = function () {
	      this.style.display = 'none';
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
	    config.node.insertBefore(notificationElem, config.node.firstChild);

	    // TODO (S.Panfilov) revert
	    // setTimeout(function () {
	    //   fadeOut(notificationElem)
	    // }, timeout || config.timeOut)

	    if (cb) cb();
	  }

	  var exports = {
	    config: defaultConfig,
	    /**
	     * @param  {Object} config
	     * @return  {exports}
	     */
	    init: function init(config) {
	      this.config = config || defaultConfig;
	      // const cssObj = getCss(this.config)
	      // const cssStr = Object.keys(cssObj).map(v => `.${v} \{ ${cssObj[v]} \}`).join(' ')

	      var cssStr = makeCss(this.config.style);
	      console.info(cssStr);
	      appendStyles(cssStr);
	      this.config.node.id = '' + CLASSES.container;
	      this.config.node.className = '' + CLASSES.container;
	      this.config.appendTarget.appendChild(this.config.node);
	      return this;
	    },

	    /**
	     * @param  {String} message
	     * @param  {String} title
	     * @param  {Number} timeout
	     * @param  {Function} cb
	     * @param  {Object} config
	     * @return  {exports}
	     */
	    info: function info(message, title, timeout, cb, config) {
	      showMessage(message, title, TYPES.info, timeout, cb, config);
	      return this;
	    },

	    /**
	     * @param  {String} message
	     * @param  {String} title
	     * @param  {Number} timeout
	     * @param  {Function} cb
	     * @param  {Object} config
	     * @return  {exports}
	     */
	    warn: function warn(message, title, timeout, cb, config) {
	      showMessage(message, title, TYPES.warn, timeout, cb, config);
	    },

	    /**
	     * @param  {String} message
	     * @param  {String} title
	     * @param  {Number} timeout
	     * @param  {Function} cb
	     * @param  {Object} config
	     * @return  {exports}
	     */
	    success: function success(message, title, timeout, cb, config) {
	      showMessage(message, title, TYPES.success, timeout, cb, config);
	    },

	    /**
	     * @param  {String} message
	     * @param  {String} title
	     * @param  {Number} timeout
	     * @param  {Function} cb
	     * @param  {Object} config
	     * @return  {exports}
	     */
	    error: function error(message, title, timeout, cb, config) {
	      showMessage(message, title, TYPES.error, timeout, cb, config);
	    }
	  };

	  return exports;
	}();

	exports['default'] = miniToastr;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(2);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(4);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(7);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Symbol = __webpack_require__(9)["default"];

	exports["default"] = function (obj) {
	  return obj && obj.constructor === _Symbol ? "symbol" : typeof obj;
	};

	exports.__esModule = true;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(10), __esModule: true };

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(11);
	__webpack_require__(37);
	module.exports = __webpack_require__(7).Symbol;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(4)
	  , global         = __webpack_require__(12)
	  , has            = __webpack_require__(13)
	  , DESCRIPTORS    = __webpack_require__(14)
	  , $export        = __webpack_require__(16)
	  , redefine       = __webpack_require__(19)
	  , $fails         = __webpack_require__(15)
	  , shared         = __webpack_require__(22)
	  , setToStringTag = __webpack_require__(23)
	  , uid            = __webpack_require__(25)
	  , wks            = __webpack_require__(24)
	  , keyOf          = __webpack_require__(26)
	  , $names         = __webpack_require__(31)
	  , enumKeys       = __webpack_require__(32)
	  , isArray        = __webpack_require__(33)
	  , anObject       = __webpack_require__(34)
	  , toIObject      = __webpack_require__(27)
	  , createDesc     = __webpack_require__(21)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });

	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };

	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(36)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});

	setter = true;

	$export($export.G + $export.W, {Symbol: $Symbol});

	$export($export.S, 'Symbol', symbolStatics);

	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 12 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 13 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(15)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(12)
	  , core      = __webpack_require__(7)
	  , ctx       = __webpack_require__(17)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(18);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(20);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(4)
	  , createDesc = __webpack_require__(21);
	module.exports = __webpack_require__(14) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(12)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(4).setDesc
	  , has = __webpack_require__(13)
	  , TAG = __webpack_require__(24)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(22)('wks')
	  , uid    = __webpack_require__(25)
	  , Symbol = __webpack_require__(12).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(4)
	  , toIObject = __webpack_require__(27);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(28)
	  , defined = __webpack_require__(30);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(29);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(27)
	  , getNames  = __webpack_require__(4).getNames
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(4);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(29);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(35);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 37 */
/***/ function(module, exports) {

	

/***/ }
/******/ ])
});
;