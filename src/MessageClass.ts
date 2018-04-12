import { MessageType } from './MessageType'

enum classes {
  ERROR_CLASS = `-${MessageType.ERROR}`,
  WARN_CLASS = `-${MessageType.WARN}`,
  SUCCESS_CLASS = `-${MessageType.SUCCESS}`,
  INFO_CLASS = `-${MessageType.INFO}`
}

export type MessageClass =
  classes.ERROR_CLASS
  | classes.WARN_CLASS
  | classes.SUCCESS_CLASS
  | classes.INFO_CLASS

export const MessageClass = {
  ERROR_CLASS: classes.ERROR_CLASS as MessageClass,
  WARN_CLASS: classes.WARN_CLASS as MessageClass,
  SUCCESS_CLASS: classes.SUCCESS_CLASS as MessageClass,
  INFO_CLASS: classes.INFO_CLASS as MessageClass
}
