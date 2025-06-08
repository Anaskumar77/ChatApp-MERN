import express from "express";
import {
  fetchLatestChats,
  fetchChatMessages,
  sendMessages,
  searchUsers,
} from "../middlewares/message.middleware.js";
import Authorization from "../middlewares/Authorization.js";
const router = express.Router();

router.get("/search", Authorization, searchUsers);
// this all have user info in req part
router.get("/user", Authorization, fetchLatestChats);
router.get("/:id", Authorization, fetchChatMessages);
router.get("/send/:id", Authorization, sendMessages);
export default router;
