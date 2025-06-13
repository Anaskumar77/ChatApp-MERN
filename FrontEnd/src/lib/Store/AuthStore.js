import { create } from "zustand";
import axios from "axios";
import { io } from "socket.io-client";
// import HandleClientSocket from "../HandleClientSockets";

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

    socket.connect();

    set({ socket: socket });
    console.log(socket);

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds.filter((id) => id !== get().authUser._id) });
    });

    socket.on("receive_group_message", (data) => {
      if (data.content) {
        console.log(data.content);
      } else {
        console.log("no data from receive groupmessage");
      }
    });

    // HandleClientSocket(socket);

    //
  },

  //

  disconnectSocket: () => {
    //
    if (get().socket?.connected) get().socket.disconnect();
  },

  //

  authCheck: async (navigate, location) => {
    //
    if (["/login", "/signup"].includes(location.pathname)) return;
    set({ isLoggingIn: true });
    console.log("authCheck started");

    try {
      const res = await axios.get("http://localhost:7000/api/auth/authCheck", {
        withCredentials: true,
      });

      console.log(res);

      if (res.status === 200) {
        set({ authUser: res.data });
        get().connectSocket();

        console.log(get().authUser);
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
