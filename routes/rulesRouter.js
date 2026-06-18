const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../helpers/asyncHandler");

// Controllers
const { getAllRules } = require("../controllers/getAllRules");
const { getAllRevisedRules } = require("../controllers/getAllRevisedRules");
const {
  getRuleById,
  getRevisedRuleById,
} = require("../controllers/getRuleById");

// Get All Rules
router.get("/", asyncHandler(getAllRules));

// Get All Revised Rules
router.get("/revised", asyncHandler(getAllRevisedRules));

// Get Specific Rule by Id
router.get("/:rule_id", asyncHandler(getRuleById));

// Get Specific Revised Rule by Id
router.get("/:rule_id/revised", asyncHandler(getRevisedRuleById));

module.exports = router;
