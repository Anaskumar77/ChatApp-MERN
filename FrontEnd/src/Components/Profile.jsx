import React from "react";
import ChatStore from "../lib/Store/ChatStore.js";
import AuthStore from "../lib/Store/AuthStore.js";
const Profile = () => {
  const selectedUser = ChatStore((s) => s.selectedUser); //selectedUser

  return (
    <div id="profile_container">
      <div className="p_divs p_header_div"></div>
      <div className="p_divs p_avatar_div">
        <div></div>
        <div>
          <h3></h3>
        </div>
      </div>
      <div className="p_divs p_buttons_div"></div>
      <div className="p_divs p_header_div"></div>
      <div className="p_divs p_3row_div"></div>
      <div className="p_divs p_data_div"></div>
    </div>
  );
};

export default Profile;
