const knex = require("knex")(require("../knexfile"));

const getRuleById = async (req, res) => {
  let ruleDetails = await knex("rules")
  .where("rules.rule_number", req.params.rule_id)
    .select(
      "rules.rule_number",
      "rules.rule_text",
      "series.series_name",
      "episodes.episode_season",
      "episodes.episode_number",
      "episodes.episode_title",
      "episodes.episode_date"
    )
    .join("rule_appearance", "rule_appearance.rule_number", "rules.rule_number")
    .join("episodes", "episodes.episode_id", "rule_appearance.episode_id")
    .join("series", "series.series_id", "episodes.series_id")
    .orderBy("episodes.episode_date", "asc");

  res.json(ruleDetails);
};

module.exports = { getRuleById };
