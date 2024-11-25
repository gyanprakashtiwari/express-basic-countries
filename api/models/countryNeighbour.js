const mongoose = require("mongoose");

// Define the CountryNeighbour schema
const countryNeighbourSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// You can also use a pre-save hook to manually update 'updated_at' if needed:
countryNeighbourSchema.pre("save", function (next) {
  if (this.isModified()) {
    this.updated_at = Date.now();
  }
  next();
});

// Create a model based on the schema
const CountryNeighbour = mongoose.model(
  "CountryNeighbour",
  countryNeighbourSchema
);

module.exports = CountryNeighbour;
