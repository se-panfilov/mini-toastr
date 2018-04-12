import { LIB_NAME } from './common.const'

const NOTIFICATION = 'notification'

enum classes {
  CONTAINER_CLASS = LIB_NAME,
  NOTIFICATION_CLASS = `${LIB_NAME}__${NOTIFICATION}`,
  TITLE_CLASS = `${LIB_NAME}-${NOTIFICATION}__title`,
  ICON_CLASS = `${LIB_NAME}-${NOTIFICATION}__icon`,
  MESSAGE_CLASS = `${LIB_NAME}-${NOTIFICATION}__message`,
}

export type StyleClass =
  classes.CONTAINER_CLASS
  | classes.TITLE_CLASS
  | classes.NOTIFICATION_CLASS
  | classes.ICON_CLASS
  | classes.MESSAGE_CLASS

export const StyleClass = {
  CONTAINER_CLASS: classes.CONTAINER_CLASS as StyleClass,
  NOTIFICATION_CLASS: classes.NOTIFICATION_CLASS as StyleClass,
  TITLE_CLASS: classes.TITLE_CLASS as StyleClass,
  ICON_CLASS: classes.ICON_CLASS as StyleClass,
  MESSAGE_CLASS: classes.MESSAGE_CLASS as StyleClass
}
