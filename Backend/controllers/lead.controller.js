import LeadModel from "../models/Lead.model.js";




export const Leadcreate=  async (req, res) => {
  try {
    const { fullname, email, number, assignee, } = req.body;
    console.log(fullname, email, number, assignee);




    const newLead = await LeadModel.create({
      fullname, email, number, assignee


    });

    return res.status(200).json({ success: true, message: "Lead added" });

  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    res.status(500).json({ success: false });
  }
};




 export const LeadUpdate=async (req, res) => {
  const { id } = req.params;


  const { fullname, email, number, assignee, } = req.body;
  console.log(fullname, email, number, assignee,);


  try {
    const updatedLead = await LeadModel.findByIdAndUpdate(
      id,
      { fullname, email, number, assignee, },
      { new: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





export const GetLead= async (req, res) => {
  try {
    const { status, lastActivity, salesperson, company } = req.query;
    let query = {};
    if (status && status !== "all") {
      query.status = { $in: status.split(",") };
    }
    if (lastActivity && lastActivity !== "Any Time") {
      const now = new Date();
      const days = lastActivity === "Last 7 Days" ? 7 : 30;
      query.lastActivity = { $gte: new Date(now - days * 24 * 60 * 60 * 1000) };
    }
    if (salesperson) {
      query.assignedSalesperson = salesperson;
    }
    if (company) {
      query.company = { $regex: company, $options: "i" };
    }
    const leads = await LeadModel.find(query);
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





