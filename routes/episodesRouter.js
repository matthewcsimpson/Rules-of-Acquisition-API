const express = require("express");
const router = express.Router();

const { getAllEpisodes } = require("../controllers/getAllEpisodes");

router.get("/", getAllEpisodes);

module.exports = router;
