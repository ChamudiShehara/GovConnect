import Department from "../models/Department.js";

export const createDepartment = async (req, res) => {
  try {
    if (req.user.role !== "MINISTER") {
      return res
        .status(403)
        .json({ message: "Only ministers can create departments" });
    }

    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Department name is required" });
    }

    const exists = await Department.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Department already exists" });
    }

    const department = await Department.create({
      name,
      createdBy: req.user.id,
    });

    res.status(201).json(department);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create department" });
  }
};
