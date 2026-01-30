import express from "express";
import { Leadcreate, GetLead, LeadUpdate } from "../controllers/lead.controller.js";
import { Uploadfile } from "../controllers/uploadfile.controller.js";
import upload from "../controllers/upload.js";
import { GetPipeline, UpdatePipeline } from "../controllers/pipeline.controller.js";
import { GetAssignee } from "../controllers/assignee.controller.js";

const router = express.Router();

router.post("/lead", Leadcreate);
router.get("/item3", GetLead);
router.put("/lead/:id", LeadUpdate);
router.post("/upload-excel", upload.single("file"), Uploadfile);
router.get("/pipeline", GetPipeline);
router.patch("/pipeline/:id", UpdatePipeline);
router.get("/api/assignee/item", GetAssignee);


export default router;
