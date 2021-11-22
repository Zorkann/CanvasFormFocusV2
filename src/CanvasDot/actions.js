const RADIUS = 8;

function focus({ currentFocus, head }) {
  if (!currentFocus) return;
  // Place on the left of the input
  // Get the left side of input and minus some pixel to move to the left
  head.tx = currentFocus.offsetLeft - 12 - RADIUS;

  // Place in the middle of the focused input
  // Get current focus value from top, then add element height devided by 2, to place the dot in the middle of the element
  head.ty = currentFocus.offsetTop + currentFocus.offsetHeight / 2;
  // Slide from, initial focus paint
  if (typeof head.x !== "number") {
    head.x = head.tx;
    head.y = head.ty;
  }

  // Arc beetwen slides
  head.vx = -8 - Math.abs(head.tx - head.x) / 5;
}

function resize({ canvasCtx }) {
  const strokeStyle = canvasCtx.strokeStyle;
  const fillStyle = canvasCtx.fillStyle;
  const parentElement = canvasCtx.canvas.parentElement;
  const dpr = window.devicePixelRatio || 1;
  canvasCtx.canvas.width = parentElement.clientWidth * dpr;
  canvasCtx.canvas.height = parentElement.clientHeight * dpr;
  canvasCtx.scale(dpr, dpr);
  canvasCtx.strokeStyle = strokeStyle;
  canvasCtx.fillStyle = fillStyle;
}

export { focus, resize };
