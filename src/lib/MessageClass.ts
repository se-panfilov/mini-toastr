import { ERROR, INFO, SUCCESS, WARN } from './MessageType';

// TODO (S.Panfilov) hardcode
export declare type MessageClass = '-error' | '-warn' | '-success' | '-info';

// TODO (S.Panfilov) casting
export const ERROR_CLASS: MessageClass = `-${ ERROR }` as MessageClass;
export const WARN_CLASS: MessageClass = `-${ WARN }` as MessageClass;
export const SUCCESS_CLASS: MessageClass = `-${ SUCCESS }` as MessageClass;
export const INFO_CLASS: MessageClass = `-${ INFO }` as MessageClass;