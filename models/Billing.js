import mongoose from "mongoose";

const BillingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: Number,
  service: String, // e.g., "Lab Test", "Doctor Appointment"
  invoiceUrl: String,
  status: { type: String, enum: ['paid', 'pending', 'failed'], default: 'pending' },
  paymentMethod: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Billing || mongoose.model("Billing", BillingSchema);
