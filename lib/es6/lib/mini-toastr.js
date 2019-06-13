import { fadeOut } from './Animations';
import { ERROR_CLASS, INFO_CLASS, SUCCESS_CLASS, WARN_CLASS } from './MessageClass';
import { ERROR, INFO, SUCCESS, WARN } from './MessageType';
import { MiniToastrError } from './mini-toastr-error.class';
import { CONTAINER_CLASS, ICON_CLASS, MESSAGE_CLASS, NOTIFICATION_CLASS, TITLE_CLASS } from './StyleClass';

const DEFAULT_TIMEOUT = 3000;
const DEFAULT_NODE_TYPE = 'div';
const config = {
  allowHtml: false,
  animation: fadeOut,
  appendTarget: document.body,
  icons: {},
  node: makeNode(DEFAULT_NODE_TYPE),
  timeout: DEFAULT_TIMEOUT,
  types: { ERROR, WARN, SUCCESS, INFO }
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

export const miniToastr = {
  config,
  isInitialised: false,
  showMessage(message, title, type, timeout, cb, overrideConf) {
    const config = { ...this.config, ...overrideConf }; // TODO (S.Panfilov) "Config" casting
    const notificationElem = makeNode();
    notificationElem.className = `${NOTIFICATION_CLASS} ${getTypeClass(type)}`;
    notificationElem.onclick = () => config.animation(notificationElem);
    if (title)
      addElem(notificationElem, title, TITLE_CLASS, config);
    if (config.icons[type])
      createIcon(notificationElem, type, config);
    if (message)
      addElem(notificationElem, message, MESSAGE_CLASS, config);
    config.node.insertBefore(notificationElem, config.node.firstChild);
    setTimeout(() => config.animation(notificationElem, cb), timeout || config.timeout);
    if (cb)
      cb();
    return this;
  },
  init(aConfig) {
    this.config = { ...config, ...aConfig }; // TODO (S.Panfilov) "config" is a kinda global scope and "Config" casting
    this.config.node.id = CONTAINER_CLASS;
    this.config.node.className = CONTAINER_CLASS;
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
    attrs.class = attrs.class ? attrs.class + ' ' + ICON_CLASS : ICON_CLASS;
    this.config.icons[type] = { nodeType, attrs };
    return this;
  }
};
