import MessageModel from "../Models/messageModel.js";
import RoomModel from "../Models/roomModel.js";
import UserModel from "../Models/userModel.js";
import { io, getReceiverSocketId } from "../Socket.js";

//=================================================================
// Create Group and respond with RoomModel response

export const createGroup = async (req, res) => {
  const userId = req.user._id;
  const usersList = req.body;

  if (!userId || !usersList)
    return res.json({ message: "please provide users list" });

  try {
    const newRoomModel = new RoomModel({
      name: "untitled",
      isGroup: true,
      users: [...usersList, userId],
      admin: [userId],
    });
    const createdRoom = await newRoomModel.save();

    if (createdRoom) {
      console.log(createdRoom);
      return res.status(201).json(createdRoom);
    } else {
      return res.status(500).josn({ message: "failed creating room model" });
    }
  } catch (err) {
    b;
    console.log(err.message);
    return res.json({ message: err.message });
  }
};

//===============================================================
// creating private chat and respond with RoomModel reposnse

export const createPrivate = async (req, res) => {
  const receiverIdList = req.body;
  const userId = req.user._id;

  const receiverId = receiverIdList[0]; //accessing the only element

  if (!userId || !receiverId)
    return res.json({ message: "please provide users List" });

  try {
    const receiverInfo = await UserModel.findById({ _id: receiverId });

    if (!receiverInfo) return res.json({ message: "cannot find receiver" });

    // checking is there a room exist already
    const isAnyRoomFind = await RoomModel.findOne({
      isGroup: false,
      admin: { $all: [userId, receiverId] },
    });

    //if any room exist ? then return room : else create new one
    if (isAnyRoomFind) return res.status(200).json(isAnyRoomFind);

    const newPrivateRoom = new RoomModel({
      name: receiverInfo.name,
      isGroup: false,
      users: [...receiverIdList, userId],
      admin: [...receiverIdList, userId],
      Group_avatar: receiverInfo.avatar,
    });

    const newRoomRes = await newPrivateRoom.save();

    if (newRoomRes) return res.status(201).json(newRoomRes);
    //
  } catch (err) {
    //
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "failed to create private room model" });
  }
};

//===============================================================
// for searching users in global level

export const searchUsers = async (req, res) => {
  const { input, limit } = req.query;

  if (!input || !limit) return res.json({ message: "no query" });

  try {
    const users = await UserModel.find({
      name: { $regex: input, $options: "i" },
    }).limit(Number(limit));

    return res.json(users);
  } catch (err) {
    console.log(err.message);
  }
};

//====================================================================

export const fetchChatMessages = (req, res) => {
  //  For getting all messages of a specific room

  const userId = req.user._id;

  const { receiverId } = req.params;

  if (!receiverId) return res.json({ message: "no receiver id" });

  //  get reciever id

  //  find messages with user and receiver are either sender or receiver in messageModel
  //

  //
  // grtting specific chat messages logic
  //
  //
};

//=================================================================
// For tab-All

export const fetchLatestChats = async (req, res) => {
  //
  const userId = req.user._id; // only exists if it has authorized

  console.log("latest users\n\n\n\n\n\n");

  try {
    //
    const recentChats = await RoomModel.find({
      $or: [{ users: userId }, { admin: userId }],
    })
      .populate({
        path: "lastMessage",
        select: "content timestamp createdAt",
        populate: {
          path: "sender",
          select: "name",
        },
      })
      .lean();

    console.log(recentChats);

    if (recentChats) return res.status(200).json(recentChats);

    //
  } catch (err) {
    console.log(err.message);
    return res.json({ message: err.message });
  }
};

//======================================================================
// For Tab online

export const fetchOnlineChats = (req, res) => {
  const userId = req.user._id;

  //fetch online users
  try {
    console.log("fatch online chats");
  } catch (err) {
    console.log(err.message);
  }
};

//=====================================================================

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

//========================================================================

export const Anjali = async (req, res) => {
  res.json({ message: "yee" });
  console.log("anjali");
};

// export const
