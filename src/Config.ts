import { MessageType } from './MessageType'
import { StyleClassObject } from './StyleClassObject'

export interface Config {
  types?: {
    [prop: string]: MessageType
  },
  animation?: (element: HTMLElement, cb?: Function) => void,
  timeout?: number,
  icons?: Object,
  appendTarget?: HTMLElement,
  node?: Node,
  allowHtml?: boolean,
  style?: {
    [property: string]: StyleClassObject
  }
}