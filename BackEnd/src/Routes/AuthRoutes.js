import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";
import GenerateToken from "../lib/GenerateToken.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ message: "not enough signup data" });
  }
  const salt = await bcrypt.genSalt(20);
  const hashed_password = await bcrypt.hash(password, salt);
  const newUser = new UserModel({ name, email, password: hashed_password });
  try {
    const createdUser = await newUser.save();
    GenerateToken(createdUser._id, res);
    return res.json(createdUser);
  } catch (err) {
    return res.json({
      message: `error in new user creaion \n ${err.message}`,
    });
  }
});

// router.get("/signin", async (req, res) => {
//   const { email, password } = req.body;
// });

export default router;
