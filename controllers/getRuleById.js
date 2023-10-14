const knex = require("knex")(require("../knexfile"));

const getRuleById = async (req, res) => {
  const ruleDetails = await knex("rules")
    .where("rules.rule_number", req.params.rule_id)
    .select(
      "rules.rule_number",
      "rules.rule_text",
      "rules.rule_variation",
      "rules.rule_note",
      "rules.revised_edition"
    )
    .catch((err) => {
      res.error(err);
      console.error("ERROR:", err);
    });

  const episodeDetails = await knex("rules")
    .where("rules.rule_number", req.params.rule_id)
    .select(
      "series.series_name",
      "episodes.episode_season",
      "episodes.episode_number",
      "episodes.episode_title",
      "episodes.episode_synopsis",
      "episodes.episode_date"
    )
    .join("rule_appearance", "rule_appearance.rule_number", "rules.rule_number")
    .join("episodes", "episodes.episode_id", "rule_appearance.episode_id")
    .join("series", "series.series_id", "episodes.series_id")
    .orderBy("episodes.episode_date", "asc")
    .catch((err) => {
      res.error(err);
      console.error("ERROR:", err);
    });

    console.log(ruleDetails)

  if (!ruleDetails.ruleNumber) {
    res.status(404).json({ error: `There is no rule by that number` });
  } else {
    res.status(200).json({ ruleDetails: ruleDetails[0], episodeDetails });
  }
};

module.exports = { getRuleById };
