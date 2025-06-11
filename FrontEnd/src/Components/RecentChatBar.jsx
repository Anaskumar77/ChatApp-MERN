import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import ScrollableTabsButtonPrevent from "./TabDiv.jsx";
import "../Styles/RecentChatBar.css";
import ChatStore from "../lib/Store/ChatStore.js";
import AuthStore from "../lib/Store/AuthStore.js";
import AddRoomDiv from "./addRoomDiv.jsx";
import AddIcon from "@mui/icons-material/Add";

export const MessagePreviewDiv = ({ chatInfo }) => {
  const setSelectedUser = ChatStore((state) => state.setSelectedUser);
  const RecentMessageClick = (user) => {
    //
    setSelectedUser(user);
    // get messages logic\
    // console.log(chatInfo._id, " : ", chatInfo.users)/;
  };

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
          <h6>
            {new Date(chatInfo.updatedAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              // second: "2-digit",   // uncammand this if you want seconds alse
            })}
          </h6>
        </div>
        <div className="mp_message_div">
          <h6>recent message</h6>
        </div>
      </div>
    </div>
  );
};

const RecentChatBar = () => {
  //

  const currentTab = ChatStore((s) => s.currentTab);
  const AllChats = ChatStore((s) => s.AllChats);
  const OnlineChats = ChatStore((s) => s.OnlineChats);
  const PrivateChats = ChatStore((s) => s.PrivateChats);
  const GroupChats = ChatStore((s) => s.GroupChats);
  const onlineUsers = AuthStore((s) => s.onlineUsers);
  //

  const [isAddRoomButtonOn, setIsAddRoomButtonOn] = useState(false);

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
                ).map((chat) => <MessagePreviewDiv chatInfo={chat} />)
              : null}
            <div
              id="r_cb_floating_button"
              onClick={() => {
                setIsAddRoomButtonOn((prev) => !prev);
              }}
            >
              <AddIcon />
            </div>
          </div>
        </div>
        {isAddRoomButtonOn ? (
          <AddRoomDiv setIsRoomOpen={setIsAddRoomButtonOn} />
        ) : null}
      </>
    );
  };
  return <ChatBarContainer />;
};

export default RecentChatBar;
