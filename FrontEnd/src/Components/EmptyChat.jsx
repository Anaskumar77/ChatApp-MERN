import React from "react";
import BookIcon from "/book_icon.png";
import RedSphere from "/Ruffled_Sphere.jpg";
import Cactus from "/cactus.png";
import "../Styles/EmptyChat.css";
const EmptyChat = () => {
  return (
    <div id="EmptyChat_container">
      <div id="EC_sub_container">
        <div id="EC_blur_bg"></div>
        <img id="EC_img" src={BookIcon}></img>
        <div id="EC_text_div">
          <h1 className="EC_text">No Chat Selected</h1>
          <img className="EC_text_cactus" src={Cactus}></img>
        </div>
      </div>
    </div>
  );
};

export default EmptyChat;
