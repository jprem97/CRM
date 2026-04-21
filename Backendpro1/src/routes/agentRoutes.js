import express from "express";
import {
  getMyNotifications,
  getMyProfile,
  markNotificationRead
} from "../controllers/agentController.js";
import { protect } from "../middlewares/authmiddleware.js";

const router = express.Router();

// PROFILE
router.get("/get-my-profile", protect, getMyProfile);

// NOTIFICATIONS
router.get("/get-notifications", protect, getMyNotifications);
router.patch("/mark-notification-read/:id", protect, markNotificationRead);

export default router;