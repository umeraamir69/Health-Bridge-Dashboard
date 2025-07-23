// models/LabTest.js

import mongoose from "mongoose";

const labTestSchema = new mongoose.Schema({
  name: String,
  description: String,
  availableAt: [
    {
      labId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      price: Number,
      instructions: String
    }
  ]
});

export default mongoose.models.LabTest || mongoose.model("LabTest", labTestSchema);
