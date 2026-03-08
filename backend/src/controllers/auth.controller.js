import User from "../models/User.js";
import Citizen from "../models/Citizen.js";
import Agent from "../models/Agent.js"; // Assuming you also have an Agent model
import Minister from "../models/Minister.js"; // Assuming you have a Minister model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

// JWT token-based authentication

/* =========================
   REGISTER (WITH ROLE)
========================= */
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the role is valid
    const allowedRoles = ["CITIZEN", "AGENT", "MINISTER"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if the user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create User in the User model
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // ✅ Create the profile based on the user's role
    if (role === "CITIZEN") {
      await Citizen.create({
        user: user._id,
        complaints: [],
        votes: [],
      });
    } else if (role === "AGENT") {
      await Agent.create({
        user: user._id,
        assignedComplaints: [],
      });
    } else if (role === "MINISTER") {
      await Minister.create({
        user: user._id,
        managedDepartments: [],
      });
    }

    // Send response with the generated JWT and user info
    res.status(201).json({
      token: generateToken(user),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ message: "Registration failed" });
  }
};

/* =========================
   LOGIN
========================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Fetch the user's profile based on their role
    let userProfile;
    if (user.role === "CITIZEN") {
      userProfile = await Citizen.findOne({ user: user._id });
    } else if (user.role === "AGENT") {
      userProfile = await Agent.findOne({ user: user._id });
    } else if (user.role === "MINISTER") {
      userProfile = await Minister.findOne({ user: user._id });
    }

    // Send response with the generated JWT, user info, and profile data
    res.json({
      token: generateToken(user),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: userProfile, // Include the profile data
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Login failed" });
  }
};