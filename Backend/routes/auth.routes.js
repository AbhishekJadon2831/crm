import express from "express";


import { Updateimage } from "../controllers/imageUpdate.js";
import upload from "../controllers/upload.js";
import authenticateJWT from "../middleware/authenticateJWT.js";
import { login, register, ResetPass } from "../controllers/auth.controller.js";
import { Profile } from "../controllers/profile.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/resetpass", ResetPass);
router.get("/profile", authenticateJWT, Profile);
router.put("/update-image", authenticateJWT, upload.single("profilePic"),Updateimage);
 

export default router;
