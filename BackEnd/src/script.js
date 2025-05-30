import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./lib/DBConnect.js";
import authRoutes from "./Routes/AuthRoutes.js";
import messageRoutes from "./Routes/MessageRoutes.js";
import Authorization from "./middlewares/Authorization.js";
import { server, app } from "./lib/Socket.js";
import cors from "cors";

dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

app.get("/api/test", (req, res) => {
  res.json({ message: "CORS is working!" });
});

app.get("/", (req, res) => {
  console.log(connection);
  res.send(connection);
});

app.use("/api/auth/", authRoutes);
app.use("/api/message/", Authorization, messageRoutes);

server.listen(process.env.PORT, () => {
  const connection = connectDB();
  connection ? console.log("dB Done") : console.log("Db not Done");
});
// useNewUrlParser: true,
//useUnifiedTopology: true,
//bufferCommands: false
