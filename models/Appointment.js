// models/Appointment.js

import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },

  date: Date,
  time: String,
  mode: { type: String, enum: ["in-person", "video", "chat"] },
  status: { type: String, enum: ["pending", "confirmed", "cancelled", "completed"], default: "pending" },
  reason: String,


  videoCall: {
    link: String,
    status: { type: String, enum: ['pending', 'in-progress', 'completed', 'cancelled'], default: 'pending' },
    recordingUrl: String
  },
  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comments: String,
    createdAt: { type: Date, default: Date.now }
  },
  



  prescription: String
});

export default mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);
