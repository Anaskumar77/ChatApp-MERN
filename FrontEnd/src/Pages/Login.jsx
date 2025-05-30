import { useRef } from "react";
import axios from "axios";
import "../Styles/SignupPage.css";
const LoginPage = () => {
  const email = useRef();
  const password = useRef();
  let User;
  const HandleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          "http://localhost:7000/api/auth/login",
          { email: email.current.value, password: password.current.value },
          {
            withCredentials: true,
          }
        )
        .then((result) => {
          console.log(result, result.data);
          User = result.data;
          console.log(User);
        });
    } catch (err) {
      console.log(err.message);
    }
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
