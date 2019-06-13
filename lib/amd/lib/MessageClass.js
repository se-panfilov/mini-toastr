define(["require", "exports", "./MessageType"], function (require, exports, MessageType_1) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  // TODO (S.Panfilov) casting
  exports.ERROR_CLASS = `-${MessageType_1.ERROR}`;
  exports.WARN_CLASS = `-${MessageType_1.WARN}`;
  exports.SUCCESS_CLASS = `-${MessageType_1.SUCCESS}`;
  exports.INFO_CLASS = `-${MessageType_1.INFO}`;
});
