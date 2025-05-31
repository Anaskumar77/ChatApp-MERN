import React from "react";
import SideBar from "../Components/SideBar.jsx";
import ChatBar from "../Components/ChatBar.jsx";
import ChatRoom from "../Components/ChatRoom.jsx";

//

const HomePage = () => {
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
      <SideBar></SideBar>
      <ChatBar></ChatBar>
      <ChatRoom></ChatRoom>
    </div>
  );
};

export default HomePage;
