const express = require("express");
const router = express.Router();

const { getAllEpisodes } = require("../controllers/getAllEpisodes");
const { getEpisodeById } = require("../controllers/getEpisodeById");

router.get("/", getAllEpisodes);
router.get("/:episode_id", getEpisodeById);

module.exports = router;
