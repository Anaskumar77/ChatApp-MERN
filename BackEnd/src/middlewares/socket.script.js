const socketHandler = ({ socket, io }) => {
  socket.on("join_group", ({ groupId, userId }) => {
    socket.join(groupId);

    console.log(`user: ${userId} joined room : ${groupId}`);
  });

  socket.on("send_group_message", ({ groupId, senderId, content }) => {
    const message = { senderId, groupId, content, createdAt: new Date() };

    //  sending message in real time .even if there is no online user ,it causes no error
    io.to(groupId).emit("receive_group_message", message);
    console.log(message);
  });
};

export default socketHandler;
