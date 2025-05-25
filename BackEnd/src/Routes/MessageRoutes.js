import express from "express";
const router = express.Router();

router.post("/message", (req, res) => {
  res.send("message Router");
});

export default router;
