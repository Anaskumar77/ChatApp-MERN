import express from "express";
import {
  fetchLatestChats,
  fetchChatMessages,
  sendMessages,
} from "../middlewares/message.middleware.js";
const router = express.Router();

// this all have user info in req part

router.post("/user", fetchLatestChats);
router.post("/:id", fetchChatMessages);
router.post("/send/:id", sendMessages);

export default router;
