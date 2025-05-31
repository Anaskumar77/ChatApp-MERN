import React, { useState } from "react";

const ChatBar = () => {
  //
  const [recentMessages, setRecentMessages] = useState([]);

  //

  // fetch recent Chats logic

  const MessagePreviewDiv = () => {
    return (
      <div>
        <div id="messagePreview_avatarDiv">avatar</div>
        <div id="messagePrivew_name_time_div">
          <h5>Name</h5>
          <h6>time</h6>
        </div>
        <div id="messagePreview_recentMessage_div">
          <h6>recent message</h6>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div id="ChatBar_search_div"></div>
      <div id="ChatBar_slider_options"></div>
      <h2>Chats</h2>
      <div id="ChatBar_RecentMessages"></div>
    </div>
  );
};

export default ChatBar;
