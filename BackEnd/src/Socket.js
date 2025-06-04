import express from "express";
import { Server } from "socket.io";
import http from "http";
import socketHandler from "./middlewares/socket.script.js";
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

let onlineUsers = {}; // {userId : socket.id}

io.on("connection", (socket) => {
  console.log("1 : socket connected", socket.id);

  //  store online users funtion
  const userId = socket.handshake.query.userId;

  onlineUsers[userId] = socket.id;

  console.log("online", onlineUsers);

  io.emit("getOnlineUsers", Object.keys(onlineUsers)); // emitting the userID / authUser._id to each client

  //
  socketHandler(socket);
  //

  socket.on("disconnect", () => {
    console.log("2 : socket disconnected", socket.id);
    delete onlineUsers[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

export { app, server, io };
