import { useRef, useEffect, useState, useCallback } from "react";
import { paint } from "./paint";
import { resize } from "./actions";
import { addOnChangeEventsToForm, handleValidationError } from "./utils";
import { registerEvents } from "./events";
import "../styles.css";

const useCanvasDot = (formRef) => {
  const [error, setError] = useState(false);
  const canvasRef = useRef();
  const config = useRef({
    canvasCtx: undefined,
    head: {},
    tail: [],
    currentFocus: undefined
  });

  const redraw = useCallback(() => {
    paint(config.current);
    requestAnimationFrame(redraw);
  }, []);

  useEffect(() => {
    config.current.canvasCtx = canvasRef.current.getContext("2d");
    resize(config.current);
    redraw();
    addOnChangeEventsToForm(formRef.current, config.current.canvasCtx);
  }, [formRef, redraw]);

  useEffect(() => {
    const removeEvents = registerEvents(config, formRef, error);
    return () => {
      removeEvents();
    };
  }, [error, formRef]);

  function handleSubmit(event) {
    event.preventDefault();

    if (event.target.checkValidity()) {
      setError(false);
    } else {
      setError(true);
      handleValidationError(event, config.current.canvasCtx);
    }
  }

  const Wrapper = useCallback(({ children }) => {
    return (
      <div className="form-wrapper">
        <canvas ref={canvasRef} />
        {children}
      </div>
    );
  }, []);

  return [Wrapper, handleSubmit, error];
};

export default useCanvasDot;
