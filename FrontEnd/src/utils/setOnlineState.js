import AuthStore from "../lib/Store/AuthStore";

const setOnlineState1 = () => {
  const onlineUsers = AuthStore((s) => s.onlineUsers); // it only active if you call it manualy
};

export default setOnlineState1;
