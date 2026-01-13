import mongoose from "mongoose";

const thirdPartySchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
});

const complaintSchema = new mongoose.Schema(
  {
    citizen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Citizen",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    thirdParty: {
      type: thirdPartySchema,
      default: null,
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
