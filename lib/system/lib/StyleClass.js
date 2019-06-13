System.register([], function (exports_1, context_1) {
  "use strict";
  var LIB_NAME, NOTIFICATION, CONTAINER_CLASS, NOTIFICATION_CLASS, TITLE_CLASS, ICON_CLASS, MESSAGE_CLASS;
  var __moduleName = context_1 && context_1.id;
  return {
    setters: [],
    execute: function () {
      LIB_NAME = 'mini-toastr';
      NOTIFICATION = 'notification';
      // TODO (S.Panfilov) casting
      exports_1("CONTAINER_CLASS", CONTAINER_CLASS = LIB_NAME);
      exports_1("NOTIFICATION_CLASS", NOTIFICATION_CLASS = `${LIB_NAME}__${NOTIFICATION}`);
      exports_1("TITLE_CLASS", TITLE_CLASS = `${LIB_NAME}-${NOTIFICATION}__title`);
      exports_1("ICON_CLASS", ICON_CLASS = `${LIB_NAME}-${NOTIFICATION}__icon`);
      exports_1("MESSAGE_CLASS", MESSAGE_CLASS = `${LIB_NAME}-${NOTIFICATION}__message`);
    }
  };
});
