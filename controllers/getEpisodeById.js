const knex = require("../db");
const { exists } = require("../helpers/exists");

const getEpisodeById = async (req, res) => {
  const checkEpisode = await exists("episodes", (qb) =>
    qb.where("episode_id", req.params.episode_id)
  );

  if (!checkEpisode) {
    return res
      .status(404)
      .json({ error: `There is no episode with that ID` });
  }

  const episodeInfo = await knex
    .select(
      "episodes.episode_id",
      "episodes.episode_title",
      "series.series_name",
      "episodes.episode_season",
      "episodes.episode_number",
      "episodes.episode_date",
      "episodes.episode_synopsis"
    )
    .from("episodes")
    .join("series", "episodes.series_id", "series.series_id")
    .where("episodes.episode_id", req.params.episode_id);

  const episodeRules = await knex
    .select("rules.rule_number", "rules.rule_text")
    .from("rules")
    .join("rule_appearance", "rule_appearance.rule_number", "rules.rule_number")
    .where("rule_appearance.episode_id", req.params.episode_id)
    .where("rule_appearance.revised_edition", false)
    .orderBy("rules.rule_number", "asc");

  res
    .status(200)
    .json({ episodeInfo: episodeInfo[0], episodeRules: episodeRules });
};

module.exports = { getEpisodeById };
