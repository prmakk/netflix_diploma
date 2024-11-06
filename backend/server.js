import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js";

dotenv.config({ path: ".env.local" });

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB OK"))
    .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);

app.listen(5000, () => console.log("Server is working :)"));
