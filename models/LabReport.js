// models/LabReport.js

import mongoose from "mongoose";

const labReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  labAdminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  
  testName: String,
  reportDate: Date,
  resultSummary: String,
  reportFileUrl: String, // link to uploaded PDF or image
  extractedData: mongoose.Schema.Types.Mixed // for OCR structured output

}, { timestamps: true });

export default mongoose.models.LabReport || mongoose.model("LabReport", labReportSchema);
