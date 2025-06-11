import React from "react";
import ChatStore from "../lib/Store/ChatStore.js";
import { MessagePreviewDiv } from "./RecentChatBar.jsx";
const SearchOnDiv = () => {
  const AllChats = ChatStore((s) => s.AllChats);

  return (
    <div
      id="searchOnDiv_container"
      style={{ position: "absolute", width: "600px", height: "800px" }}
    >
      <div>
        <input type="text" placeholder="search chats"></input>
      </div>
      <div>
        {AllChats.map((chat) => {
          return <MessagePreviewDiv chatInfo={chat} />;
        })}
      </div>
    </div>
  );
};

export default SearchOnDiv;
