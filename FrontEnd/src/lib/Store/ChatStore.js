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
import debounce from "lodash.debounce"; // create as function delay

const ChatStore = create((set, get) => ({
  messages: [],
  recentUsers: [],
  searchedUsers: [],
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

  getSearchedUsers: debounce(async ({ input, fetch_limit }) => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/message/search?input=${input}&limit=${fetch_limit}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    } catch (err) {
      console.error("getSearchedUsers error : ", err.message);
    }
  }, 300),
  //

  getUsers: async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/message/user", {
        withCredentials: true,
      });

      console.log(res.data);

      if (res.status === 200) {
        set({ recentUsers: res.data });
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
