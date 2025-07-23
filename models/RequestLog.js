// models/RequestLog.js

import mongoose from "mongoose";

const RequestLogSchema = new mongoose.Schema({
  method: String,
  endpoint: String,
  statusCode: Number,
  status: {
    type: String,
    enum: ["success", "error"],
    required: true,
  },
  message: String,
  errorStack: String,
  ip: String,
  deviceType: String, // mobile/web
  userAgent: String, // e.g., "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)..."
  platform: String, // e.g., "macOS", "Windows", "Android"
  appSource: {
    type: String,
    enum: ["dashboard", "mobile"],
    default: "dashboard",
  },
  appVersion: String,
  environment: {
    type: String,
    enum: ["development", "staging", "production"],
    default: process.env.NODE_ENV || "development",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  headers: Object,
  queryParams: Object,
  body: Object,
  referrer: String,
  responseTimeMs: Number,
  geoLocation: {
    country: String,
    city: String,
    region: String,
    isp: String,
  },
  tags: [String],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.RequestLog || mongoose.model("RequestLog", RequestLogSchema);
