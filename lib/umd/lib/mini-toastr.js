(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "./Animations", "./MessageClass", "./MessageType", "./mini-toastr-error.class", "./StyleClass"], factory);
  }
})(function (require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  const Animations_1 = require("./Animations");
  const MessageClass_1 = require("./MessageClass");
  const MessageType_1 = require("./MessageType");
  const mini_toastr_error_class_1 = require("./mini-toastr-error.class");
  const StyleClass_1 = require("./StyleClass");
  const DEFAULT_TIMEOUT = 3000;
  const DEFAULT_NODE_TYPE = 'div';
  const config = {
    allowHtml: false,
    animation: Animations_1.fadeOut,
    appendTarget: document.body,
    icons: {},
    node: makeNode(DEFAULT_NODE_TYPE),
    timeout: DEFAULT_TIMEOUT,
    types: {
      ERROR: MessageType_1.ERROR,
      WARN: MessageType_1.WARN,
      SUCCESS: MessageType_1.SUCCESS,
      INFO: MessageType_1.INFO
    }
  };

  function makeNode(type = 'div') {
    return document.createElement(type);
  }

  function createIcon(node, type, config) {
    const iconNode = makeNode(config.icons[type].nodeType);
    const attrs = config.icons[type].attrs;
    for (const k in attrs) {
      if (attrs.hasOwnProperty(k)) {
        iconNode.setAttribute(k, attrs[k]);
      }
    }
    node.appendChild(iconNode);
  }

  function addElem(node, text, className, config) {
    const elem = makeNode();
    elem.className = className;
    if (config.allowHtml) {
      elem.innerHTML = text;
    } else {
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

  exports.miniToastr = {
    config,
    isInitialised: false,
    showMessage(message, title, type, timeout, cb, overrideConf) {
      const config = { ...this.config, ...overrideConf }; // TODO (S.Panfilov) "Config" casting
      const notificationElem = makeNode();
      notificationElem.className = `${StyleClass_1.NOTIFICATION_CLASS} ${getTypeClass(type)}`;
      notificationElem.onclick = () => config.animation(notificationElem);
      if (title)
        addElem(notificationElem, title, StyleClass_1.TITLE_CLASS, config);
      if (config.icons[type])
        createIcon(notificationElem, type, config);
      if (message)
        addElem(notificationElem, message, StyleClass_1.MESSAGE_CLASS, config);
      config.node.insertBefore(notificationElem, config.node.firstChild);
      setTimeout(() => config.animation(notificationElem, cb), timeout || config.timeout);
      if (cb)
        cb();
      return this;
    },
    init(aConfig) {
      this.config = { ...config, ...aConfig }; // TODO (S.Panfilov) "config" is a kinda global scope and "Config" casting
      this.config.node.id = StyleClass_1.CONTAINER_CLASS;
      this.config.node.className = StyleClass_1.CONTAINER_CLASS;
      this.config.appendTarget.appendChild(this.config.node);
      // Object.keys(this.config.types).forEach(v => {
      //     this[this.config.types[v]] = function (message: string, title: string, timeout: number, cb: Function, config: Config) {
      //       this.showMessage(message, title, this.config.types[v], timeout, cb, config)
      //       return this
      //     }.bind(this) // TODO (S.Panfilov) bind?
      //   }
      // )
      // TODO (S.Panfilov) check if it's working
      Object.keys(exports.miniToastr.config.types).forEach(v => {
        exports.miniToastr[exports.miniToastr.config.types[v]] = function (message, title, timeout, cb, config) {
          exports.miniToastr.showMessage(message, title, exports.miniToastr.config.types[v], timeout, cb, config);
          return exports.miniToastr;
        }.bind(this); // TODO (S.Panfilov) bind?
      });
      this.isInitialised = true;
      return this;
    },
    setIcon(type, nodeType = 'i', attrs = []) {
      attrs.class = attrs.class ? attrs.class + ' ' + StyleClass_1.ICON_CLASS : StyleClass_1.ICON_CLASS;
      this.config.icons[type] = { nodeType, attrs };
      return this;
    }
  };
});
