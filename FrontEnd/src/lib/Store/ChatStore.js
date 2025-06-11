import { create } from "zustand";
import axios from "axios";
import debounce from "lodash.debounce"; // create as function delay
import AuthStore from "./AuthStore";
const ChatStore = create((set, get) => ({
  searchedUsers: [],
  selectedUser: null,
  isUsersLoading: false,
  isImageUploading: false,
  isMessagesLoading: false,
  currentTab: "Online",
  AllChats: [], // dynamic
  OnlineChats: [],
  PrivateChats: [], // dynamic
  GroupChats: [], // dynamic

  //=================================================================================

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },

  setCurrentTab: (tabName) => {
    set({ currentTab: tabName });
    console.log("current tab : ", get().currentTab);
  },
  setSearchedUsers: (data) => {
    set({ searchedUsers: data });
  },

  setOnlineState: () => {
    const onlineUsers = AuthStore((s) => s.onlineUsers);
  },

  //=================================================================================

  getSearchedUsers: debounce(async ({ input, fetch_limit }) => {
    //
    /// remember to debug that it fetches including the user info also  !!!!!!!!!!!!!!!!
    //

    try {
      const res = await axios.get(
        `http://localhost:7000/api/message/search?input=${input}&limit=${fetch_limit}`,
        {
          withCredentials: true,
        }
      );
      set({ searchedUsers: res.data });
      console.log(res.data);
    } catch (err) {
      console.error("getSearchedUsers error : ", err.message);
    }
  }, 300),

  //=================================================================================

  getAllRoom: async () => {
    try {
      const res = await axios.get(
        "http://localhost:7000/api/message/user/all",
        {
          withCredentials: true,
        }
      );
      console.log("get all room", res);

      if (res.status === 200) {
        set({ AllChats: res.data });
      } else {
        console.log(res);
      }
    } catch (err) {
      console.error(err.message);
    }
  },

  //=================================================================================

  getOnlineRoom: async () => {
    try {
      const res = await axios.get(
        "http://localhost:7000/api/message/user/online",
        {
          withCredentials: true,
        }
      );

      console.log("yeeeeeee", res.data);

      if (res.status === 200) {
        set({ OnlineChats: res.data });
      } else {
        console.log(res);
      }
    } catch (err) {
      console.error(err.message);
    }
  },

  //=================================================================================

  createRoom: async (users, isGroup) => {
    // users = list

    try {
      const res = await axios.post(
        `http://localhost:7000/api/message/create/${
          isGroup ? "group" : "private"
        }`,
        users,
        {
          withCredentials: true,
        }
      );
      if (res.status == 201) {
        console.log(res);
        set({ selectedUser: res.data });

        // response have room id and users

        return;
      } else {
        console.log(res);
      }
    } catch (err) {
      console.error(err.message);
    }
  },

  //------------------------------------------------------------------------------

  getChats: async () => {
    //
    const receiverId = get().selectedUser;
    try {
      const res = axios.get(
        `http://localhost:7000/api/message/chats/:${receiverId}`
      );

      console.log(res);
      // response logic
      //
    } catch (err) {
      //
      console.error(err.message);
    }
  },

  //------------------------------------------------------------------------------

  imageUpload: async (file) => {
    //
    set({ isImageUploading: true });

    try {
      //
      const res = await axios.post(
        "http://localhost:7000/api/auth/profileUpdate",
        {
          profilPic: file,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === !201) {
        console.log(res);
      } else {
        console.log(res.data);
      }

      set({ isImageUploading: false });
      //
    } catch (err) {
      //
      console.error(err.message);
    }
  },
}));

export default ChatStore;
