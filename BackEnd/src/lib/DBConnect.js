const mongoose = require("mongoose");

const connectDB = async (req, res) => {
  try {
    const IsDB_Connect = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(IsDB_Connect);
  } catch (err) {
    console.log("DB connection failed \n", err.message);
    return res.json({ message: "DB connection is failed" });
  }
};

export default connectDB;
