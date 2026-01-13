import express from "express";
import Department from "../models/Department.js"; // ✅ MISSING IMPORT
import { protect } from "../middlewares/auth.middleware.js";
import { createDepartment } from "../controllers/department.controller.js";

const router = express.Router();

// CREATE DEPARTMENT (Minister)
router.post("/create", protect, createDepartment);

// GET ALL DEPARTMENTS
router.get("/", protect, async (req, res) => {
  try {
    const departments = await Department.find()
      .populate("createdBy", "name email");

    res.json(departments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch departments" });
  }
});

export default router;
