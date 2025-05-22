const express = require("express");
const dotenv = require("dotenv");
const app = express();

import connectDB from "./lib/DBConnect.js";

dotenv.config();
app.use(express.json());

connectDB();

// app.get("/", (req, res) => {
//   res.send(app);
// });

app.use("/api/auth/", authRoutes);

app.listen(process.env.PORT || 3000);
