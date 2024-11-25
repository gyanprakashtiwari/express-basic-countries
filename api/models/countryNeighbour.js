const mongoose = require("mongoose");

// Define the CountryNeighbour schema
const countryNeighbourSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  country_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
    required: true,
  },
  neighbour_country_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Create a model based on the schema
const CountryNeighbour = mongoose.model(
  "CountryNeighbour",
  countryNeighbourSchema
);

module.exports = CountryNeighbour;
