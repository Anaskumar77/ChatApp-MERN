import bcrypt from "bcrypt";
// import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";
import GenerateToken from "../lib/GenerateToken.js";
import User from "../Models/userModel.js";
import cloudinary from "../lib/CloudinaryConfig.js";

//
// if token in cookie, atomaticaly send with req by allowing withCredentials: true ,
//if token stored in localStorage/session storage  ,manually add it in header , use bearer
//

////////////////////////////////////////////////////////////////////////

export const authCheck = async (req, res) => {
  try {
    //
    res.status(200).json(req.user);
    console.log("AuthCheck happend");
    //
  } catch (err) {
    //
    res.status(500).json({ message: err.message });
  }
};

///////////////////////////////////////////////////////////////////////////

export const signup = async (req, res) => {
  //
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

    res.json(createdUser);
    //
  } catch (err) {
    //
    res.json({
      message: `error in new user creaion \n ${err.message}`,
    });
  }
};

////////////////////////////////////////////////////////////////////////

export const login = async (req, res) => {
  //
  const { email, password } = req.body;

  try {
    //
    const fetched_user = await User.findOne({ email: email });
    if (!fetched_user) {
      return res.status(400).json({ message: "user does not exist" });
    }
    bcrypt.compare(password, fetched_user.password).then((isMatch) => {
      if (isMatch) {
        GenerateToken(fetched_user._id, res);
        res.json(fetched_user);
      } else {
        return res.json({ message: "password is incurrect" });
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ message: `login failed ${err.message}` });
  }
};

//////////////////////////////////////////////////////////////////////////

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
  } catch (err) {
    res.status(500).json({ message: `logout failed ${err.message}` });
  }
};

////////////////////////////////////////////////////////////////////////////

export const profileUpdate = async (req, res) => {
  const userId = req.user._id;

  const { profilePic } = req.body;

  if (!profilePic) return res.json({ message: "profilepic is missing" });

  try {
    const res_url = await cloudinary.uploader.upload(profilePic, {
      folder: "uploads",
    });

    console.log(res_url.secure_url);

    if (!res_url)
      return res.json({ message: "failed to export image to the cloud" });

    try {
      const DB_response = await UserModel.findByIdAndUpdate(
        { _id: userId },
        { avatar: res_url.secure_url }
      );
      console.log(DB_response);
      return res.status(201).json(DB_response);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: err.message });
    }
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: err });
  }
};
