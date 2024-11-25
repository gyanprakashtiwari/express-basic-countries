const mongoose = require("mongoose");
const Country = require("./api/models/countries");
const fs = require("fs");
require("dotenv").config();

const mongoURI = process.env.MONGO_DB_URI; // Get the MongoDB URI from environment variables

if (!mongoURI) {
  console.error("MongoDB URI is not defined in environment variables.");
  process.exit(1); // Exit the process if no URI is defined
}

// Read the countries data from the JSON file
const countries = JSON.parse(
  fs.readFileSync("seed_data/countries.json", "utf-8")
);

// Seed function
const seedData = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing data
    await Country.deleteMany({});
    console.log("Existing countries data cleared.");

    // Insert new data
    await Country.insertMany(countries);
    console.log("Dummy countries data inserted.");

    // Disconnect from the database
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error seeding data:", err.message);
    process.exit(1);
  }
};

// Run the seed function
seedData();
