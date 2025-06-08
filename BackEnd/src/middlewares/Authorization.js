import jwt from "jsonwebtoken";
import UserModel from "../Models/userModel.js";
import User from "../Models/userModel.js";
const Authorization = async (req, res, next) => {
  const authToken = req.cookies.authToken;

  if (!authToken) {
    return res.status(401).json({ message: "unauthorized : no token" });
  }
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(403).json({ message: "invalid token" });
    }
    req.user = user;
    console.log("yoo authorization done");
    next();
    //
  } catch (err) {
    //
    res.status(500).json({ message: err.message });
  }
};

export default Authorization;
