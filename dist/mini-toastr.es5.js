/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

var LIB_NAME = 'mini-toastr';
var DEFAULT_TIMEOUT = 3000;
var EMPTY_STRING = '';

var ERROR = 'error';
var WARN = 'warn';
var SUCCESS = 'success';
var INFO = 'info';

var ERROR_CLASS = "-" + ERROR;
var WARN_CLASS = "-" + WARN;
var SUCCESS_CLASS = "-" + SUCCESS;
var INFO_CLASS = "-" + INFO;

var MiniToastrError = (function (_super) {
    __extends(MiniToastrError, _super);
    function MiniToastrError(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.name = 'MiniToastrError';
        return _this;
    }
    return MiniToastrError;
}(Error));

var NOTIFICATION = 'notification';
var CONTAINER_CLASS = LIB_NAME;
var NOTIFICATION_CLASS = LIB_NAME + "__" + NOTIFICATION;
var TITLE_CLASS = LIB_NAME + "-" + NOTIFICATION + "__title";
var ICON_CLASS = LIB_NAME + "-" + NOTIFICATION + "__icon";
var MESSAGE_CLASS = LIB_NAME + "-" + NOTIFICATION + "__message";

function fadeOut(element, cb) {
    var opacity = element.style.opacity ? +element.style.opacity : 0.9;
    if (opacity > 0.05) {
        opacity -= 0.05;
    }
    else if (opacity <= 0.1) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
            if (cb)
                cb();
        }
    }
    else {
        opacity = 0.9;
    }
    element.style.opacity = opacity.toString();
}
function flatten(obj, into, prefix) {
    if (obj === void 0) { obj = {}; }
    if (into === void 0) { into = {}; }
    if (prefix === void 0) { prefix = EMPTY_STRING; }
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            var prop = obj[k];
            if (prop && typeof prop === 'object' && !(prop instanceof Date || prop instanceof RegExp)) {
                flatten(prop, into, prefix + k + ' ');
            }
            else {
                if (into[prefix] && typeof into[prefix] === 'object') {
                    into[prefix][k] = prop;
                }
                else {
                    into[prefix] = {};
                    into[prefix][k] = prop;
                }
            }
        }
    }
    return into;
}
function makeCss(styles) {
    var flat = flatten(styles);
    var str = JSON.stringify(flat, null, 2);
    str = str.replace(/"([^"]*)": {/g, '$1 {')
        .replace(/"([^"]*)"/g, '$1')
        .replace(/(\w*-?\w*): ([\w\d .#]*),?/g, '$1: $2;')
        .replace(/},/g, '}\n')
        .replace(/ &([.:])/g, '$1');
    str = str.substr(1, str.lastIndexOf('}') - 1);
    return str;
}
function isStyleSheet(element) {
    return !!element.styleSheet;
}
function appendStyles(css) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var styleElem = makeNode('style');
    styleElem.id = LIB_NAME + "-styles";
    styleElem.type = 'text/css';
    if (isStyleSheet(styleElem)) {
        styleElem.styleSheet.cssText = css;
    }
    else {
        styleElem.appendChild(document.createTextNode(css));
    }
    head.appendChild(styleElem);
}
var config = {
    types: { ERROR: ERROR, WARN: WARN, SUCCESS: SUCCESS, INFO: INFO },
    animation: fadeOut,
    timeout: DEFAULT_TIMEOUT,
    icons: {},
    appendTarget: document.body,
    node: makeNode(),
    allowHtml: false,
    style: (_a = {}, _a["." + CONTAINER_CLASS] = {
            position: 'fixed',
            'z-index': 99999,
            right: '12px',
            top: '12px'
        }, _a["." + NOTIFICATION_CLASS] = (_b = {
                cursor: 'pointer',
                padding: '12px 18px',
                margin: '0 0 6px 0',
                'background-color': '#000',
                opacity: 0.8,
                color: '#fff',
                'border-radius': '3px',
                'box-shadow': '#3c3b3b 0 0 12px',
                width: '300px'
            }, _b["&." + ERROR_CLASS] = {
                'background-color': '#D5122B'
            }, _b["&." + WARN_CLASS] = {
                'background-color': '#F5AA1E'
            }, _b["&." + SUCCESS_CLASS] = {
                'background-color': '#7AC13E'
            }, _b["&." + INFO_CLASS] = {
                'background-color': '#4196E1'
            }, _b['&:hover'] = {
                opacity: 1,
                'box-shadow': '#000 0 0 12px'
            }, _b), _a["." + TITLE_CLASS] = {
            'font-weight': '500'
        }, _a["." + MESSAGE_CLASS] = {
            display: 'inline-block',
            'vertical-align': 'middle',
            width: '240px',
            padding: '0 12px'
        }, _a)
};
function makeNode(type) {
    if (type === void 0) { type = 'div'; }
    return document.createElement(type);
}
function createIcon(node, type, config) {
    var iconNode = makeNode(config.icons[type].nodeType);
    var attrs = config.icons[type].attrs;
    for (var k in attrs) {
        if (attrs.hasOwnProperty(k)) {
            iconNode.setAttribute(k, attrs[k]);
        }
    }
    node.appendChild(iconNode);
}
function addElem(node, text, className, config) {
    var elem = makeNode();
    elem.className = className;
    if (config.allowHtml) {
        elem.innerHTML = text;
    }
    else {
        elem.appendChild(document.createTextNode(text));
    }
    node.appendChild(elem);
}
function getTypeClass(type) {
    if (type === SUCCESS)
        return SUCCESS_CLASS;
    if (type === WARN)
        return WARN_CLASS;
    if (type === ERROR)
        return ERROR_CLASS;
    if (type === INFO)
        return INFO_CLASS;
    throw new MiniToastrError('Unknown class type. Check mini-toastr\'s config\s style section"');
}
var miniToastr = {
    config: config,
    isInitialised: false,
    showMessage: function (message, title, type, timeout, cb, overrideConf) {
        var config = __assign({}, this.config, overrideConf);
        var notificationElem = makeNode();
        notificationElem.className = NOTIFICATION_CLASS + " " + getTypeClass(type);
        notificationElem.onclick = function () { return config.animation(notificationElem); };
        if (title)
            addElem(notificationElem, title, TITLE_CLASS, config);
        if (config.icons[type])
            createIcon(notificationElem, type, config);
        if (message)
            addElem(notificationElem, message, MESSAGE_CLASS, config);
        config.node.insertBefore(notificationElem, config.node.firstChild);
        setTimeout(function () { return config.animation(notificationElem, cb); }, timeout || config.timeout);
        if (cb)
            cb();
        return this;
    },
    init: function (aConfig) {
        var _this = this;
        this.config = __assign({}, config, aConfig);
        var cssStr = makeCss(this.config.style);
        appendStyles(cssStr);
        this.config.node.id = CONTAINER_CLASS;
        this.config.node.className = CONTAINER_CLASS;
        this.config.appendTarget.appendChild(this.config.node);
        Object.keys(miniToastr.config.types).forEach(function (v) {
            miniToastr[miniToastr.config.types[v]] = function (message, title, timeout, cb, config) {
                miniToastr.showMessage(message, title, miniToastr.config.types[v], timeout, cb, config);
                return miniToastr;
            }.bind(_this);
        });
        this.isInitialised = true;
        return this;
    },
    setIcon: function (type, nodeType, attrs) {
        if (nodeType === void 0) { nodeType = 'i'; }
        if (attrs === void 0) { attrs = []; }
        attrs.class = attrs.class ? attrs.class + ' ' + ICON_CLASS : ICON_CLASS;
        this.config.icons[type] = { nodeType: nodeType, attrs: attrs };
        return this;
    }
};
var _a, _b;

export default miniToastr;
//# sourceMappingURL=mini-toastr.es5.js.map
