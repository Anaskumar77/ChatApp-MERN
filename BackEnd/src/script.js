import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/DBConnect.js";
import authRoutes from "./Routes/AuthRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

app.get("/", (req, res) => {
  console.log(connection);
  res.send(connection);
});

app.use("/api/auth/", authRoutes);

app.listen(process.env.PORT || 3000, () => {
  const connection = connectDB();
  connection ? console.log("dB Done") : console.log("Db not Done");
});
