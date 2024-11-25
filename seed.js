const mongoose = require("mongoose");
const Country = require("./api/models/countries");
require("dotenv").config();

const mongoURI = process.env.MONGO_DB_URI; // Get the MongoDB URI from environment variables

if (!mongoURI) {
  console.error("MongoDB URI is not defined in environment variables.");
  process.exit(1); // Exit the process if no URI is defined
}

// Dummy data for countries
const countries = [
  { id: 1, name: "United States", capital: "Washington, D.C." },
  { id: 2, name: "Canada", capital: "Ottawa" },
  { id: 3, name: "United Kingdom", capital: "London" },
  { id: 4, name: "Australia", capital: "Canberra" },
  { id: 5, name: "India", capital: "New Delhi" },
];

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
