const Form = useCallback((props) => {
  console.log(props);
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

export { Form };
