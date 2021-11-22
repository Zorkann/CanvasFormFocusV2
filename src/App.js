import "./styles.css";
import useCanvasDot from "./CanvasDot/CanvasDot";
import { useRef } from "react";

export default function App() {
  const formRef = useRef();
  const [Wrapper, handleSubmit, error] = useCanvasDot(formRef);

  return (
    <div className="App">
      <button>dsalkdjalsldjlas</button>
      <p>dsalkdjalsldjlas</p>

      <Wrapper>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={error ? "displayErrors" : ""}
          noValidate
        >
          <label htmlFor="name">Name</label>
          <input name="name" type="text" id="name" required />

          <label htmlFor="email">Email</label>
          <input name="email" type="text" id="email" required />

          <label htmlFor="password">Password</label>
          <input name="password" type="password" id="password" />

          <button>Submit The Thing</button>
        </form>
      </Wrapper>
      <button>dsalkdjalsldjlas</button>
    </div>
  );
}
