// models/Subscription.js

import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  plan: { type: String, enum: ["free", "basic", "premium", "enterprise"] },
  price: Number,
  isActive: Boolean,
  startDate: Date,
  endDate: Date,
  stripeCustomerId: String,
  stripeSubscriptionId: String
});

export default mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);
