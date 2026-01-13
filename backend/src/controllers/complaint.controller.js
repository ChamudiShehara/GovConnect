import Citizen from "../models/Citizen.js";
import Complaint from "../models/Complaint.js";

export const createComplaint = async (req, res) => {
  try {
    let citizen = await Citizen.findOne({ user: req.user._id });

    if (!citizen) {
      citizen = await Citizen.create({
        user: req.user._id,
        complaints: [],
        votes: [],
      });
    }

    const complaint = await Complaint.create({
      citizen: citizen._id,
      name: req.body.name,
      description: req.body.description,
      phoneNumber: req.body.phoneNumber, // ✅ FIXED
      address: req.body.address,

      thirdParty: {
        name: req.body.thirdPartyName,
        phoneNumber: req.body.thirdPartyPhoneNumber,
        address: req.body.thirdPartyAddress,
      },
    });

    citizen.complaints.push(complaint._id);
    await citizen.save();

    res.status(201).json({ message: "Complaint created", complaint });
  } catch (err) {
    console.error("Create complaint error:", err);
    res.status(500).json({ message: "Failed to create complaint" });
  }
};

