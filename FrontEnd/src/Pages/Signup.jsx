import { useState, useRef } from "react";
// import api from "../lib/AxiosConfig.js";
import axios from "axios";
// import authStore from "../lib/Store/AuthStore.js";
import "../Styles/SignupPage.css";
import PasswordCheck from "../utils/passwordCheck.js";
const SignUpPage = () => {
  const name = useRef();
  const email = useRef();
  const [password, setPassword] = useState("");
  const [ErrorList, setErrorList] = useState([]);

  const ErrorDiv = ({ errors }) => {
    return (
      <div id="error_container">
        {Array.isArray(errors) ? (
          errors.map((items, key) => (
            <h6 id="signup_errors">
              {key + 1}:{items}
            </h6>
          ))
        ) : (
          <h6>hello</h6>
        )}
      </div>
    );
  };

  //
  // useEffect(() => {
  //   fetch("http://localhost:7000/api/test")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.error(err));
  // }, []);

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
      .then((res) => {
        console.log(res);
        if (res.status == 200 || res.statusText == "OK") {
          //
          //redirection logic
          //
          //
        } else {
          //
          //showing error logic
          //
          //
          console.log(res);
        }
      });
  };

  //

  return (
    <div id="signup_page">
      <form onSubmit={HandleSubmit} id="signup_page_form_container">
        <h4></h4>
        <h1 id="signup_h1_1">Chat Anywhere</h1>
        <h1 id="signup_h1_2">With Anyone</h1>
        <input
          ref={name}
          className="signup_input input_name"
          placeholder="Name"
        ></input>
        <input
          ref={email}
          className="signup_input input_email"
          placeholder="Email"
        ></input>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorList(PasswordCheck(e.target.value));
          }}
          className={`signup_input input_password ${
            ErrorList.length > 0 ? "error-focus" : "normal-focus"
          }`}
          placeholder="Password"
        ></input>
        {password != "" ? <ErrorDiv errors={ErrorList}></ErrorDiv> : <></>}
        <button className="signup_input input_submit" type="submit">
          SignUp
        </button>
      </form>

      <div id="signup_page_illustration_container">
        <div id="illustrator_header"></div>
        <div id="illustrator_QRCode_div"></div>
      </div>
    </div>
  );
};

export default SignUpPage;
