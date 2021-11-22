import { paint } from "./paint";
import { resize, focus } from "./actions";
import { isElementInvalid, switchToRedDot, switchToGreenDot } from "./utils";

function registerEvents(config, formRef, error) {
  const form = formRef.current;

  function resizeHandler() {
    requestAnimationFrame(() => {
      resize(config.current);
      focus(config.current);
      paint(config.current);
    });
  }

  function scrollHandler() {
    requestAnimationFrame(() => {
      focus(config.current);
      paint(config.current);
    });
  }

  function focusHandler({ target }) {
    if (isElementInvalid(target) && error) {
      switchToRedDot(config.current.canvasCtx);
    } else {
      switchToGreenDot(config.current.canvasCtx);
    }
    focus({ currentFocus: target, head: config.current.head });
    config.current.currentFocus = target;
  }

  function outsideFocusHandler({ target }) {
    if (!form.contains(target)) {
      config.current.currentFocus = null;
    }
  }

  document.addEventListener("focus", outsideFocusHandler, true);
  form.addEventListener("focus", focusHandler, true);
  window.addEventListener("resize", resizeHandler, true);
  window.addEventListener("scroll", scrollHandler, true);

  function removeEvents() {
    document.removeEventListener("focus", outsideFocusHandler, true);
    form.removeEventListener("focus", focusHandler, true);
    window.removeEventListener("resize", resizeHandler, true);
    window.removeEventListener("scroll", scrollHandler, true);
  }

  return removeEvents;
}

export { registerEvents };
