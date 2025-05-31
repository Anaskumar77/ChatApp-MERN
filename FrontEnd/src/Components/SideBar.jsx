import "../Styles/SideBar.css";

const SideBar = () => {
  return (
    <div id="SideBar_Container">
      <div className="SideBar_option">Logo</div>
      <div id="SideBar_Options_div">
        <div className="SideBar_option">All</div>
        <div className="SideBar_option">Group</div>
        <div className="SideBar_option">Contacts</div>
        <div className="SideBar_option">Settings</div>
      </div>
      <div id="SideBar_Profile_Icon_div SideBar_option"></div>
    </div>
  );
};

export default SideBar;
