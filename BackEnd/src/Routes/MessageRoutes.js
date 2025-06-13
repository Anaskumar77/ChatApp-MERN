import express from "express";
import {
  fetchLatestChats,
  fetchChatMessages,
  sendMessages,
  searchUsers,
  createGroup,
  createPrivate,
  // fetchOnlineChats,
} from "../middlewares/message.middleware.js";
import Authorization from "../middlewares/Authorization.js";
const router = express.Router();
// this all have user info in req part

router.get("/search", Authorization, searchUsers);
router.get("/user/all", Authorization, fetchLatestChats);
// router.get("/user/online", Authorization, fetchOnlineChats);
router.get("/chats/:id", Authorization, fetchChatMessages);
router.post("/send", Authorization, sendMessages);
router.post("/create/group", Authorization, createGroup);
router.post("/create/private", Authorization, createPrivate);
export default router;
