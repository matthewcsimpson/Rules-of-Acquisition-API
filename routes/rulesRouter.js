const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

const { getAllRules } = require("../controllers/getAllRules");

// Get All Rules
router.get("/", getAllRules);

module.exports = router;
