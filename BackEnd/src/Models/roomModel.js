import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String, // if private > other user name || group name
      required: true,
    },

    isGroup: {
      type: Boolean,
      default: false,
    },

    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    admin: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
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
