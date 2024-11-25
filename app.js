require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const indexRoutes = require("./api/routes/index");
const countryRoutes = require("./api/routes/countries");
const neighboursRoutes = require("./api/routes/neighbours");

// MongoDB connection
const mongoURI = process.env.MONGO_DB_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if the connection fails
  });

// Middleware
app.use(express.json()); // For JSON parsing

// Routes
app.use("/", indexRoutes);
app.use("/countries", countryRoutes);
app.use("/", neighboursRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

module.exports = app;
