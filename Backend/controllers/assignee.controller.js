import StudentsModel from "../models/Students.model.js"

export const GetAssignee= async (req, res) => {
  try {
    const itemAssignee = await StudentsModel.find()

    res.json(itemAssignee)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}