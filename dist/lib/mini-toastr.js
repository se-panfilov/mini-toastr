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
var MessageClass_1 = require("./MessageClass");
var MessageType_1 = require("./MessageType");
var mini_toastr_error_class_1 = require("./mini-toastr-error.class");
var StyleClass_1 = require("./StyleClass");
var Animations_1 = require("./Animations");
var DEFAULT_TIMEOUT = 3000;
var DEFAULT_NODE_TYPE = 'div';
var config = {
    types: { ERROR: MessageType_1.ERROR, WARN: MessageType_1.WARN, SUCCESS: MessageType_1.SUCCESS, INFO: MessageType_1.INFO },
    animation: Animations_1.fadeOut,
    timeout: DEFAULT_TIMEOUT,
    icons: {},
    appendTarget: document.body,
    node: makeNode(DEFAULT_NODE_TYPE),
    allowHtml: false
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
//# sourceMappingURL=mini-toastr.js.map