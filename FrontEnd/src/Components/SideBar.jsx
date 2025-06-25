import "../Styles/SideBar.css";
import TelegramIcon from "@mui/icons-material/Telegram";
import SettingsIcon from "@mui/icons-material/Settings";
import singleChatIcon from "/single_chat.png";
import GroupChatIcon from "/group_chat.png";
import defaultProfile from "/defaultProfile.jpg";
import PhoneBookIcon from "/phone_book.png";
import AuthStore from "../lib/Store/AuthStore";
const SideBar = () => {
  const authUser = AuthStore((s) => s.authUser);

  return (
    <div id="SideBar_Container">
      <div id="SideBar_sub_container">
        <div className="SideBar_option">
          <div id="SB_Logo_div">
            <TelegramIcon className="SB_Logo" />
          </div>
        </div>
        <div id="SideBar_Options_div">
          <div className="SideBar_option">
            <img className="SB_icons" src={GroupChatIcon}></img>
            <h6>Group</h6>
          </div>
          <div className="SideBar_option">
            <img className="SB_icons" src={singleChatIcon}></img>

            <h6>Chat</h6>
          </div>
          <div className="SideBar_option">
            <img src={PhoneBookIcon}></img>
            <h6>Users</h6>
          </div>
        </div>
        <div className="SideBar_option SB_settingsDiv">
          <SettingsIcon id="SB_settings" />
          <h6>Settings</h6>
        </div>
        <div className="SideBar_option ">
          <div className="SB_profileDiv">
            <img
              id="SB_profile"
              src={authUser?.avatar ? authUser.avatar : defaultProfile}
            ></img>
          </div>
          <h6>profile</h6>
        </div>
      </div>

      <div id="SideBar_Profile_Icon_div SideBar_option"></div>
    </div>
  );
};

export default SideBar;
