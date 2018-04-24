import { Config, FullConfig } from './Config'
import { MessageType } from './MessageType'

export interface MiniToastr {
  config: FullConfig,
  isInitialised: boolean,

  showMessage (message: string, title: string, type: MessageType, timeout: Number, cb: Function, overrideConf: Config): MiniToastr,

  init (aConfig: Config): MiniToastr,

  setIcon (type: string, nodeType: string, attrs: ReadonlyArray<string>): MiniToastr,

  [additionalProperties: string]: // TODO (S.Panfilov) "any" - isn't good (should be functions)
    ((message: string, title: string, timeout: number, cb: Function, config: Config) => MiniToastr) | any
}
