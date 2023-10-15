const knex = require("knex")(require("../knexfile"));

const getRevisedRuleById = async (req, res) => {
  // List all the rule numbers for error checking
  const ruleNums = await knex("rules")
    .select("rule_number")
    .whereNotNull("revised_edition")
    .catch((err) => {
      console.error("Error: ", err);
    });

  let checkRule = ruleNums.find(
    (rule) => rule.rule_number === Number(req.params.rule_id)
  );

  const ruleDetails = await knex("rules")
    .where("rules.rule_number", req.params.rule_id)
    .select("rules.rule_number", "rules.revised_edition", "rules.revised_note")
    .catch((err) => {
      res.error(err);
      console.error("ERROR:", err);
    });

  const episodeDetails = await knex("rules")
    .where("rules.rule_number", req.params.rule_id)
    .select(
      "series.series_id",
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
    .where("rule_appearance.revised_edition", true)
    .orderBy("episodes.episode_date", "asc")
    .catch((err) => {
      res.error(err);
      console.error("ERROR:", err);
    })
    .finally(() => {
      knex.destroy();
    });

  if (!checkRule) {
    res.status(404).json({ error: `There is no revised rule by that number` });
  } else {
    res.status(200).json({ ruleDetails: ruleDetails[0], episodeDetails });
  }
};

module.exports = { getRevisedRuleById };
