import express from "express";
import {
  register,
  login,
  refreshToken,
  logout
} from "../controllers/userController.js";

const router = express.Router();

// AUTH
router.post("/register", register);
router.get("/login", login);
router.get ("/refresh", refreshToken);
router.get("/logout", logout);

export default router;