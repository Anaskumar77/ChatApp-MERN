import bcrypt from "bcrypt";
// import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";
import GenerateToken from "../lib/GenerateToken.js";
import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";

//
// if token in cookie, atomaticaly send with req by allowing withCredentials: true ,
//if token stored in localStorage/session storage  ,manually add it in header , use bearer

export const authCheck = async (req, res) => {
  const authToken = req.cookies.authToken;
  console.log("authToken : ", authToken);
  if (!authToken) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    console.log("decoded : ", decoded);
    const user = await User.findOne({ _id: decoded.id });
    console.log("user : ", user);

    if (!user) {
      return res.status(403).json({ message: "invalid token" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.json({ message: err.message });
  }
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ message: "not enough signup data" });
  }

  const salt = await bcrypt.genSalt(8);

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
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const fetched_user = await User.findOne({ email: email });
    if (!fetched_user) {
      return res.status(400).json({ message: "user does not exist" });
    }
    bcrypt.compare(password, fetched_user.password).then((isMatch) => {
      if (isMatch) {
        GenerateToken(fetched_user._id, res);
        return res.json(fetched_user);
      } else {
        return res.json({ message: "password is incurrect" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.json({ message: `login failed ${err.message}` });
  }
};

export const logout = async (req, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 });
  } catch (err) {
    return res.status(500).json({ message: `logout failed ${err.message}` });
  }
};
