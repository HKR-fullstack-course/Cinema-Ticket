const express = require("express");
const router = express.Router();
const faker = require("@faker-js/faker").default;

router.get("/name", async (req, res) => {
  res
    .header("Access-Control-Allow-Origin", "*") // CORS-origin
    .json(faker.name.firstName());
});

module.exports = router;
