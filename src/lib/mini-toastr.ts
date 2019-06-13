import { fadeOut } from './Animations';
import { Config, FullConfig } from './Config';
import { ERROR_CLASS, INFO_CLASS, MessageClass, SUCCESS_CLASS, WARN_CLASS } from './MessageClass';
import { ERROR, INFO, MessageType, SUCCESS, WARN } from './MessageType';
import { MiniToastrError } from './mini-toastr-error.class';
import { MiniToastr } from './MiniToastr';
import { CONTAINER_CLASS, ICON_CLASS, MESSAGE_CLASS, NOTIFICATION_CLASS, TITLE_CLASS } from './StyleClass';

const DEFAULT_TIMEOUT: number = 3000;
const DEFAULT_NODE_TYPE: string = 'div';

const config: FullConfig = {
  allowHtml: false,
  animation: fadeOut,
  appendTarget: document.body,
  icons: {},
  node: makeNode(DEFAULT_NODE_TYPE),
  timeout: DEFAULT_TIMEOUT,
  types: { ERROR, WARN, SUCCESS, INFO }
};

function makeNode(type: string = 'div'): HTMLElement {
  return document.createElement(type);
}

function createIcon(node: HTMLElement, type: MessageType, config: FullConfig): void {
  const iconNode = makeNode(config.icons[type].nodeType);
  const attrs = config.icons[type].attrs;

  for (const k in attrs) {
    if (attrs.hasOwnProperty(k)) {
      iconNode.setAttribute(k, attrs[k]);
    }
  }

  node.appendChild(iconNode);
}

function addElem(node: HTMLElement, text: string, className: string, config: FullConfig): void {
  const elem = makeNode();
  elem.className = className;
  if (config.allowHtml) {
    elem.innerHTML = text;
  } else {
    elem.appendChild(document.createTextNode(text));
  }
  node.appendChild(elem);
}

function getTypeClass(type: MessageType): MessageClass {
  if (type === SUCCESS) return SUCCESS_CLASS;
  if (type === WARN) return WARN_CLASS;
  if (type === ERROR) return ERROR_CLASS;
  if (type === INFO) return INFO_CLASS;

  throw new MiniToastrError('Unknown class type. Check mini-toastr\'s config\s style section"');
}

export const miniToastr: MiniToastr = {
  config,
  isInitialised: false,
  showMessage(message: string, title: string, type: MessageType, timeout: number, cb: Function, overrideConf: Config): MiniToastr {
    const config = { ...this.config, ...overrideConf } as FullConfig; // TODO (S.Panfilov) "Config" casting

    const notificationElem = makeNode();
    notificationElem.className = `${ NOTIFICATION_CLASS } ${ getTypeClass(type) }`;
    notificationElem.onclick = () => config.animation(notificationElem);

    if (title) addElem(notificationElem, title, TITLE_CLASS, config);
    if (config.icons[type]) createIcon(notificationElem, type, config);
    if (message) addElem(notificationElem, message, MESSAGE_CLASS, config);

    config.node.insertBefore(notificationElem, config.node.firstChild);
    setTimeout(() => config.animation(notificationElem, cb), timeout || config.timeout
    );

    if (cb) cb();
    return this;
  },
  init(aConfig: Config): MiniToastr {
    this.config = { ...config, ...aConfig } as FullConfig; // TODO (S.Panfilov) "config" is a kinda global scope and "Config" casting

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
        miniToastr[miniToastr.config.types[v]] = function (message: string, title: string, timeout: number, cb: Function, config: Config) {
          miniToastr.showMessage(message, title, miniToastr.config.types[v], timeout, cb, config);
          return miniToastr;
        }.bind(this); // TODO (S.Panfilov) bind?
      }
    );

    this.isInitialised = true;

    return this;
  },
  setIcon(type: string, nodeType: string = 'i', attrs: any = []): MiniToastr { // TODO (S.Panfilov) attrs is any
    attrs.class = attrs.class ? attrs.class + ' ' + ICON_CLASS : ICON_CLASS;

    this.config.icons[type] = { nodeType, attrs };

    return this;
  }
};