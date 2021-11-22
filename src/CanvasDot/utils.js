function switchToRedDot(canvasCtx) {
  canvasCtx.strokeStyle = "#ff0000";
  canvasCtx.fillStyle = "#ff0000";
}

function switchToGreenDot(canvasCtx) {
  canvasCtx.strokeStyle = "#2c8660";
  canvasCtx.fillStyle = "#40cb90";
}

function isElementInvalid(ele) {
  return ele.name && !ele.checkValidity();
}

function handleValidationError(event, canvasCtx) {
  const firstInvalidEle = Array.from(event.target).find(isElementInvalid);
  if (firstInvalidEle) {
    firstInvalidEle.focus();
    switchToRedDot(canvasCtx);
  }
}

function handleOnChange(event, canvasCtx) {
  if (isElementInvalid(event.target)) {
    switchToRedDot(canvasCtx);
  } else {
    switchToGreenDot(canvasCtx);
  }
}

function addOnChangeEventsToForm(form, canvasCtx) {
  Array.from(form.children).forEach((ele) => {
    ele.oninput = (event) => {
      handleOnChange(event, canvasCtx);
    };
  });
}

export {
  switchToRedDot,
  switchToGreenDot,
  isElementInvalid,
  handleValidationError,
  addOnChangeEventsToForm
};
