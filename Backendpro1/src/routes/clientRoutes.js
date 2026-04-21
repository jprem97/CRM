import express from "express";
import {
  createClient,
  getClients,
  getClientById,
  updateClientStatus
} from "../controllers/clientController.js";
import { protect } from "../middlewares/authmiddleware.js";

const router = express.Router();

// POST - Create client (public endpoint - no auth required for new client registration)
router.post("/create-client", createClient);

// READ
router.get("/get-clients", protect, getClients);
router.get("/get-client/:id", protect, getClientById);

// UPDATE
router.patch("/update-client-status/:id", protect, updateClientStatus);

export default router;
