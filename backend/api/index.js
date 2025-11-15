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

// MongoDB Connection for Vercel
mongoose.set("strictQuery", false);
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true }));

// Always connect to DB per request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);

// Export serverless function
export const handler = serverless(app);
export default app;
