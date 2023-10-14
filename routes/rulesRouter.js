const express = require("express");
const router = express.Router();

// Controllers
const { getAllRules } = require("../controllers/getAllRules");
const { getAllRevisedRules } = require("../controllers/getAllRevisedRules");
const { getRuleById } = require("../controllers/getRuleById");
const { getRevisedRuleById } = require("../controllers/getRevisedRuleById");

// Get All Rules
router.get("/", getAllRules);

// Get All Revised Rules
router.get("/revised", getAllRevisedRules);

// Get Specific Rule by Id
router.get("/:rule_id", getRuleById);

// Get Specific Revised Rule by Id
router.get("/:rule_id/revised", getRevisedRuleById);

module.exports = router;
