System.register(["./Animations", "./MessageClass", "./MessageType", "./mini-toastr-error.class", "./StyleClass"], function (exports_1, context_1) {
  "use strict";
  var Animations_1, MessageClass_1, MessageType_1, mini_toastr_error_class_1, StyleClass_1, DEFAULT_TIMEOUT,
    DEFAULT_NODE_TYPE, config, miniToastr;
  var __moduleName = context_1 && context_1.id;

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

  return {
    setters: [
      function (Animations_1_1) {
        Animations_1 = Animations_1_1;
      },
      function (MessageClass_1_1) {
        MessageClass_1 = MessageClass_1_1;
      },
      function (MessageType_1_1) {
        MessageType_1 = MessageType_1_1;
      },
      function (mini_toastr_error_class_1_1) {
        mini_toastr_error_class_1 = mini_toastr_error_class_1_1;
      },
      function (StyleClass_1_1) {
        StyleClass_1 = StyleClass_1_1;
      }
    ],
    execute: function () {
      DEFAULT_TIMEOUT = 3000;
      DEFAULT_NODE_TYPE = 'div';
      config = {
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
      exports_1("miniToastr", miniToastr = {
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
          Object.keys(miniToastr.config.types).forEach(v => {
            miniToastr[miniToastr.config.types[v]] = function (message, title, timeout, cb, config) {
              miniToastr.showMessage(message, title, miniToastr.config.types[v], timeout, cb, config);
              return miniToastr;
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
      });
    }
  };
});
