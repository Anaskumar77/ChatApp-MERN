import ChatStore from "../lib/Store/ChatStore.js";

const setAllTab = () => {
  const AllChats = ChatStore((s) => s.AllChats);
  const OnlineChats = ChatStore((s) => s.OnlineChats);
  const PrivateChats = ChatStore((s) => s.PrivateChats);
  const GroupChats = ChatStore((s) => s.GroupChats);
};

export default setAllTab;
