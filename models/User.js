// models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["patient", "doctor", "labAdmin", "pharmacyAdmin", "admin"],
    default: "patient"
  },
  fullName: String,
  email: { type: String, required: true, unique: true },
  passwordHash: String,
  phone: String,
  gender: { type: String, enum: ["male", "female", "other"] },
  dateOfBirth: Date,
  address: String,
  country: String,
  city: String,
  language: { type: String, default: "en" },
  profilePicture: String,
  insuranceNumber: String,
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: [Number] // [longitude, latitude]
  },

  healthGoals: [String],
  chronicConditions: [String],
  allergies: [String],
  medications: [String],

  emergencyContacts: [
    {
      name: { type: String, required: true },
      relation: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String },
      address: { type: String },
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

userSchema.index({ location: "2dsphere" });

export default mongoose.models.User || mongoose.model("User", userSchema);
