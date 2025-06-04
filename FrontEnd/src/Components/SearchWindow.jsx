import React, { useState, useEffect } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import ChatStore from "../lib/Store/ChatStore";

const SearchWindow = () => {
  //

  const getSearchedUsers = ChatStore((s) => s.getSearchedUsers);

  const [inputText, setInputText] = useState("");
  const [users, setUsers] = useState([]);
  const fetch_limit = 20;

  useEffect(() => {
    // fetching online users upto 20 numbers

    const input = inputText.trim();

    if (input === "") return;

    const res = getSearchedUsers(input, fetch_limit);

    setUsers(res);
    //
  }, [inputText]);

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
    <div id="searchWindowContainer">
      <div id="sw_search_div">
        <input
          onChange={(e) => setInputText(e.target.value)}
          type="text"
          placeholder="select contacts"
        ></input>
      </div>
      <div id="sw_newGroup_div">
        <ForumIcon />
        <h4>New Group</h4>
      </div>
      <div id="sw_usersList_div">
        {users.map((items) => {
          return <IndividualUser info={items} />;
        })}
      </div>
    </div>
  );
};

export default SearchWindow;
