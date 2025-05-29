import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserModel" }],

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MessageModel",
    },

    Group_avatar: {
      type: String,
      default: "",
    },
  },

  {
    timestamps: true,
  }
);

const ChatModel = mongoose.Aggregate.model("Chat", ChatSchema);

export default ChatModel;
