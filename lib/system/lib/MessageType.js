System.register([], function (exports_1, context_1) {
  "use strict";
  var ERROR, WARN, SUCCESS, INFO;
  var __moduleName = context_1 && context_1.id;
  return {
    setters: [],
    execute: function () {
      exports_1("ERROR", ERROR = 'error');
      exports_1("WARN", WARN = 'warn');
      exports_1("SUCCESS", SUCCESS = 'success');
      exports_1("INFO", INFO = 'info');
    }
  };
});
