import React, { useState, useEffect, useCallback } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import ChatStore from "../lib/Store/ChatStore";
import "../Styles/AddRoomPage.css";

const AddRoomDiv = ({ setIsRoomOpen }) => {
  //

  const getSearchedUsers = ChatStore((s) => s.getSearchedUsers);

  const [inputText, setInputText] = useState("");
  const [users, setUsers] = useState([]);
  const fetch_limit = 20;

  useCallback(getSearchedUsers, [getSearchedUsers]);

  useEffect(() => {
    const input = inputText.trim();
    if (input === "") return;
    getSearchedUsers({ input, fetch_limit });
  }, [inputText, getSearchedUsers]);

  // useEffect(() => {
  //   const input = inputText.trim();
  //   if (input === "") return;

  //   setUsers([{ name: "Anas" }, { name: "ajith" }]);
  // }, [inputText]);

  const IndividualUser = (items) => {
    return (
      <div id="iu_container">
        <div id="iu_pfp_div">
          <div id="iu_pfp_circle">
            <img></img>
          </div>
        </div>
        <div id="iu_name_div">
          <h3>{items.name}</h3>
        </div>
      </div>
    );
  };

  return (
    <div
      onClick={(e) =>
        e.target.id === "AddRoom_page" ? setIsRoomOpen(false) : null
      }
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
          <ForumIcon />
          <h4>New Group</h4>
        </div>
        <div id="ar_usersList_div">
          {users.map((items) => {
            return <IndividualUser info={items} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default AddRoomDiv;
