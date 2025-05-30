import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    isGroup: {
      type: Boolean,
      default: false,
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

const RoomModel = mongoose.model("Room", RoomSchema);

export default RoomModel;
