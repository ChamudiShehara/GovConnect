import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    citizen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Citizen",
      required: true,
    },

    // Main complaint details
    name: { type: String, required: true },
    description: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },

    // Optional third-party details
    thirdParty: {
      name: String,
      phoneNumber: String,
      address: String,
    },

    status: {
      type: String,
      enum: ["PENDING", "IN_PROGRESS", "RESOLVED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
