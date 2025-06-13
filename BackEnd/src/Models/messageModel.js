import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    content: {
      type: String,
      required: true,
    },
    media: {
      type: String || null, // options : image , text
    },
    mediaType: {
      type: String,
    },
    status: {
      type: String,
      required: true, //   options:  send , delivered , seen
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;
