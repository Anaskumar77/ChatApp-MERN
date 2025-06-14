import React from "react";
// import { useNavigate } from "react-router-dom";
import ScrollableTabsButtonPrevent from "./TabDiv.jsx";
import "../Styles/RecentChatBar.css";
import ChatStore from "../lib/Store/ChatStore.js";
import AuthStore from "../lib/Store/AuthStore.js";
import AddRoomDiv from "./addRoomDiv.jsx";
import AddIcon from "@mui/icons-material/Add";

export const MessagePreviewDiv = ({ chatInfo }) => {
  //
  const setSelectedUser = ChatStore((state) => state.setSelectedUser);

  const socket = AuthStore((s) => s.socket);
  const authUser = AuthStore((s) => s.authUser);
  const getChats = ChatStore((s) => s.getChats);

  const RecentMessageClick = (user) => {
    //
    console.log(user);
    setSelectedUser(user);
    getChats();
    socket.emit("join_group", { groupId: chatInfo._id, userId: authUser._id });
  };

  return (
    <div
      key={chatInfo._id}
      onClick={() => RecentMessageClick(chatInfo)}
      className="messagePreviewDiv"
    >
      <div className="mp_avatarDiv">
        <div></div>
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
              {chatInfo.lastMessage?.sender} : {chatInfo.lastMessage?.content}
            </h6>
          ) : chatInfo.lastMessage?.sender._id === authUser._id ? (
            <h6>You : {chatInfo.lastMessage.content}</h6>
          ) : (
            <h6>{chatInfo.lastMessage.content}</h6>
          )}
        </div>
      </div>
    </div>
  );
};

const RecentChatBar = () => {
  //

  const currentTab = ChatStore((s) => s.currentTab);
  const AllChats = ChatStore((s) => s.AllChats);
  const onlineUsers = AuthStore((s) => s.onlineUsers);
  const isAddRoomVisible = ChatStore((s) => s.isAddRoomVisible);
  const setIsAddRoomVisibleTrue = ChatStore((s) => s.setIsAddRoomVisibleTrue);

  //

  //

  const ChatBarContainer = () => {
    return (
      <>
        <div id="r_chatbar_container">
          <div id="ChatBar_search_div">
            <input type="input" placeholder="Search"></input>
          </div>
          <div id="ChatBar_slider_options">
            <ScrollableTabsButtonPrevent />
          </div>
          <h2>Chats</h2>
          <div id="ChatBar_RecentMessages">
            {/* ["All", "Online", "Private", "Group"] */}
            {currentTab === "All"
              ? AllChats.map((chat) => <MessagePreviewDiv chatInfo={chat} />)
              : currentTab === "Online"
              ? AllChats.filter((chat) =>
                  chat.users.some((userID) => onlineUsers?.includes(userID))
                )
                  .filter((user) => user.isGroup === false)
                  .map((chat) => <MessagePreviewDiv chatInfo={chat} />)
              : null}
            <div
              id="r_cb_floating_button"
              onClick={() => setIsAddRoomVisibleTrue()}
            >
              <AddIcon />
            </div>
          </div>
        </div>
        {isAddRoomVisible ? <AddRoomDiv /> : null}
      </>
    );
  };
  return <ChatBarContainer />;
};

export default RecentChatBar;
