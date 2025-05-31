import { create } from "zustand";
import axios from "axios";

const AuthStore = create((set, get) => ({
  authUser: null,
  isAuthorized: false,
  isSigningUp: false,
  isLoggingIn: false,
  isProfileUpdating: false,

  setAuthUser: (userData) => set({ authUser: userData }),

  authCheck: (navigate) => {
    set({ isLoggingIn: true });
    console.log("authCheck started");
    axios
      .get("http://localhost:7000/api/auth/authCheck", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status == 200) {
          console.log(res);
          set({ authUser: res.body });
        } else {
          navigate("/login");
        }
      });
  },

  login: (payload, navigate) => {
    set({ isLoggedIn: true });
    try {
      axios
        .post("http://localhost:7000/api/auth/login", payload, {
          withCredentials: true,
        })
        .then((result) => {
          set({ authUser: result.data });
          console.log(get().authUser);
          if (result.status == 200) {
            navigate("/home");
          }
        });
    } catch (err) {
      console.log(err.message);
    }
    set({ isLoggingIn: false });
  },
  signup: (payload, navigate) => {
    console.log(payload);
    set({ isSigningUp: true });

    try {
      axios
        .post("http://localhost:7000/api/auth/signup", payload, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res, res.status);
          if (res.status == 200) {
            navigate("/login");
          }
        });
    } catch (err) {
      console.log(err.message);
    }
    console.log("final");
    set({ isSigningUp: false });
  },
  logout: () => set({ authUser: null, isLoggedIn: false }),
}));

export default AuthStore;
