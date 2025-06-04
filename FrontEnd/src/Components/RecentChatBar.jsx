import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollableTabsButtonPrevent from "./TabDiv.jsx";
import "../Styles/RecentChatBar.css";
import ChatStore from "../lib/Store/ChatStore.js";
import AuthStore from "../lib/Store/AuthStore.js";
import SearchWindow from "./SearchWindow.jsx";

const RecentChatBar = () => {
  //

  const getUsers = ChatStore((state) => state.getUsers);
  const selectedUser = ChatStore((state) => state.selectedUser);
  const recentUsers = ChatStore((state) => state.recentUsers);
  const setSelectedUser = ChatStore((state) => state.setSelectedUser);
  const onlineUsers = AuthStore((state) => state.onlineUsers);

  const [recentMessages, setRecentMessages] = useState([]);
  const [isSearchOn, setIsSearchOn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    //
    getUsers();
  }, []);

  useEffect(() => {
    //
    console.log(onlineUsers);
  }, [onlineUsers]);

  const RecentMessageClick = (user) => {
    //
    setSelectedUser(user);
    // get messages logic\
  };

  //

  const MessagePreviewDiv = ({ chatInfo }) => {
    console.log(chatInfo);
    return (
      <div
        onClick={RecentMessageClick(chatInfo._id)}
        className="messagePreviewDiv"
      >
        <div className="mp_avatarDiv">
          <div></div>
        </div>
        <div className="mp_subDiv">
          <div className="mp_name_time_div">
            <h5>{chatInfo.name}</h5>
            <h6>time</h6>
          </div>
          <div className="mp_message_div">
            <h6>recent message</h6>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="r_chatbar_container">
      <div id="ChatBar_search_div">
        <input
          onClick={() => {
            setIsSearchOn((prev) => !prev);
          }}
          type="input"
          placeholder="Search"
        ></input>
      </div>
      <div id="ChatBar_slider_options">
        <ScrollableTabsButtonPrevent />
      </div>
      <h2>Chats</h2>
      <div id="ChatBar_RecentMessages">
        {recentUsers.map((chat) => {
          return <MessagePreviewDiv chatInfo={chat} />;
        })}
      </div>
    </div>
  );
};

export default RecentChatBar;
