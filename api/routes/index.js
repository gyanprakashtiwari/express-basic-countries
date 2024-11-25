const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: "Project setup is complete!" });
});

module.exports = router;
