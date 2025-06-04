import express from "express";
import {
  fetchLatestChats,
  fetchChatMessages,
  sendMessages,
  sendSearchedUsers,
} from "../middlewares/message.middleware.js";
import Authorization from "../middlewares/Authorization.js";
const router = express.Router();

// this all have user info in req part

router.get("/user", Authorization, fetchLatestChats);
router.get("/:id", Authorization, fetchChatMessages);
router.get("/send/:id", Authorization, sendMessages);
router.get("/searchUsers/:input/:limit", sendSearchedUsers);

export default router;
