const express = require("express");
const router = express.Router();
const CountryNeighbour = require("../models/countryNeighbour");
const Country = require("../models/countries");

// GET /countries/:country_id/neighbours - Get all neighbours of a specific country
router.get("/countries/:country_id/neighbours", async (req, res) => {
  const { country_id } = req.params;

  try {
    // Verify that the country exists
    const country = await Country.findById(country_id);
    if (!country) {
      return res.status(404).json({
        message: "Country not found",
        data: {},
      });
    }

    // Fetch all neighbours for the given country
    const neighbours = await CountryNeighbour.find({ country_id })
      .populate("country_id", "name")
      .populate("neighbour_country_id", "name");

    res.status(200).json({
      message: "Neighbours retrieved successfully",
      data: { neighbours },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to retrieve neighbours",
      data: {},
    });
  }
});

// POST /countries/:country_id/neighbours - Add a neighbour relationship for a specific country
router.post("/countries/:country_id/neighbours", async (req, res) => {
  const { country_id } = req.params;
  const { neighbour_country_id } = req.body;

  // Validate input
  if (!neighbour_country_id) {
    return res.status(400).json({
      message: "Missing required field: neighbour_country_id",
      data: {},
    });
  }

  try {
    // Check if both the country and its neighbour exist
    const country = await Country.findById(country_id);
    const neighbourCountry = await Country.findById(neighbour_country_id);

    if (!country || !neighbourCountry) {
      return res.status(404).json({
        message: "One or both countries do not exist",
        data: {},
      });
    }

    // Generate a unique numeric ID for the relationship
    const lastNeighbour = await CountryNeighbour.findOne().sort({ id: -1 });
    const newId = lastNeighbour ? lastNeighbour.id + 1 : 1;

    // Create a new CountryNeighbour relationship
    const newNeighbour = new CountryNeighbour({
      id: newId,
      country_id,
      neighbour_country_id,
    });

    await newNeighbour.save();

    res.status(201).json({
      message: "Neighbour relationship added successfully",
      data: { neighbour: newNeighbour },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to add neighbour relationship",
      data: {},
    });
  }
});

module.exports = router;
