// models/AiSession.js

import mongoose from "mongoose";

const aiSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  input: String,
  response: String,
  modelUsed: String, // e.g., "gpt-4", "togetherAI"
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.AiSession || mongoose.model("AiSession", aiSessionSchema);
