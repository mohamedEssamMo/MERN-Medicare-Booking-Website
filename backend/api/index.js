import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import serverless from "serverless-http";

import authRoute from "../Routes/auth.js";
import userRoute from "../Routes/user.js";
import doctorRoute from "../Routes/doctor.js";
import reviewRoute from "../Routes/review.js";
import bookingRoute from "../Routes/booking.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true }));

// Routes
app.get("/", (req, res) => {
  res.send("API is running....");
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);

// MongoDB connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
connectDB();

// Export as serverless function
export const handler = serverless(app);

export default app;
