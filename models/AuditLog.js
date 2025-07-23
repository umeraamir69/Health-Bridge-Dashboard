import mongoose from "mongoose";

const AuditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String, // e.g., "UPDATE_PROFILE"
  changedData: mongoose.Schema.Types.Mixed,
  ip: String,
  userAgent: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.AuditLog || mongoose.model("AuditLog", AuditLogSchema);
