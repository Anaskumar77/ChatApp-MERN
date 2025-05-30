import MessageModel from "../Models/messageModel.js";
import RoomModel from "../Models/roomModel.js";

//

export const fetchLatestChats = async (req, res) => {
  //
  // req have userInfo from authorization
  const userId = req.user._id;

  //get all the rooms , that the current user is part of

  //aggregate [ filter , lookup , sort , shape the output ]

  try {
    const response = await RoomModel.aggregate();
  } catch (err) {
    console.log(err.message);
    res.json({ message: err.message });
  }

  //get the latest messege of each room

  //sort the room by descending order

  //limit the number of shown

  //populate message and user data

  //
  //
  //getting messages from mongoDB
  //
  //
};

export const fetchChatMessages = (req, res) => {
  //
  //
  // grtting specific chat messages logic
  //
  //
};

export const sendMessages = (req, res) => {
  //
  //
  // sending logic
  //
  //
};
// export const
