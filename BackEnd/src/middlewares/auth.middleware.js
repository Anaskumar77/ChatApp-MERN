// import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";
import GenerateToken from "../lib/GenerateToken.js";
import User from "../Models/userModel.js";

//

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
  console.log(email);
  try {
    const fetched_user = await User.findOne({ email: email });
    console.log(fetched_user);
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
