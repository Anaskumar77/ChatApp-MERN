import { useState } from "react";
import ChatStore from "../lib/Store/ChatStore.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
export default function ScrollableTabsButtonPrevent() {
  //
  const [value, setValue] = useState(0);
  const [tab, setTab] = useState("All");

  const setCurrentTab = ChatStore((state) => state.setCurrentTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabList = ["All", "Online", "Private", "Group"];

  return (
    <Box
      sx={{ maxWidth: { xs: 320, sm: 400 }, bgcolor: "none" }}
      style={{ scrollbarWidth: "0px" }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
        style={{ scrollbarWidth: "0px" }}
      >
        {TabList.map((tabs) => {
          return (
            <Tab
              name={tabs}
              onClick={(e) => setCurrentTab(e.target.name)}
              label={tabs}
            />
          );
        })}
        {/* <Tab label="All" />
        <Tab label="online" />
        <Tab label="Private" />
        <Tab label="Group" /> */}
      </Tabs>
    </Box>
  );
}
