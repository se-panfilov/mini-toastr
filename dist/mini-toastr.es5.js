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

var LIB_NAME = 'mini-toastr';
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

var DEFAULT_TIMEOUT = 3000;
var DEFAULT_NODE_TYPE = 'div';
var config = {
    types: { ERROR: ERROR, WARN: WARN, SUCCESS: SUCCESS, INFO: INFO },
    animation: fadeOut,
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

export default miniToastr;
//# sourceMappingURL=mini-toastr.es5.js.map
