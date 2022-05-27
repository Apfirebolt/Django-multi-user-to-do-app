import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const LoginScreen = () => {
  return (
    <>
      <section className="heading">
        <h1>Login</h1>
        <FaUser /> Create New Ticket
        <p>Please choose from an option below</p>
      </section>
    </>
  );
}

export default LoginScreen;
