import CallIcon from "@mui/icons-material/Call";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import AccountBoxSharpIcon from "@mui/icons-material/AccountBoxSharp";
import SendIcon from "@mui/icons-material/Send";
//
import { useState } from "react";
import "../Styles/ChatRoom.css";
import AuthStore from "../lib/Store/AuthStore.js";
import ChatStore from "../lib/Store/ChatStore.js";

//

const ChatRoom = () => {
  //

  const authUser = AuthStore((s) => s.authUser);
  const socket = AuthStore((s) => s.socket);

  const selectedUser = ChatStore((s) => s.selectedUser);
  const sendMessage = ChatStore((s) => s.sendMessage);
  const messages = ChatStore((s) => s.messages);

  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const HandleMessageSubmit = () => {
    socket.emit("send_group_message", {
      groupId: selectedUser._id,
      senderId: authUser._id,
      content: message,
    });
    const payload = {
      groupId: selectedUser._id,
      message: message,
      media: file,
    };
    sendMessage(payload);
  };

  return (
    <>
      {selectedUser === null ? (
        <div>select a chat</div>
      ) : (
        <div id="chat_room_container">
          <header>
            <div id="ch_h_pfp_div">
              {selectedUser.Group_avatar === "" ? (
                <AccountBoxSharpIcon id="AccountBoxSharpIcon" />
              ) : (
                <img src={selectedUser.Group_avatar}></img>
              )}
            </div>
            <div id="ch_h_name_lastSeen_div">
              <h5>{selectedUser.name}</h5>
              <h6>last seen</h6>
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
              {messages.map((item) => {
                return (
                  <div
                    className={`chat chat-${
                      item.sender !== authUser._id ? "start" : "end"
                    }`}
                  >
                    <div className="chat-bubble ">{item.content}</div>
                  </div>
                );
              })}
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
            <div
              id="ch_f_sendButton"
              onClick={() => HandleMessageSubmit()}
              type="submit"
            >
              <SendIcon id="SendIcon" />
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default ChatRoom;
