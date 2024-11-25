const express = require("express");
const router = express.Router();
const Country = require("../models/countries");

// Helper function to handle BigInt conversion to strings
const convertBigIntFields = (country) => {
  return {
    ...country.toObject(),
    area: country.area.toString(), // Convert BigInt to string
    population: country.population.toString(), // Convert BigInt to string
  };
};

// GET /countries - Get the list of countries with pagination and sorting
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = "a_to_z" } = req.query; // Default page = 1, limit = 10, sort = "a_to_z"

    // Convert query parameters to integers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // Calculate the starting index for pagination
    const startIndex = (pageNum - 1) * limitNum;

    // Determine the sort order
    let sortOrder = {};
    if (sort === "z_to_a") {
      sortOrder.name = -1; // Sort in descending order (Z to A)
    } else {
      sortOrder.name = 1; // Sort in ascending order (A to Z)
    }

    // Fetch data with pagination, sorting, and total count
    const countries = await Country.find()
      .skip(startIndex) // Skip to the starting index
      .limit(limitNum) // Limit the number of records fetched
      .sort(sortOrder); // Sort countries based on the name field

    const totalCountries = await Country.countDocuments(); // Get the total count

    res.status(200).json({
      message: "Countries retrieved successfully",
      data: {
        total: totalCountries,
        page: pageNum,
        limit: limitNum,
        countries: countries.map(convertBigIntFields), // Convert BigInt fields for each country
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to retrieve countries",
      data: {},
    });
  }
});

// GET /countries/:id - Get details of a single country by country_id
router.get("/:id", async (req, res) => {
  try {
    const countryId = req.params.id; // Extract country_id from the URL parameter

    // Fetch country details by ID
    const country = await Country.findById(countryId);

    if (!country) {
      return res.status(404).json({
        message: "Country not found",
        data: {},
      });
    }

    res.status(200).json({
      message: "Country details retrieved successfully",
      data: convertBigIntFields(country), // Convert BigInt fields for this country
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to retrieve country details",
      data: {},
    });
  }
});

module.exports = router;
