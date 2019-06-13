System.register([], function (exports_1, context_1) {
  "use strict";
  var MiniToastrError;
  var __moduleName = context_1 && context_1.id;
  return {
    setters: [],
    execute: function () {
      MiniToastrError = class MiniToastrError extends Error {
        constructor(message) {
          super(message);
          this.message = message;
          this.name = 'MiniToastrError';
        }
      };
      exports_1("MiniToastrError", MiniToastrError);
    }
  };
});
