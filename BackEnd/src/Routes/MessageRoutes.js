import express from "express";
import fetchLatestMessages
const router = express.Router();

router.post("/home/:userId", fetchLatestMessages);

export default router;
