import jwt from "jsonwebtoken";
import UserModel from "../Models/userModel.js";

const Authorization = async (req, res, next) => {
  const authHeader = req.body.Authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.json({ message: "unAuthorized" });
  }
  try {
    const verified_ID = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(verified_ID);
    const user = await UserModel.findOne({ _id: verified_ID }).select(
      "-password"
    );
    console.log(user);
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).json({ message: "unAuthorized user" });
  }
};

export default Authorization;
