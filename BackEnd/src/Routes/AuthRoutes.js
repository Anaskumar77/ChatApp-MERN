const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const mongoose = reqire("mongoose");
import UserModel from "../Models/userModel.js";

router.get("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (name && email && password) {
      const salt = await bcrypt.genSalt(20);
      const hashed_password = await bcrypt.hash(password, salt);
      const newUser = new UserModel(name, email, hashed_password);
      try {
        const User = await newUser.save();
        return res.json({ name, email });
      } catch (err) {
        return res.json({
          message: `error in new user creaion \n ${err.message}`,
        });
      }

      try {
      } catch (err) {}
    } else {
      return res.json({ message: "not enough signup data" });
    }
  } catch {
    return res.json({ message: "signUp failed" });
  }
});

router.get("/signin", async (req, res) => {
  const { email, password } = req.body;
});

export default router;
