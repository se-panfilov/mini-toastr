(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "./MessageType"], factory);
  }
})(function (require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  const MessageType_1 = require("./MessageType");
  // TODO (S.Panfilov) casting
  exports.ERROR_CLASS = `-${MessageType_1.ERROR}`;
  exports.WARN_CLASS = `-${MessageType_1.WARN}`;
  exports.SUCCESS_CLASS = `-${MessageType_1.SUCCESS}`;
  exports.INFO_CLASS = `-${MessageType_1.INFO}`;
});
