import { useRef, useState, useEffect } from "react";
import ChatStore from "../lib/Store/ChatStore.js";
import AuthStore from "../lib/Store/AuthStore.js";
import "../Styles/Profile.css";
import bannerImg from "/defaultBanner.jpg";
import pfp from "/defaultProfile.jpg";
const Profile = () => {
  const imageUpload = AuthStore((s) => s.imageUpload);
  const selectedUserId = ChatStore((s) => s.selectedUserId);
  const [selectedImage, setSelectedImage] = useState();

  const fileRef = useRef();

  const handleFileClick = () => {
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    //
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64image = reader.result;
      setSelectedImage(base64image);
      imageUpload({ profilePic: base64image });
    };
  };

  return (
    <>
      {
        <div id="selfProfile_container">
          <div id="selfProfile_sub_container">
            <div id="selfProfile_scroll_container">
              <div id="selfProfile_hero_section">
                <img
                  id="hero_section_bg_img"
                  src={
                    selectedImage
                      ? selectedImage
                      : selectedUserId
                      ? selectedUserId.avatar !== ""
                        ? selectedUserId.avatar
                        : bannerImg
                      : bannerImg
                  }
                ></img>
                <div id="hero_sec_img_overlay">
                  <div className="s_p_pfp_div">
                    <img
                      className="s_p_pfp"
                      src={
                        selectedImage
                          ? selectedImage
                          : selectedUserId
                          ? selectedUserId.avatar !== ""
                            ? selectedUserId.avatar
                            : pfp
                          : pfp
                      }
                    ></img>
                    <div className="pfp_edit_button">
                      <input
                        type="file"
                        accept="image/*"
                        className="pfp_input"
                        ref={fileRef}
                        onChange={(e) => handleFileChange(e)}
                      ></input>
                    </div>
                    <div className="pfp_input_icon" onClick={handleFileClick}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000000"
                      >
                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="s_p_pfp_name_about">
                    <h1 className="s_p_name">Name</h1>
                    <h2 className="s_p_about">Available</h2>
                  </div>
                </div>
              </div>
              <div id="selfProfile_container_two">
                <div className="s_p_form">
                  {/* <input type="file" className="s_p_edit_pfp_button"></input> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {/* <div id="profile_container">
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
      </div> */}
    </>
  );
};

export default Profile;
