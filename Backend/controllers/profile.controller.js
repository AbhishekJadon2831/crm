import StudentsModel from "../models/Students.model.js";

export const Profile= async (req, res) => {
  try {
    const user = await StudentsModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        lastname: user.lastname,
        workEmail: user.workEmail,
        image1: user.profileImage,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile fetch failed" });
  }
};