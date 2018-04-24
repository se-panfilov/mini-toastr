import { MessageType } from './MessageType'
import { StyleClassObject } from './StyleClassObject'

export interface Config {
  types?: {
    [prop: string]: MessageType
  },
  animation?: (element: HTMLElement, cb?: Function) => void,
  timeout?: number,
  icons?: Icons,
  appendTarget?: HTMLElement,
  node?: HTMLElement,
  allowHtml: boolean,
  style?: Styles
}

export interface FullConfig extends Config {
  types: {
    [prop: string]: MessageType
  },
  animation: (element: HTMLElement, cb?: Function) => void,
  timeout: number,
  icons: Icons,
  appendTarget: HTMLElement,
  node: HTMLElement,
  allowHtml: boolean,
  style: Styles
}

export interface Styles {
  [property: string]: StyleClassObject
}

export interface Icons {
  [prop: string]: Icon
}

export interface Icon {
  id?: string
  nodeType?: string // TODO (S.Panfilov) check nodeType type
  attrs?: any // TODO (S.Panfilov) check attrs type
}