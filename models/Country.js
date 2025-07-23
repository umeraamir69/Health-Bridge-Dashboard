// models/Country.js

import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: String,
  isoCode: String,
  languages: [String],
  currency: String,
  timezone: String,
  dateFormat: String
});

export default mongoose.models.Country || mongoose.model("Country", countrySchema);
