import "../Styles/SideBar.css";
import TelegramIcon from "@mui/icons-material/Telegram";
import ForumIcon from "@mui/icons-material/Forum";
import ChatIcon from "@mui/icons-material/Chat";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import CallIcon from "@mui/icons-material/Call";
import SettingsIcon from "@mui/icons-material/Settings";
const SideBar = () => {
  return (
    <div id="SideBar_Container">
      <div className="SideBar_option">
        <TelegramIcon />
      </div>
      <div id="SideBar_Options_div">
        <div className="SideBar_option">
          <ForumIcon></ForumIcon>
          group
        </div>
        <div className="SideBar_option">
          <ChatIcon />
          chat
        </div>
        <div className="SideBar_option">
          <CallIcon />
        </div>
        <div className="SideBar_option">
          <PermContactCalendarIcon />
        </div>
        <div className="SideBar_option">
          <SettingsIcon />
        </div>
      </div>
      <div id="SideBar_Profile_Icon_div SideBar_option"></div>
    </div>
  );
};

export default SideBar;
