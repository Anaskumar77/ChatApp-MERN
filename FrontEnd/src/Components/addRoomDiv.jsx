import React, { useState, useEffect, useCallback } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import ChatStore from "../lib/Store/ChatStore";
import "../Styles/AddRoomPage.css";
import pfp from "/defaultProfile.jpg";
const AddRoomDiv = () => {
  //

  const getSearchedUsers = ChatStore((s) => s.getSearchedUsers);
  const searchedUsers = ChatStore((s) => s.searchedUsers);
  const setSearchedUsers = ChatStore((s) => s.setSearchedUsers);
  const createRoom = ChatStore((s) => s.createRoom);
  const setIsAddRoomVisibleFalse = ChatStore((s) => s.setIsAddRoomVisibleFalse);
  const isAddRoomVisible = ChatStore((s) => s.isAddRoomVisible);
  //
  const [inputText, setInputText] = useState("");
  const [groupName, setGroupName] = useState("");
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isGroupOn, setIsGroupOn] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const fetch_limit = 20;

  useCallback(getSearchedUsers, [getSearchedUsers]);

  useEffect(() => {
    const input = inputText.trim();
    if (input === "") return;
    setSearchedUsers([]);
    getSearchedUsers({ input, fetch_limit });
  }, [inputText, getSearchedUsers]);

  //====================================================================

  useEffect(() => {
    setSelectedIds(selectedGroupMembers.map((item) => item._id));
    if (trigger) {
      HandleCreateRoomSubmit(isGroupOn);
      setTrigger(false);
    }
    // setSelectedIds(selectedMembersIds);
  }, [selectedGroupMembers]);

  const HandleCreateRoomSubmit = (isGroupOn) => {
    if (isGroupOn) {
      const roomModel = {
        groupName,
        selectedIds,
      };
      createRoom(roomModel, isGroupOn);
    }
    // } else {
    //   console.log(selectedIds);
    //   createRoom(selectedIds, isGroupOn);
    // }
  };

  const IndividualUser = ({ info }) => {
    return (
      <div
        onClick={() => {
          if (isGroupOn) {
            if (selectedIds.includes(info._id)) {
              setSelectedGroupMembers(
                selectedGroupMembers.filter((user) => user._id != info._id)
              );
            } else {
              setSelectedGroupMembers((prev) => [...prev, info]);
            }
          } else {
            // setSelectedGroupMembers([info]);
            createRoom([info._id], false);

            setTrigger(true);
          }
        }}
        id="iu_container"
        className={
          selectedIds.includes(info._id)
            ? "iu_container_selected"
            : "iu_container_unselected"
        }
      >
        <div id="iu_pfp_circle">
          <img src={info.avatar !== "" ? info.avatar : pfp}></img>
        </div>
        <div id="iu_name_div">
          <h3 className="iu_name">{info.name}</h3>
          <h6
            style={{
              color: info.status === true ? "limegreen" : "#ffffff30",
              fontSize: "small",
            }}
          >
            {info.status === true ? "online" : "offline"}
          </h6>
        </div>
      </div>
    );
  };

  return (
    <div
      onClick={(e) => {
        if (e.target.id === "AddRoom_page") {
          setIsAddRoomVisibleFalse();
          setSearchedUsers([]);
          setSelectedGroupMembers([]);
        }
      }}
      id="AddRoom_page"
    >
      <div id="AddRoomContainer">
        <div id="ar_search_div">
          <input
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            type="text"
            placeholder="select contacts"
            id="add_room_searchbar"
          ></input>
        </div>
        <div id="ar_newGroup_div">
          <button
            id="ar_newGroup_button"
            style={{ background: !isGroupOn ? "#ffffff3d" : null }}
            onClick={() => {
              setIsGroupOn((prev) => !prev);
            }}
          >
            Group
          </button>
          <input
            id="ar_group_name_input"
            placeholder="name "
            onChange={(e) => setGroupName(e.target.value)}
          ></input>
        </div>

        <div id="ar_showAvatarsDiv">
          {selectedGroupMembers.map((user) => {
            return (
              <div className="ar_selected_img_div">
                <img
                  className="ar_selected_img"
                  src={user.avatar !== "" ? user.avatar : pfp}
                ></img>
                <h6 style={{ color: "white", fontSize: "12px" }}>
                  {user.name}
                </h6>
              </div>
            );
          })}
        </div>
        <div id="ar_usersList_div">
          {searchedUsers
            .filter((user) => user != null)
            .map((items) => {
              return <IndividualUser key={items._id} info={items} />;
            })}
        </div>
        <button
          id={isGroupOn ? "addRoomButton_visible" : "addRoomButton_invisible"}
          onClick={() => HandleCreateRoomSubmit(isGroupOn)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AddRoomDiv;
