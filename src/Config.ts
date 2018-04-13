import { MessageType } from './MessageType'
import { StyleClassObject } from './StyleClassObject'

export interface Config {
  types: MessageType,
  animation: (element: HTMLElement, cb?: Function) => void,
  timeout: number,
  icons: Object,
  appendTarget: HTMLElement,
  node: (type: string) => HTMLElement,
  allowHtml: boolean,
  style: {
    [property: string]: StyleClassObject
  }
}