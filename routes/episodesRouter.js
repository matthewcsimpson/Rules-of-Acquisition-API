const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../helpers/asyncHandler");
const { getAllEpisodes } = require("../controllers/getAllEpisodes");
const { getEpisodeById } = require("../controllers/getEpisodeById");

router.get("/", asyncHandler(getAllEpisodes));
router.get("/:episode_id", asyncHandler(getEpisodeById));

module.exports = router;
