import express from "express";
const router = express.Router();
import { fetchLatestChats } from "../middlewares/message.middleware.js";
router.get("/searchUsers", fetchLatestChats);

export default router;
