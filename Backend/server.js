import express from "express";
import cors from "cors";
import dotenv from "dotenv";
 

import authRoutes from "./routes/auth.routes.js";
import leadRoutes from "./routes/leadroutes.js";
import connectDB from "./db.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);






app.listen(3000, () => console.log("Server running on http://localhost:3000"));
