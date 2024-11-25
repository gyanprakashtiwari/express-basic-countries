const mongoose = require("mongoose");

// Define the Country schema
const countrySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  capital: { type: String, required: true },
  cca: { type: String }, // Country code (string)
  currency_code: { type: String }, // Currency code (string)
  currency: { type: String }, // Currency name (string)
  region: { type: String }, // Region (string)
  subregion: { type: String }, // Subregion (string)
  area: { type: BigInt }, // Area in square kilometers (bigint)
  map_url: { type: String, match: /^https?:\/\/.*$/ }, // Map URL (string, validating it is a URL)
  population: { type: BigInt }, // Population (bigint)
  flag_url: { type: String }, // Flag URL (string)
  created_at: { type: Date, default: Date.now }, // Created timestamp (datetime)
  updated_at: { type: Date, default: Date.now }, // Updated timestamp (datetime)
});

// Create a model based on the schema
const Country = mongoose.model("Country", countrySchema);

// Export the model
module.exports = Country;
