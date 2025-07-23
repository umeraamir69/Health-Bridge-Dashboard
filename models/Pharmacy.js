// models/Pharmacy.js

import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema({
  name: String,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  address: String,
  contactNumber: String,
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: [Number]
  },
  isVerified: { type: Boolean, default: false }
});

pharmacySchema.index({ location: "2dsphere" });

export default mongoose.models.Pharmacy || mongoose.model("Pharmacy", pharmacySchema);
