import { useRef, useEffect, useState, useCallback } from "react";
import { paint } from "./paint";
import { resize } from "./actions";
import { addOnChangeEventsToForm, handleValidationError } from "./utils";
import { registerEvents } from "./events";
import "../styles.css";

const initial = {
  canvasCtx: undefined,
  head: {},
  tail: [],
  currentFocus: undefined
};

const useCanvasDot = () => {
  const [error, setError] = useState(false);
  const canvasRef = useRef();
  const formRef = useRef();
  const animationFrameId = useRef();
  const config = useRef(initial);

  const redraw = useCallback(() => {
    paint(config.current);
    animationFrameId.current = requestAnimationFrame(redraw);
  }, []);

  useEffect(() => {
    setError(false);
    config.current = initial;
    config.current.canvasCtx = canvasRef.current.getContext("2d");
    resize(config.current);
    redraw();
    addOnChangeEventsToForm(formRef.current, config.current.canvasCtx);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [formRef, redraw]);

  useEffect(() => {
    const removeEvents = registerEvents(config, formRef, error);
    return () => {
      removeEvents();
    };
  }, [error, formRef]);

  function handleSubmit(event, onSubmit) {
    event.preventDefault();

    onSubmit?.();

    if (event.target.checkValidity()) {
      setError(false);
    } else {
      setError(true);
      handleValidationError(event, config.current.canvasCtx);
    }
  }

  const Form = useCallback((props) => {
    return (
      <div className="form-wrapper">
        <canvas ref={canvasRef} />
        <form
          ref={formRef}
          onSubmit={(event) => {
            handleSubmit(event, props.onSubmit);
          }}
          noValidate
          {...props}
        >
          {props.children}
        </form>
      </div>
    );
  }, []);

  return { Form, error };
};

export default useCanvasDot;
