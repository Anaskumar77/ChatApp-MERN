import SignUpPage from "./Pages/Signup.jsx";
import LoginPage from "./Pages/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Styles/App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        {/* <Route path="/user" element={HomePage}></Route> */}
        <Route path="/signup" element={<SignUpPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
