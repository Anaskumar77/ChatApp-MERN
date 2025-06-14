import MessageModel from "../Models/messageModel.js";
import RoomModel from "../Models/roomModel.js";
import UserModel from "../Models/userModel.js";
import { io, getReceiverSocketId } from "../Socket.js";
import multer from "multer";
import cloudinary from "../lib/CloudinaryConfig.js";
import onlineUsers from "../lib/onlineUsers.js";

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
    return res.json({
      message: `please provide users List ${userId},${receiverId}`,
    });

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
      _id: { $ne: req.user._id },
    }).limit(Number(limit));

    return res.json(users);
  } catch (err) {
    console.log(err.message);
  }
};

//====================================================================

export const fetchChatMessages = async (req, res) => {
  //  For getting all messages of a specific room
  console.log("hello");
  const receiverId = req.params.id; // means room id
  console.log(receiverId);

  if (!receiverId) return res.json({ message: "no receiver id" });

  try {
    const messagesRes = await MessageModel.find({ room: receiverId }).sort({
      createdAt: 1,
    });

    if (!messagesRes)
      return res
        .status(500)
        .json({ message: "fetchChatMessages : failed to fetch messages" });

    return res.status(200).json(messagesRes);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

//=================================================================
// For tab-All

export const fetchLatestChats = async (req, res) => {
  //
  const userId = req.user._id; // only exists if it has authorized

  try {
    //
    const recentChats = await RoomModel.find({
      $or: [{ users: userId }, { admin: userId }],
    })
      .populate({
        path: "users",
        select: "name",
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

//=====================================================================

export const sendMessages = async (req, res) => {
  //
  const userId = req.user._id;
  const { groupId, message, media } = req.body;

  if (!groupId || !message)
    return res.status(400).json({ message: "provide group id and message" });

  try {
    //
    let mediaURL = null;

    if (media) {
      //
      mediaURL = await cloudinary.uploader.upload(media);
      //
      if (!mediaURL)
        return res
          .status(500)
          .json({ message: "error in uploading the file " });
    }
    console.log("mediaURL: ", mediaURL, groupId);

    const newMessage = new MessageModel({
      sender: userId,
      room: groupId,
      content: message,
      media: mediaURL?.secure_url,
      status: "send",
    });

    const DBres = await newMessage.save();
    if (!DBres)
      return res
        .status(500)
        .json({ message: "failed in creating messageModel" });

    const roomRes = await RoomModel.findByIdAndUpdate(
      { _id: groupId },
      { lastMessage: DBres._id }
    );

    console.log(roomRes);

    io.to(groupId).emit("receive_group_message", DBres);

    return res.status(201).json(DBres);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
