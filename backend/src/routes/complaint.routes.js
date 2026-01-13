import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createComplaint } from "../controllers/complaint.controller.js";

const router = express.Router();

// Citizen creates complaint
router.post("/create", protect, createComplaint);

export default router;
