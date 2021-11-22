import "./styles.css";
import useCanvasDot from "./CanvasDot/CanvasDot";

export default function App() {
  const { Form, error } = useCanvasDot();

  return (
    <div className="App">
      <Form className={error ? "displayErrors" : ""}>
        <label htmlFor="name">Name</label>
        <input name="name" type="text" id="name" required />

        <label htmlFor="email">Email</label>
        <input name="email" type="text" id="email" />

        <label htmlFor="password">Password</label>
        <input name="password" type="password" id="password" required />

        <input type="submit" value="Submit" />
      </Form>
    </div>
  );
}
