import { useState, useEffect, useRef } from "react";
import api from "../lib/AxiosConfig.js";
import axios from "axios";
// import authStore from "../lib/Store/AuthStore.js";
import "../Styles/SignupPage.css";
import PasswordCheck from "../utils/passwordCheck.js";
const SignUpPage = () => {
  const name = useRef();
  const email = useRef();
  const [password, setPassword] = useState("");

  let ErrorList;

  //

  const ErrorDiv = (errors) => {
    return (
      <li id="signup_errors">
        {Array.isArray(errors) && errors.map((items) => <ul>{items}</ul>)}
      </li>
    );
  };

  //
  useEffect(() => {
    fetch("http://localhost:7000/api/test")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }, []);

  const HandleSubmit = (e) => {
    console.log(name.current.value, email.current.value, password);
    e.preventDefault();

    axios
      .post(
        "http://localhost:7000/api/auth/signup",
        {
          name: name.current.value,
          email: email.current.value,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => res.json)
      .then((result) => {
        console.log(result);
        if (result.status.ok) {
          // after signup logic
          console.log("ok", result);
        } else {
          console.log("not Okey", result);
        }
      });
  };

  //

  return (
    <div id="signup_page">
      <form onSubmit={HandleSubmit} id="signup_page_form_container">
        <h4></h4>
        <h1>Chat Anywhere</h1>
        <h1>With Anyone</h1>
        <h4>SignUp</h4>
        <input
          ref={name}
          className="signup_input input_name"
          placeholder="Name"
        ></input>
        <input
          ref={email}
          className="signup_input input_email"
          placeholder="email"
        ></input>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            ErrorList = PasswordCheck(password);
          }}
          className="signup_input input_password"
          placeholder="password"
        ></input>
        <button className="signup_input" type="submit">
          SignUp
        </button>
        {<ErrorDiv errors={ErrorList}></ErrorDiv>}
      </form>

      <div id="signup_page_illustration_container">
        <div id="illustrator_header"></div>
        <div id="illustrator_QRCode_div"></div>
      </div>
    </div>
  );
};

export default SignUpPage;
