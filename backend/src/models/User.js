import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    googleId: String,
    role: {
      type: String,
      enum: ["CITIZEN", "AGENT", "MINISTER"],
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
