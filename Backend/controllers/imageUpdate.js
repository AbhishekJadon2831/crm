import StudentsModel from "../models/Students.model.js";

export const Updateimage=async (req, res) => {
  try {
    const { image } = req.body;
    console.log(image);

    if (req.file) {
      updateData.profilePic = req.file.path;
    }


    if (!image) {
      return res.status(400).json({ message: "Image not found" });
    }


    const updatedUser = await StudentsModel.findByIdAndUpdate(
      req.userId,
      { profileImage: image },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }


    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Image update failed" });
  }
};