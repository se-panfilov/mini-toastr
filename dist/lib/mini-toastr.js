"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_const_1 = require("./common.const");
var MessageClass_1 = require("./MessageClass");
var MessageType_1 = require("./MessageType");
var mini_toastr_error_class_1 = require("./mini-toastr-error.class");
var StyleClass_1 = require("./StyleClass");
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
    if (prefix === void 0) { prefix = common_const_1.EMPTY_STRING; }
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
    styleElem.id = common_const_1.LIB_NAME + "-styles";
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
    types: { ERROR: MessageType_1.ERROR, WARN: MessageType_1.WARN, SUCCESS: MessageType_1.SUCCESS, INFO: MessageType_1.INFO },
    animation: fadeOut,
    timeout: common_const_1.DEFAULT_TIMEOUT,
    icons: {},
    appendTarget: document.body,
    node: makeNode(),
    allowHtml: false,
    style: (_a = {},
        _a["." + StyleClass_1.CONTAINER_CLASS] = {
            position: 'fixed',
            'z-index': 99999,
            right: '12px',
            top: '12px'
        },
        _a["." + StyleClass_1.NOTIFICATION_CLASS] = (_b = {
                cursor: 'pointer',
                padding: '12px 18px',
                margin: '0 0 6px 0',
                'background-color': '#000',
                opacity: 0.8,
                color: '#fff',
                'border-radius': '3px',
                'box-shadow': '#3c3b3b 0 0 12px',
                width: '300px'
            },
            _b["&." + MessageClass_1.ERROR_CLASS] = {
                'background-color': '#D5122B'
            },
            _b["&." + MessageClass_1.WARN_CLASS] = {
                'background-color': '#F5AA1E'
            },
            _b["&." + MessageClass_1.SUCCESS_CLASS] = {
                'background-color': '#7AC13E'
            },
            _b["&." + MessageClass_1.INFO_CLASS] = {
                'background-color': '#4196E1'
            },
            _b['&:hover'] = {
                opacity: 1,
                'box-shadow': '#000 0 0 12px'
            },
            _b),
        _a["." + StyleClass_1.TITLE_CLASS] = {
            'font-weight': '500'
        },
        _a["." + StyleClass_1.MESSAGE_CLASS] = {
            display: 'inline-block',
            'vertical-align': 'middle',
            width: '240px',
            padding: '0 12px'
        },
        _a)
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
    if (type === MessageType_1.SUCCESS)
        return MessageClass_1.SUCCESS_CLASS;
    if (type === MessageType_1.WARN)
        return MessageClass_1.WARN_CLASS;
    if (type === MessageType_1.ERROR)
        return MessageClass_1.ERROR_CLASS;
    if (type === MessageType_1.INFO)
        return MessageClass_1.INFO_CLASS;
    throw new mini_toastr_error_class_1.MiniToastrError('Unknown class type. Check mini-toastr\'s config\s style section"');
}
var miniToastr = {
    config: config,
    isInitialised: false,
    showMessage: function (message, title, type, timeout, cb, overrideConf) {
        var config = __assign({}, this.config, overrideConf);
        var notificationElem = makeNode();
        notificationElem.className = StyleClass_1.NOTIFICATION_CLASS + " " + getTypeClass(type);
        notificationElem.onclick = function () { return config.animation(notificationElem); };
        if (title)
            addElem(notificationElem, title, StyleClass_1.TITLE_CLASS, config);
        if (config.icons[type])
            createIcon(notificationElem, type, config);
        if (message)
            addElem(notificationElem, message, StyleClass_1.MESSAGE_CLASS, config);
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
        this.config.node.id = StyleClass_1.CONTAINER_CLASS;
        this.config.node.className = StyleClass_1.CONTAINER_CLASS;
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
        attrs.class = attrs.class ? attrs.class + ' ' + StyleClass_1.ICON_CLASS : StyleClass_1.ICON_CLASS;
        this.config.icons[type] = { nodeType: nodeType, attrs: attrs };
        return this;
    }
};
exports.default = miniToastr;
var _a, _b;
//# sourceMappingURL=mini-toastr.js.map