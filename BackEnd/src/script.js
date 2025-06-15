import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./lib/DBConnect.js";
import authRoutes from "./Routes/AuthRoutes.js";
import messageRoutes from "./Routes/MessageRoutes.js";
import searchRoutes from "./Routes/searchRoutes.js";
import { server, app } from "./Socket.js";
import cors from "cors";
import fileUpload from "express-fileupload";

dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(fileUpload());

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

app.get("/api/test", (req, res) => {
  res.json({ message: "CORS is working!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/search", searchRoutes);
console.log("ROUTES LOADED");

server.listen(process.env.PORT, () => {
  const connection = connectDB();
  connection ? console.log("dB Done") : console.log("Db not Done");
});
// useNewUrlParser: true,
//useUnifiedTopology: true,
//bufferCommands: false
