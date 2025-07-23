// models/HealthRecord.js

import mongoose from "mongoose";

const healthRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  date: { type: Date, default: Date.now },
  vitals: {
    bloodPressure: String,
    heartRate: Number,
    temperature: Number,
    oxygenSaturation: Number,
    bloodSugar: Number,
    weight: Number,
    height: Number,
    bmi: Number
  },
  sleep: {
    duration: Number,
    quality: String
  },
  mood: String,
  activityLevel: String,


  medicalHistory: {
    surgeries: [{ name: String, date: Date, notes: String }],
    illnesses: [{ name: String, diagnosisDate: Date, status: String }],
    familyHistory: [{ relation: String, condition: String }]
  },
  immunizations: [
    {
      vaccine: String,
      date: Date,
      administeredBy: String,
      notes: String
    }
  ],
  deviceData: {
    source: { type: String, enum: ['Fitbit', 'Apple Watch', 'Samsung Health', 'Google Fit'] },
    heartRate: Number,
    steps: Number,
    sleepHours: Number,
    collectedAt: Date
  },

  


  notes: String,
  dataSource: String // "manual", "GoogleFit", "AppleHealth", etc.
});

export default mongoose.models.HealthRecord || mongoose.model("HealthRecord", healthRecordSchema);
