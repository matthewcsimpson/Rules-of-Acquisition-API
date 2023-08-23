const express = require("express");
const router = express.Router();

// Controllers
const { getAllRules } = require("../controllers/getAllRules");
const { getRuleById } = require("../controllers/getRuleById");

// Get All Rules
router.get("/", getAllRules);

// Get Specific Rule by Id
router.get("/:rule_id", getRuleById);

module.exports = router;
