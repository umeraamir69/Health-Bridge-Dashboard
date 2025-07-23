import mongoose from "mongoose";

const InsuranceClaimSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  insuranceProvider: String,
  policyNumber: String,
  serviceType: String,
  claimAmount: Number,
  status: { type: String, enum: ['submitted', 'processing', 'approved', 'rejected'], default: 'submitted' },
  submittedAt: { type: Date, default: Date.now },
  decisionAt: Date,
  notes: String,
});

export default mongoose.models.InsuranceClaim || mongoose.model("InsuranceClaim", InsuranceClaimSchema);
