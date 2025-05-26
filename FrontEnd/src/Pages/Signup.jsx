import React, { useState, useEffect, useRef } from "react";
import api from "../lib/AxiosConfig.js";
import "../Styles/LoginPage.css";
const SignUpPage = () => {
  const name = useRef();
  const email = useRef();
  const [password, setPassword] = useState("");
  let errors = [];
  let User = {};
  const PasswordCheck = (password) => {
    setPassword(password);
    if (!/.{8,}/.test(password)) errors.push("Must be at least 8 characters");
    if (!/[a-z]/.test(password)) errors.push("Must include a lowercase letter");
    if (!/[A-Z]/.test(password))
      errors.push("Must include an uppercase letter");
    if (!/\d/.test(password)) errors.push("Must include a digit");
    if (!/[\W_]/.test(password))
      errors.push("Must include a special character");
    console.log(errors);
    return errors;
  };

  const ErrorList = (errors) => {
    return (
      <li id="login_errors">
        {Array.isArray(errors) && errors.map((items) => <ul>{items}</ul>)}
      </li>
    );
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/auth/signup")
      .then((res) => res.json)
      .then((result) => (User = result));
  };

  return (
    <div id="login_page">
      <form onSubmit={HandleSubmit} id="login_page_form_container">
        <h4></h4>
        <h1>Chat Anywhere</h1>
        <h1>With Anyone</h1>
        <h4>SignUp</h4>
        <input
          ref={name}
          className="login_input input_name"
          placeholder="Name"
        ></input>
        <input
          ref={email}
          className="login_input input_email"
          placeholder="email"
        ></input>
        <input
          value={password}
          onChange={(e) => {
            PasswordCheck(e.target.value);
          }}
          className="login_input input_password"
          placeholder="password"
        ></input>
        <button className="login_input" type="submit">
          SignUp
        </button>
        <ErrorList errors={errors}></ErrorList>
      </form>

      <div id="login_page_illustration_container">
        <div id="illustrator_header"></div>
        <div id="illustrator_QRCode_div"></div>
      </div>
    </div>
  );
};

export default SignUpPage;
