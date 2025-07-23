// models/Medicine.js

import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  ingredients: [String],
  uses: String,
  sideEffects: String,
  price: Number,
  availableAt: [
    {
      pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: "Pharmacy" },
      stock: Number,
      price: Number
    }
  ]
});

export default mongoose.models.Medicine || mongoose.model("Medicine", medicineSchema);
