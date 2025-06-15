import React from "react";
import "../Styles/MessageGrid.css";
import pfp from "/image.png";
import AuthStore from "../lib/Store/AuthStore.js";

const MessageGrid = ({ message }) => {
  const authUser = AuthStore((s) => s.authUser);

  return (
    <div
      id="message_grid_container"
      className={message.sender?._id == authUser._id ? "m_end" : null}
    >
      <div id="message_grid">
        <div id="m_g_profilePic_sec">
          <div className="m_g_pfp_div">
            <img
              src={message.sender?.avatar !== "" ? message.sender?.avatar : pfp}
              className="m_g_pfp_img"
              alt="/image.png"
            ></img>
          </div>
        </div>
        <div id="m_g_message_sec">
          <div id="m_g_name_time">
            <h1>{message.sender?.name}</h1>
            <h2>
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                // second: "2-digit",   // uncammand this if you want seconds alse
              })}
            </h2>
          </div>
          <div className="m_g_content">{message.content}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageGrid;
