import jwt from "jsonwebtoken";
const GenerateToken = (userId, res) => {
  try {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.IS_PRODUCTION === "Yes",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return token;
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "cookie creation failed" });
  }
};

export default GenerateToken;
