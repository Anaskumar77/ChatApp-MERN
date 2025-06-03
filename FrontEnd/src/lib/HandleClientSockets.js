import AuthStore from "./Store/AuthStore.js";
//
//
const HandleClientSockets = (socket) => {
  const { setOnlineUsers, onlineUsers } = AuthStore.getState();
  console.log("Handle Client Sockets start");

  //______________________________________________

  socket.on("getOnlineUsers", (userIds) => {
    //
    console.log("userIds : ", userIds);

    setOnlineUsers(userIds);
  });

  //______________________________________________
};

export default HandleClientSockets;
