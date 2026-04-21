import express from "express";
import {
  createProperty,
  getProperties,
  searchProperties
} from "../controllers/propertyController.js";
import { protect } from "../middlewares/authmiddleware.js";

const router = express.Router();

// FIX: POST /create-property was missing `protect` — was an unauthenticated public endpoint
router.post("/create-property", protect, createProperty);

// READ — protect added so agent context is available
router.get("/get-properties", protect, getProperties);

// SEARCH — public, no auth needed
router.get("/search-properties", searchProperties);

export default router;
