(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports"], factory);
  }
})(function (require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  const LIB_NAME = 'mini-toastr';
  const NOTIFICATION = 'notification';
  // TODO (S.Panfilov) casting
  exports.CONTAINER_CLASS = LIB_NAME;
  exports.NOTIFICATION_CLASS = `${LIB_NAME}__${NOTIFICATION}`;
  exports.TITLE_CLASS = `${LIB_NAME}-${NOTIFICATION}__title`;
  exports.ICON_CLASS = `${LIB_NAME}-${NOTIFICATION}__icon`;
  exports.MESSAGE_CLASS = `${LIB_NAME}-${NOTIFICATION}__message`;
});
