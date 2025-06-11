import React, { useState, useEffect, useCallback } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import ChatStore from "../lib/Store/ChatStore";
import "../Styles/AddRoomPage.css";

const AddRoomDiv = ({ setIsRoomOpen }) => {
  //

  const getSearchedUsers = ChatStore((s) => s.getSearchedUsers);
  const searchedUsers = ChatStore((s) => s.searchedUsers);
  const setSearchedUsers = ChatStore((s) => s.setSearchedUsers);
  const setSelectedUser = ChatStore((s) => s.setSelectedUser);
  const createRoom = ChatStore((s) => s.createRoom);
  //
  const [inputText, setInputText] = useState("");
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
  const [isGroupOn, setIsGroupOn] = useState(false);
  const fetch_limit = 20;

  useCallback(getSearchedUsers, [getSearchedUsers]);

  useEffect(() => {
    const input = inputText.trim();
    if (input === "") return;
    getSearchedUsers({ input, fetch_limit });
  }, [inputText, getSearchedUsers]);

  //====================================================================

  const HandleCreateRoomSubmit = (isGroupOn) => {
    createRoom(selectedGroupMembers, isGroupOn);
  };

  const IndividualUser = ({ info }) => {
    return (
      <div
        onClick={() => {
          if (isGroupOn) {
            if (selectedGroupMembers.includes(info._id)) {
              setSelectedGroupMembers(
                selectedGroupMembers.filter((id) => id != info._id)
              );
            } else {
              setSelectedGroupMembers((prev) => [...prev, info._id]);
            }
          } else {
            setSelectedGroupMembers(() => [info._id]);
            HandleCreateRoomSubmit(isGroupOn);
          }
        }}
        id="iu_container"
        className={
          selectedGroupMembers.includes(info._id)
            ? "iu_container_selected"
            : "iu_container_unselected"
        }
      >
        <div id="iu_pfp_div ">
          <div id="iu_pfp_circle">
            <img></img>
          </div>
        </div>
        <div id="iu_name_div">
          <h3>{info.name}</h3>
          <h6>{info._id}</h6>
        </div>
      </div>
    );
  };

  return (
    <div
      onClick={(e) => {
        if (e.target.id === "AddRoom_page") {
          setIsRoomOpen(false);
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
        <div
          id="ar_newGroup_div"
          onClick={() => {
            setIsGroupOn((prev) => !prev);
          }}
        >
          <ForumIcon />
          <h4>New Group</h4>
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
          {"->"}
        </button>
      </div>
    </div>
  );
};

export default AddRoomDiv;
