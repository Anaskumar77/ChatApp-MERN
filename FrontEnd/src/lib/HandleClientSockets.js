import AuthStore from "../lib/Store/AuthStore.js";
import ChatStore from "../lib/Store/ChatStore.js";

const HandleClientSocket = () => {
  const socket = AuthStore((s) => s.socket);

  socket.on("receive_group_message", (resData) => {
    console.log("res data : ", resData);
  });
};

export default HandleClientSocket;
