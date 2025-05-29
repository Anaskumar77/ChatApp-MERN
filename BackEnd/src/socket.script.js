const socketHandler = (io) => {
  //
  io.on("connection", (socket) => {
    socket.log("User connected", `connected: ${socket.id}`);

    socket.on("join_chat", async () => {
      //
      //
      //getting chat logic
      //
      //
    });
    socket.on("send_message", async () => {
      //
      //
      //sending message logic
      //
      //
    });
    socket.on("disconnect", () => {
      console.log(`disconnected: ${socket.id}`);
    });
  });

  //
};

export default socketHandler;
