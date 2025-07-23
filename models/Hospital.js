// models/Hospital.js

import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  country: String,
  contactNumber: String,
  website: String,
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: [Number]
  }
});

hospitalSchema.index({ location: "2dsphere" });

export default mongoose.models.Hospital || mongoose.model("Hospital", hospitalSchema);
