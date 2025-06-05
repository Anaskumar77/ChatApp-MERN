import React from "react";
import ChatStore from "../lib/Store/ChatStore.js";
import { MessagePreviewDiv } from "./RecentChatBar.jsx";
const SearchOnDiv = () => {
  const recentChats = ChatStore((s) => s.recentUsers);

  return (
    <div
      id="searchOnDiv_container"
      style={{ position: "absolute", width: "600px", height: "800px" }}
    >
      <div>
        <input type="text" placeholder="search chats"></input>
      </div>
      <div>
        {recentChats.map((chat) => {
          return <MessagePreviewDiv chatInfo={chat} />;
        })}
      </div>
    </div>
  );
};

export default SearchOnDiv;
