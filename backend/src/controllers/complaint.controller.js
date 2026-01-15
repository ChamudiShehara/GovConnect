import Citizen from "../models/Citizen.js";
import Complaint from "../models/Complaint.js";
import Department from "../models/Department.js";
import { classifyComplaint } from "../rag/classifier.js";

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

    // ✅ 1. Fetch departments
    const departments = await Department.find();

    // ✅ 2. AI classify
    const matchedDepartmentName = await classifyComplaint(
      req.body.description,
      departments
    );

    // ✅ 3. Find department object
    const matchedDepartment = departments.find(
      d => d.name.toLowerCase() === matchedDepartmentName
    );

    console.log("AI matched:", matchedDepartmentName);

    // ✅ 4. Create complaint
    const complaint = await Complaint.create({
      citizen: citizen._id,
      name: req.body.name,
      description: req.body.description,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      department: matchedDepartment ? matchedDepartment._id : null,
      thirdParty: {
        name: req.body.thirdPartyName,
        phoneNumber: req.body.thirdPartyPhoneNumber,
        address: req.body.thirdPartyAddress,
      },
    });

    citizen.complaints.push(complaint._id);
    await citizen.save();

    res.status(201).json({
      message: "Complaint created",
      assignedDepartment: matchedDepartment?.name || "Not matched",
      complaint,
    });

  } catch (err) {
    console.error("Create complaint error:", err);
    res.status(500).json({ message: "Failed to create complaint" });
  }
};
