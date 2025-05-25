import mongoose from "mongoose";

const connectDB = async (res) => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // bufferCommands: false,
    });
  } catch (err) {
    console.log("3 DB connection failed \n", err.message);
  }
};

export default connectDB;
