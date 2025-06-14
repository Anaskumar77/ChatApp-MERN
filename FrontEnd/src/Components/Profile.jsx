import ChatStore from "../lib/Store/ChatStore.js";
import "../Styles/Profile.css";
import bannerImg from "/defaultBanner.jpg";
const Profile = () => {
  const selectedUser = ChatStore((s) => s.selectedUser);

  return (
    <div id="profile_container">
      <div id="profile_sub_container">
        <div className="profile_banner_div">
          <div className="p_b_image_div">
            <img className="p_b_img" src={bannerImg}></img>
            <div className="p_b_img_overlay"></div>
          </div>
          <div className="p_b_status">
            <h1>Online</h1>
          </div>
          <div className="p_avatar_div"></div>
        </div>
        <div id="profile_info_div">
          <h1 className="profile_info_username">{selectedUser?.name}</h1>
          <h2 className="profile_info_about">
            available Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h2>
        </div>
        <div id="profile_email_div">
          <h1>example@gmail.com</h1>
        </div>
        <div id="p_3row_container">
          <div className="p_3row_tabs">media</div>
          <div className="p_3row_div">
            <div className="p_3row_sub_div">
              <div className="c_img column_images1">1</div>
              <div className="c_img column_images2">2</div>
              <div className="c_img column_images6">3</div>
              <div className="c_img column_images3">4</div>
              <div className="c_img column_images3">5</div>
              <div className="c_img column_images5">6</div>
              <div className="c_img column_images6">7</div>
              <div className="c_img column_images2">8</div>
              <div className="c_img column_images4">9</div>
              <div className="c_img column_images1">10</div>
              <div className="c_img column_images4">11</div>
              <div className="c_img column_images5">12</div>
              <div className="c_img column_images4">13</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
