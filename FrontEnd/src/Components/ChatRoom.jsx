import CallIcon from "@mui/icons-material/Call";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import AccountBoxSharpIcon from "@mui/icons-material/AccountBoxSharp";
import SendIcon from "@mui/icons-material/Send";
//
import React, { useState } from "react";
import "../Styles/ChatRoom.css";
import AuthStore from "../lib/Store/AuthStore.js";
import ChatStore from "../lib/Store/ChatStore.js";

//

const ChatRoom = () => {
  //
  // const authUser = AuthStore((state) => state.authUser);

  // let chats = [0, 1, 2, 3, 4, 5, 6];

  // const [chatList, setChatList] = useState(chats);
  const [message, setMessage] = useState("");

  // const newMessage = null;

  const HandleMessageSubmit = () => {
    // id venam , message , receiver id venam
  };

  console.lgo;
  return (
    <div id="chat_room_container">
      <header>
        <div id="ch_h_pfp_div">
          <AccountBoxSharpIcon id="AccountBoxSharpIcon" />
        </div>
        <div id="ch_h_name_lastSeen_div">
          <h5>Morris Warren</h5>
          <h6>last seeen recently</h6>
        </div>
        <div id="ch_h_options_div">
          <div className="ch_h_option">
            <CallIcon color="string" id="CallIcon" />
          </div>
          <div className="ch_h_option">
            <SearchIcon id="SearchIcon" />
          </div>
          <div className="ch_h_option">
            <MoreHorizIcon id="MoreHorizoIcon" />
          </div>
        </div>
      </header>
      <div id="ch_main_div">
        <div id="ch_main_inner_div">
          {/*  */}
          {/* {chats.map((item) => {
            return (
              <div className={`chat chat-${item > 3 ? "start" : "end"}`}>
                <div className="chat-bubble ">It's insulting!</div>
              </div>
            );
          })} */}
          {/*  */}
        </div>
      </div>
      <footer>
        <div id="ch_f_addButton">
          <AddIcon id="AddIcon" />
        </div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="ch_f_input"
          type="text"
          placeholder="write a message"
        ></input>
        <div id="ch_f_sendButton" onClick={HandleMessageSubmit} type="submit">
          <SendIcon id="SendIcon" />
        </div>
      </footer>
    </div>
  );
};

export default ChatRoom;
