const express = require("express");
const router = express.Router();
const Country = require("../models/countries");

// GET /countries - Get the list of countries with pagination
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default page = 1, limit = 10

    // Convert query parameters to integers
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    // Calculate the starting index for pagination
    const startIndex = (pageNum - 1) * limitNum;

    // Fetch data with pagination and total count
    const countries = await Country.find()
      .skip(startIndex) // Skip to the starting index
      .limit(limitNum); // Limit the number of records fetched

    const totalCountries = await Country.countDocuments(); // Get the total count

    res.status(200).json({
      message: "Countries retrieved successfully",
      data: {
        total: totalCountries,
        page: pageNum,
        limit: limitNum,
        countries,
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

module.exports = router;
