import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./lib/DBConnect.js";
import authRoutes from "./Routes/AuthRoutes.js";
import messageRoutes from "./Routes/MessageRoutes.js";
import Authorization from "./middlewares/Authorization.js";
import { server, app } from "./lib/Socket.js";

dotenv.config();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

app.get("/", (req, res) => {
  console.log(connection);
  res.send(connection);
});

app.use("/api/auth/", authRoutes);
app.use("/api/user/", Authorization, messageRoutes);

server.listen(process.env.PORT || 3000, () => {
  const connection = connectDB();
  connection ? console.log("dB Done") : console.log("Db not Done");
});
// useNewUrlParser: true,
//useUnifiedTopology: true,
//bufferCommands: false
