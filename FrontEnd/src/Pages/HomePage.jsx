import React, { useEffect } from "react";
import SideBar from "../Components/SideBar.jsx";
import RecentChatBar from "../Components/RecentChatBar.jsx";
import ChatRoom from "../Components/ChatRoom.jsx";
import Profile from "../Components/Profile.jsx";
import ChatStore from "../lib/Store/ChatStore.js";
//

const HomePage = () => {
  const getAllRoom = ChatStore((s) => s.getAllRoom);

  useEffect(() => {
    getAllRoom();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "stretch",
        height: "100dvh",
        width: "100dvw",
      }}
      id="HomePage_container"
    >
      <SideBar />
      <RecentChatBar />
      <ChatRoom />
      <Profile />
    </div>
  );
};

export default HomePage;
