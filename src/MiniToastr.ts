import { Config } from './Config'
import { MessageType } from './MessageType'

export interface MiniToastr {
  config: Config,
  isInitialised: boolean,

  showMessage (message: string, title: string, type: MessageType, timeout: Number, cb: Function, overrideConf: Config): MiniToastr,

  init (aConfig: Config): MiniToastr,

  setIcon (type: string, nodeType: string, attrs: ReadonlyArray<string>): MiniToastr
}
