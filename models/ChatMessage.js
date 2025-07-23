import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  attachments: [String], // could be URLs or file references
  sentAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

export default mongoose.models.ChatMessage || mongoose.model("ChatMessage", ChatMessageSchema);
