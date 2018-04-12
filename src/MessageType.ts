export interface MessageType {
  ERROR,
  WARN,
  SUCCESS,
  INFO
}

enum types {
  ERROR = 'error',
  WARN = 'warn',
  SUCCESS = 'success',
  INFO = 'info'
}

export type MessageType =
  types.ERROR
  | types.WARN
  | types.SUCCESS
  | types.INFO

export const MessageType = {
  ERROR: types.ERROR as MessageType,
  WARN: types.WARN as MessageType,
  SUCCESS: types.SUCCESS as MessageType,
  INFO: types.INFO as MessageType,
}
