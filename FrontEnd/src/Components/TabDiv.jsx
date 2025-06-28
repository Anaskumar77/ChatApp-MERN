import { useState, useRef } from "react";
import ChatStore from "../lib/Store/ChatStore.js";
import "../Styles/TabDiv.css";
export default function ScrollableTabsButtonPrevent() {
  //
  const [value, setValue] = useState(0);
  const [tab, setTab] = useState("All");

  const setCurrentTab = ChatStore((state) => state.setCurrentTab);
  const currentTab = ChatStore((state) => state.currentTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabRef = useRef("All");

  const TabList = ["All", "Online", "Private", "Group"];

  return (
    <div id="tab_div_container">
      {TabList.map((Tab, index) => {
        return (
          <div id="tab_div">
            <div
              ref={tabRef}
              key={index}
              onClick={(e) => {
                setCurrentTab(e.target.innerText);
              }}
              className={
                Tab == currentTab
                  ? "tab_name_div current_tab"
                  : "tab_name_div not_curret_tab"
              }
            >
              {Tab}
            </div>
          </div>
        );
      })}
    </div>
  );
}
