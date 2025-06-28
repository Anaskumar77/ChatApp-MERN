// import { useNavigate } from "react-router-dom";
import ScrollableTabsButtonPrevent from "./TabDiv.jsx";
import "../Styles/RecentChatBar.css";
import ChatStore from "../lib/Store/ChatStore.js";
import AuthStore from "../lib/Store/AuthStore.js";
import AddRoomDiv from "./addRoomDiv.jsx";
import AddIcon from "@mui/icons-material/Add";
import pfp from "/defaultProfile.jpg";
import { useState } from "react";
import { motion } from "framer-motion";

export const MessagePreviewDiv = ({ chatInfo, index }) => {
  //
  const setSelectedUser = ChatStore((state) => state.setSelectedUser);

  const socket = AuthStore((s) => s.socket);
  const authUser = AuthStore((s) => s.authUser);
  const getChats = ChatStore((s) => s.getChats);
  const setSelectedUserId = ChatStore((s) => s.setSelectedUserId);
  const setIsSearchOpen = ChatStore((s) => s.setIsSearchOpen);

  const RecentMessageClick = (user) => {
    //
    console.log(user);
    setSelectedUser(user);
    setSelectedUserId(user);
    getChats();
    socket.emit("join_group", { groupId: chatInfo._id, userId: authUser._id });
  };

  return (
    <motion.div
      key={chatInfo._id}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: "easeOut",
      }}
      className="p-0"
    >
      <div
        key={chatInfo._id}
        onClick={() => {
          setIsSearchOpen(false);
          RecentMessageClick(chatInfo);
        }}
        className="messagePreviewDiv"
      >
        <div className="mp_avatarContainer">
          <div className="mp_avatarDiv">
            <img
              className="mp_avatar"
              src={
                chatInfo.isGroup === true
                  ? chatInfo.Group_avatar !== ""
                    ? chatInfo.Group_avatar
                    : pfp
                  : chatInfo.users
                      .filter((_id) => _id !== authUser._id)
                      .map((user) =>
                        user.avatar !== "" ? user.avatar : pfp
                      )[0]
              }
            ></img>
          </div>
        </div>
        <div className="mp_subDiv">
          <div className="mp_name_time_div">
            {chatInfo.isGroup === false ? (
              chatInfo.users
                .filter((user) => user._id !== authUser._id)
                .map((item) => <h5>{item.name}</h5>)
            ) : (
              <h5>{chatInfo.name}</h5>
            )}
            <h6>
              {new Date(chatInfo.updatedAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                // second: "2-digit",   // uncammand this if you want seconds alse
              })}
            </h6>
          </div>
          <div className="mp_message_div">
            {!chatInfo.lastMessage ? (
              <h6>No messages yet "-"</h6>
            ) : chatInfo.isGroup === true ? (
              <h6>
                {chatInfo.lastMessage?.sender?.name} :{" "}
                {chatInfo.lastMessage?.content}
              </h6>
            ) : chatInfo.lastMessage?.sender._id === authUser._id ? (
              <h6>You : {chatInfo.lastMessage?.content}</h6>
            ) : (
              <h6>{chatInfo.lastMessage?.content}</h6>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const RecentChatBar = () => {
  //

  const currentTab = ChatStore((s) => s.currentTab);
  const AllChats = ChatStore((s) => s.AllChats);
  const onlineUsers = AuthStore((s) => s.onlineUsers);
  const isAddRoomVisible = ChatStore((s) => s.isAddRoomVisible);
  const setIsAddRoomVisibleTrue = ChatStore((s) => s.setIsAddRoomVisibleTrue);

  const [searchInput, setSearchInput] = useState("");
  const isSearchOpen = ChatStore((s) => s.isSearchOpen);
  const setIsSearchOpen = ChatStore((s) => s.setIsSearchOpen);
  //
  const HandleInputChange = (e) => {
    setSearchInput(e.target.value);
    setIsSearchOpen(e.target.value.trim() !== "");
  };

  //
  return (
    <>
      <div id="r_chatbar_container">
        <div id="ChatBar_search_div">
          <input
            type="text"
            placeholder="Search"
            value={searchInput || ""}
            onChange={(e) => {
              HandleInputChange(e);
            }}
          ></input>
        </div>
        {!isSearchOpen ? (
          <>
            <div id="ChatBar_slider_options">
              <ScrollableTabsButtonPrevent />
            </div>
            <div id="ChatBar_RecentMessages">
              <div id="Scroll_RecentMessages">
                {currentTab === "All"
                  ? AllChats.map((item, index) => (
                      <MessagePreviewDiv chatInfo={item} index={index} />
                    ))
                  : currentTab === "Online"
                  ? AllChats.filter((chat) =>
                      chat.users.some((userID) =>
                        onlineUsers?.includes(userID._id)
                      )
                    )
                      .filter((user) => user.isGroup === false)
                      .map((item, index) => (
                        <MessagePreviewDiv chatInfo={item} index={index} />
                      ))
                  : null}
                {currentTab === "Private"
                  ? AllChats.filter((chat) => chat.isGroup == false).map(
                      (chat, index) => (
                        <MessagePreviewDiv chatInfo={chat} index={index} />
                      )
                    )
                  : null}
                {currentTab === "Group"
                  ? AllChats.filter((chat) => chat.isGroup == true).map(
                      (chat, index) => (
                        <MessagePreviewDiv chatInfo={chat} index={index} />
                      )
                    )
                  : null}
                <div id="rc_fake_space"></div>
              </div>

              <div
                id="r_cb_floating_button"
                onClick={() => setIsAddRoomVisibleTrue()}
              >
                <AddIcon />
              </div>
            </div>
          </>
        ) : (
          AllChats.filter((item) =>
            item.name.toLowerCase().includes(searchInput)
          ).map((item, index) => (
            <MessagePreviewDiv chatInfo={item} index={index} />
          ))
        )}
      </div>
      {isAddRoomVisible ? <AddRoomDiv /> : null}
    </>
  );
};

export default RecentChatBar;
