// models/Notification.js

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  type: { type: String, enum: ["appointment", "reminder", "alert", "system"] },
  seen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
