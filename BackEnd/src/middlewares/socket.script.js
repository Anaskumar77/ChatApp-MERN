const socketHandler = ({ socket, io }) => {
  socket.on("join_group", ({ groupId, userId }) => {
    socket.join(groupId);

    console.log(`user: ${userId} joined room : ${groupId}`);
  });

  socket.on("send_group_message", ({ groupId, senderId, content }) => {
    const message = { senderId, groupId, content, createdAt: new Date() };
    console.log(message);
  });
};

export default socketHandler;

// export const sendBackMessage = ({sockt,io})=>{
//   io.to()

// }
