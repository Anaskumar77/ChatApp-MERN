import { create } from "zustand";
import axios from "axios";
import debounce from "lodash.debounce"; // create as function delay
import AuthStore from "./AuthStore";

const ChatStore = create((set, get) => ({
  selectedUser: null, // this is actualy room id
  selectedUserId: null,
  currentTab: "All",
  isAddRoomVisible: false,
  isChatRoomVisible: true,
  isProfileSecVisible: true,

  isUsersLoading: false,
  isMessagesLoading: false,

  messages: [], // store new messages
  searchedUsers: [],
  AllChats: [], // dynamic
  OnlineChats: [],
  PrivateChats: [], // dynamic
  GroupChats: [], // dynamic

  //=================================================================================
  appendMessages: (newMessage) => {
    set((state) => ({ messages: [...state.messages, newMessage] })); //append new messages
  },

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

  setIsAddRoomVisibleTrue: () => {
    set({ isAddRoomVisible: true });
    // return get().isAddRoomVisible;
  },
  setIsAddRoomVisibleFalse: () => {
    set({ isAddRoomVisible: false });
  },
  setIsChatRoomVisible: (data) => {
    set({ isChatRoomVisible: data });
  },
  setSelectedUserId: (room) => {
    const { authUser } = AuthStore.getState();
    if (room.isGroup == false) {
      const user = room.users?.filter((user) => user._id !== authUser._id);

      set({ selectedUserId: user[0] });
    } else {
      return;
    }
  },

  //=================================================================================

  getSearchedUsers: debounce(async ({ input, fetch_limit }) => {
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
        console.log(typeof res.data, res.data);
        set({ AllChats: res.data });
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
      if (res.status == 201 || res.status == 200) {
        console.log(res);
        set({ selectedUser: res.data });
        set({ isAddRoomVisible: false });
        // response have room id and users
        console.log(res.data);
        return;
      }
    } catch (err) {
      console.error(err.message);
    }
  },

  //------------------------------------------------------------------------------
  sendMessage: async (payload) => {
    try {
      const res = await axios.post(
        `http://localhost:7000/api/message/send`,
        payload,
        {
          withCredentials: true,
        }
      );
      if (res.status == 201) {
        console.log("sendMessage reposnse from backEnd :", res.data);
        // set((state) => ({ messages: [...state.messages, res.data] }));
      } else {
        console.log(res);
      }
    } catch (err) {
      console.error(err.message);
    }
  },
  getChats: async () => {
    //
    const { _id } = get().selectedUser;
    console.log(_id);
    try {
      const res = await axios.get(
        `http://localhost:7000/api/message/chats/${_id}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        set({ messages: res.data });
        console.log(typeof res.data, res.data);
      } else {
        console.log(res.message);
      }
    } catch (err) {
      //
      console.error(err.message);
    }
  },

  //------------------------------------------------------------------------------
}));

export default ChatStore;
