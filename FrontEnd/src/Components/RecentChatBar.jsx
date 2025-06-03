import React, { useState } from "react";
import ScrollableTabsButtonPrevent from "./TabDiv.jsx";
import "../Styles/RecentChatBar.css";
const RecentChatBar = () => {
  //
  const [recentMessages, setRecentMessages] = useState([
    0, 1, 2, 3, 4,

    5, 6, 7, 8, 9,
  ]);

  //
  //
  // fetch recent Chats logic

  const MessagePreviewDiv = (chatInfo) => {
    return (
      <div className="messagePreviewDiv">
        <div className="mp_avatarDiv">
          <div></div>
        </div>
        <div className="mp_subDiv">
          <div className="mp_name_time_div">
            <h5>Name</h5>
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
        <input type="input" placeholder="Search"></input>
      </div>
      <div id="ChatBar_slider_options">
        <ScrollableTabsButtonPrevent />
      </div>
      <h2>Chats</h2>
      <div id="ChatBar_RecentMessages">
        {recentMessages.map((chat) => {
          return <MessagePreviewDiv chatInfo={chat} />;
        })}
      </div>
    </div>
  );
};

export default RecentChatBar;
