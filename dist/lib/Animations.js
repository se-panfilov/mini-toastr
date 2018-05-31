"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fadeOut(element, cb) {
    var opacity = element.style.opacity ? +element.style.opacity : 0.9;
    if (opacity > 0.05) {
        opacity -= 0.05;
    }
    else if (opacity <= 0.1) {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
            if (cb)
                cb();
        }
    }
    else {
        opacity = 0.9;
    }
    element.style.opacity = opacity.toString();
}
exports.fadeOut = fadeOut;
//# sourceMappingURL=Animations.js.map