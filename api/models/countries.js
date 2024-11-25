const mongoose = require("mongoose");

// Define the Country schema
const countrySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  capital: { type: String, required: true },
});

// Create a model based on the schema
const Country = mongoose.model("Country", countrySchema);

// Export the model
module.exports = Country;
