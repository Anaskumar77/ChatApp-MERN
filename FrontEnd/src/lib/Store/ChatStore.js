// import AuthStore from "./AuthStore.js";

// export const sendMessage = (message) => {
//   const { socket, authUser } = AuthStore().getState();

//   if (message.trim !== "") {
//     const payload = {
//       sender: authUser._id,
//       // receiver:
//     };
//     socket.emit("chat message", payload);
//   }
// };

import { create } from "zustand";
import axios from "axios";

const ChatStore = create((set, get) => ({
  messages: [],
  recentUsers: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  currentTab: "Online",

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  setCurrentTab: (tabName) => {
    set({ currentTab: tabName });
    console.log("current tab : ", get().currentTab);
  },

  getSearchedUsers: async (inputText, limit) => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/message/searchUsers/:${inputText}/:${limit}`
      );
      console.log(res);
    } catch (err) {
      console.error("getSearchedUsers error : ", err.messages);
    }
  },

  getUsers: async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/message/user", {
        withCredentials: true,
      });

      console.log(res);

      if (res.status === 200) {
        set({ recentUsers: res.data });
        console.log(res.data);
      } else {
        console.log(res);
      }
    } catch (err) {
      console.error(err.message);
    }
  },
  getChats: async () => {
    //
    const receiverId = get().selectedUser;
    try {
      const res = axios.get(`http://localhost:7000/api/message/:${receiverId}`);

      // response logic
      //
    } catch (err) {
      //
      console.error(err.message);
    }
  },
}));

export default ChatStore;
