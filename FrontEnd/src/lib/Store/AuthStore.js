import { create } from "zustand";
import axios from "axios";
import { io } from "socket.io-client";
import HandleClientSockets from "../HandleClientSockets.js";
const BASE_URL = "http://localhost:7000/";

const AuthStore = create((set, get) => ({
  authUser: null,
  isAuthorized: false,
  isSigningUp: false,
  isLoggingIn: false,
  isProfileUpdating: false,
  socket: null,
  onlineUsers: null,

  setOnlineUsers: (userIds) => set({ onlineUsers: [...userIds] }),

  setAuthUser: (userData) => set({ authUser: userData }),

  connectSocket: () => {
    //
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io("http://localhost:7000/", {
      query: {
        userId: authUser._id,
      },
    });

    console.log("socket is connecting");
    socket.connect();

    set({ socket: socket });
    HandleClientSockets(socket);
  },

  //

  disconnectSocket: () => {
    //
    if (get().socket?.connected) get().socket.disconnect();
  },

  //

  authCheck: async (navigate) => {
    //
    set({ isLoggingIn: true });
    console.log("authCheck started");

    try {
      const res = await axios.get("http://localhost:7000/api/auth/authCheck", {
        withCredentials: true,
      });

      console.log(res);
      if (res.status === 200) {
        console.log("1");
        set({ authUser: res.data });
        get().connectSocket();
        console.log("2");
      } else {
        console.log("Non-200 status:", res.status);
        navigate("/login");
      }
    } catch (err) {
      console.error("authCheck failed:", err.message);
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  },

  //

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
            //
            navigate("/home");

            get().connectSocket();
          }
        });
    } catch (err) {
      console.log(err.message);
    }
    set({ isLoggingIn: false });
  },

  //

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
            //
            navigate("/login");

            get().connectSocket();
          }
        });
    } catch (err) {
      console.log(err.message);
    }
    console.log("final");
    set({ isSigningUp: false });
  },

  //

  logout: () => {
    //
    set({ authUser: null, isLoggedIn: false });

    get().disconnectSocket();
  },
}));

export default AuthStore;
