import { useRef } from "react";
import "../Styles/SignupPage.css";
import AuthStore from "../lib/Store/AuthStore.js";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const email = useRef();
  const password = useRef();

  const { login } = AuthStore();
  const navigate = useNavigate();

  const HandleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: email.current.value,
      password: password.current.value,
    };
    login(payload, navigate);
  };

  return (
    <div id="signup_page">
      <div id="signup_page_illustration_container">
        <div id="illustrator_header"></div>
        <div id="illustrator_QRCode_div"></div>
      </div>
      <form onSubmit={HandleSubmit} id="signup_page_form_container">
        <h1 id="signup_h1_1">Chat Anywhere</h1>
        <h1 id="signup_h1_2">With Anyone</h1>
        <input
          ref={email}
          className="signup_input input_email"
          placeholder="Email"
        ></input>
        <input
          ref={password}
          className="signup_input input_password"
          placeholder="Password"
        ></input>
        <button className="signup_input input_submit" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
