export function fadeOut(element, cb) {
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
