import Complaint from "../models/Complaint.js";
import Citizen from "../models/Citizen.js";

/* =========================
   CREATE COMPLAINT
========================= */
export const createComplaint = async (req, res) => {
  try {
    const {
      name,
      description,
      phone,
      address,
      thirdParty,
    } = req.body;

    // find citizen profile
    const citizen = await Citizen.findOne({ user: req.user.id });
    if (!citizen) {
      return res.status(404).json({ message: "Citizen profile not found" });
    }

    const complaint = await Complaint.create({
      citizen: citizen._id,
      name,
      description,
      phone,
      address,
      thirdParty: thirdParty || null,
    });

    citizen.complaints.push(complaint._id);
    await citizen.save();

    res.status(201).json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create complaint" });
  }
};
