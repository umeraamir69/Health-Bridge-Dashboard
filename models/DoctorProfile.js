// models/DoctorProfile.js

import mongoose from "mongoose";

const doctorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specialization: [String],
  experienceYears: Number,
  education: String,
  languagesSpoken: [String],
  availability: [
    {
      day: String,
      timeSlots: [String] // e.g., ["10:00", "12:00"]
    }
  ],
  clinicAddress: String,
  hospitalAffiliation: String,
  rating: Number
});

export default mongoose.models.DoctorProfile || mongoose.model("DoctorProfile", doctorProfileSchema);
