import LeadModel from "../models/Lead.model.js";

export const GetPipeline= async (req, res) => {
  const leads = await LeadModel.find().sort({ createdAt: -1 });
  res.json(leads);
};


export const UpdatePipeline= async (req, res) => {
  try {
    const { status } = req.body;

    const lead = await LeadModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: "Stage update failed" });
  }
};