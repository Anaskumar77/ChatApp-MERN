import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
  } catch (err) {
    console.log("3 DB connection failed \n", err.message);
    return res.json({ message: "DB connection is failed" });
  }
};

export default connectDB;
