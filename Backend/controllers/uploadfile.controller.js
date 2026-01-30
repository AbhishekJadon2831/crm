import XLSX  from "xlsx";
import LeadModel from "../models/Lead.model.js";
import StudentsModel from "../models/Students.model.js";
export const Uploadfile=  async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    const buffer = req.file.buffer;
    const mimeType = req.file.mimetype;

    if (
      mimeType !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      mimeType !== "application/vnd.ms-excel"
    ) {
      return res.status(400).json({ message: "Only Excel files allowed" });
    }

    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const users = await StudentsModel.find({ role: "user" });

    let insertedLeads = [];
    let i = 0;

    for (const row of rows) {
      if (!row.fullname || !row.email) continue;

      const exists = await LeadModel.findOne({ email: row.email });
      if (exists) continue;

      const assignedUser = users[i % users.length];

      const saved = await LeadModel.create({
        fullname: row.fullname,
        email: row.email,
        number: row.phone ? String(row.phone) : "",
        assignee: assignedUser?.name || null,
        status: "NEW",
      });

      insertedLeads.push(saved);
      i++;
    }

    return res.json({
      success: true,
      count: insertedLeads.length,
      leads: insertedLeads,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Upload failed" });
  }
};
