import express from "express";
import { Server } from "socket.io";
import http from "http";
import socketHandler from "./middlewares/socket.script.js";
import UserModel from "./Models/userModel.js";
import onlineUsers from "./lib/onlineUsers.js";
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

export const getReceiverSocketId = (userId) => {
  return onlineUsers[userId];
};

io.on("connection", async (socket) => {
  console.log("1 : socket connected", socket.id);

  //  store online users funtion
  const userId = socket.handshake.query.userId;

  try {
    onlineUsers[userId] = socket.id; // {userId : socket.id}

    const res = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { status: true }
    );
    console.log(res);
  } catch (err) {
    console.log(err);
  }

  console.log("online", onlineUsers);

  io.emit("getOnlineUsers", Object.keys(onlineUsers)); // emitting the userID / authUser._id to each client

  socketHandler({ socket, io });

  socket.on("disconnect", async () => {
    //
    console.log("2 : socket disconnected", socket.id);

    delete onlineUsers[userId];

    await UserModel.findByIdAndUpdate({ _id: userId }, { status: false });

    io.emit("getOnlineUsers", Object.keys(onlineUsers));
    //
  });
});

export { app, server, io };
