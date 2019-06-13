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

  function fadeOut(element, cb) {
    let opacity = element.style.opacity ? +element.style.opacity : 0.9;
    if (opacity > 0.05) {
      opacity -= 0.05;
    } else if (opacity <= 0.1) {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
        if (cb)
          cb();
      }
    } else {
      opacity = 0.9;
    }
    element.style.opacity = opacity.toString();
    // setTimeout(() => fadeOut.apply((<any>this), [element, cb]), 1000 / 30) // TODO (S.Panfilov) wtf is this here?
  }

  exports.fadeOut = fadeOut;
});
