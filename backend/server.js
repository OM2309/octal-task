import express from "express";
import connectDB from "./db/db.js";
import authRoutes from "./routes/auth-routes.js";
import cors from "cors";
import dotenv from "dotenv";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
