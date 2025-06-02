import { useEffect } from "react";
import SignUpPage from "./Pages/Signup.jsx";
import LoginPage from "./Pages/Login.jsx";
import HomePage from "./Pages/HomePage.jsx";
import AuthStore from "./lib/Store/AuthStore.js";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./Styles/App.css";

const App = () => {
  const { authCheck } = AuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    authCheck(navigate);
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signup" element={<SignUpPage />}></Route>
      <Route path="/home" element={<HomePage />}></Route>
    </Routes>
  );
};

export default App;
