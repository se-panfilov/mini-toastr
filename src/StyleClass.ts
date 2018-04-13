import { LIB_NAME } from './common.const'

const NOTIFICATION = 'notification'

// TODO (S.Panfilov) hardcode
export type StyleClass = 'mini-toastr'
  | 'mini-toastr__notification'
  | 'mini-toastr-notification__title'
  | 'mini-toastr-notification__icon'
  | 'mini-toastr-notification__message'

// TODO (S.Panfilov) casting
export const CONTAINER_CLASS: StyleClass = LIB_NAME as StyleClass
export const NOTIFICATION_CLASS: StyleClass = `${LIB_NAME}__${NOTIFICATION}` as StyleClass
export const TITLE_CLASS: StyleClass = `${LIB_NAME}-${NOTIFICATION}__title` as StyleClass
export const ICON_CLASS: StyleClass = `${LIB_NAME}-${NOTIFICATION}__icon` as StyleClass
export const MESSAGE_CLASS: StyleClass = `${LIB_NAME}-${NOTIFICATION}__message` as StyleClass