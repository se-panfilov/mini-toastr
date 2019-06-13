System.register(["./MessageType"], function (exports_1, context_1) {
  "use strict";
  var MessageType_1, ERROR_CLASS, WARN_CLASS, SUCCESS_CLASS, INFO_CLASS;
  var __moduleName = context_1 && context_1.id;
  return {
    setters: [
      function (MessageType_1_1) {
        MessageType_1 = MessageType_1_1;
      }
    ],
    execute: function () {
      // TODO (S.Panfilov) casting
      exports_1("ERROR_CLASS", ERROR_CLASS = `-${MessageType_1.ERROR}`);
      exports_1("WARN_CLASS", WARN_CLASS = `-${MessageType_1.WARN}`);
      exports_1("SUCCESS_CLASS", SUCCESS_CLASS = `-${MessageType_1.SUCCESS}`);
      exports_1("INFO_CLASS", INFO_CLASS = `-${MessageType_1.INFO}`);
    }
  };
});
