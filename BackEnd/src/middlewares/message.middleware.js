import MessageModel from "../Models/messageModel.js";
import RoomModel from "../Models/roomModel.js";
import UserModel from "../Models/userModel.js";
import { io, getReceiverSocketId } from "../Socket.js";
//
export const sendSearchedUsers = (req, res) => {
  //
  // get limited user

  return res.status(200).json({ message: " go work in it" });
};
export const fetchLatestChats = async (req, res) => {
  //
  const userId = req.user._id; // only exists if it has authorized
  try {
    //
    const recentChats = await RoomModel.find({
      $or: [{ users: userId }, { admin: userId }],
    });

    if (recentChats) return res.status(200).json(recentChats);

    //
  } catch (err) {
    console.log(err.message);
    return res.json({ message: err.message });
  }
};

export const fetchChatMessages = (req, res) => {
  //
  const userId = req.user._id;

  //  get reciever id

  //  find messages with user and receiver are either sender or receiver in messageModel
  //

  //
  // grtting specific chat messages logic
  //
  //
};

export const sendMessages = (req, res) => {
  //
  //save it to the data base
  //
  // sending logic
  //if q clint is online you can send the messge live
  const receiverSocketId = getReceiverSocketId(userId);
  if (receiverSocketId) io.to(receiverSocketId).emit("message");

  //
};

// export const
