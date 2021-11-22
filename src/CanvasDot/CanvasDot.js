import { useRef, useEffect, useState, useCallback } from "react";
import { paint } from "./paint";
import { resize } from "./actions";
import { addOnChangeEventsToForm, handleValidationError } from "./utils";
import { registerEvents } from "./events";
import "../styles.css";

const useCanvasDot = () => {
  const [error, setError] = useState(false);
  const canvasRef = useRef();
  const formRef = useRef();
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
          className={props.className}
          noValidate
          {...props}
        >
          {props.children}
        </form>
      </div>
    );
  }, []);

  return { Form, handleSubmit, error };
};

export default useCanvasDot;
