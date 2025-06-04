import express from "express";
import {
  signup,
  login,
  logout,
  authCheck,
} from "../middlewares/auth.middleware.js";
import Authorization from "../middlewares/Authorization.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/authCheck", Authorization, authCheck);

export default router;
