import React from "react";
import "../Styles/ChatRoom.css";
const ChatRoom = () => {
  return (
    <div id="chat_room_container">
      <header>
        <div id="ch_h_pfp_div">pfp</div>
        <div id="ch_h_name_lastSeen_div">Name lastseen</div>
        <div id="ch_h_options_div">options</div>
      </header>
      <div id="ch_main_div">
        <div id="ch_main_inner_div">chats</div>
      </div>
      <footer>
        <div id="ch_f_addButton">+</div>
        <input
          id="ch_f_input"
          type="text"
          placeholder="write a message"
        ></input>
        <div id="ch_f_sendButton">/\</div>
      </footer>
    </div>
  );
};

export default ChatRoom;
