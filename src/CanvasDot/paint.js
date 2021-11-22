const RADIUS = 8;
const TAIL_LENGTH = 10;

function paint(config) {
  const { canvasCtx, currentFocus } = config;
  canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);

  if (currentFocus) {
    paintTail(config);
    paintDot(config);
  }
}

function paintTail({ canvasCtx, head, tail }) {
  // Add to the tail
  tail.push({ ...head });
  if (tail.length > TAIL_LENGTH) tail.shift();

  // Paint the tail
  if (tail.length > 3) {
    canvasCtx.beginPath();
    canvasCtx.moveTo(tail[0].x, tail[0].y);

    // Paint the tail arc ( follow the head )
    for (var i = 1; i < tail.length - 1; i++) {
      const p1 = tail[i];
      const p2 = tail[i + 1];
      canvasCtx.quadraticCurveTo(
        p1.x,
        p1.y,
        (p1.x + p2.x) / 2,
        (p1.y + p2.y) / 2
      );
    }

    canvasCtx.lineWidth = RADIUS;
    canvasCtx.lineCap = "round";
    canvasCtx.stroke();
  }
}

function paintDot({ canvasCtx, head }) {
  // Animate the head towards target x/y
  head.x += (head.tx - head.x) * 0.2;
  head.y += (head.ty - head.y) * 0.2;

  // Animate the head arc
  head.vx *= 0.8;
  head.x += head.vx;

  canvasCtx.beginPath();
  canvasCtx.arc(head.x, head.y, RADIUS, 0, Math.PI * 2);
  canvasCtx.fill();
}

export { paint };
