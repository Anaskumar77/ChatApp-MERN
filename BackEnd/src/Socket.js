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

console.log("socket.js running");

const onlineUsers = {}; // {userId : socket.id}

io.on("connection", (socket) => {
  console.log("hello");
  console.log("socket connected", socket.id);

  //  store online users funtion
  const userId = socket.handshake.query.userId;

  io.emit("getOnlineUsers", Object.keys(onlineUsers));
  if (userId) {
    onlineUsers[userId] = socket.id;
  }

  //
  socketHandler(socket);
  //

  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
    delete onlineUsers[userId];
  });
});

export { app, server, io };
