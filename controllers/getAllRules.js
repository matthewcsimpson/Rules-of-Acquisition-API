const knex = require("knex")(require("../knexfile"));

/**
 * Function to return all of the rules of acquisition.
 * Response includes rule number and text.
 * @param {*} _req
 * @param {*} res
 */
const getAllRules = async (req, res) => {
  let rules = await knex("rules")
    .select(
      "rules.rule_number",
      "rules.rule_text",
      "episodes.series_id"
    )
    .join("rule_appearance", "rule_appearance.rule_number", "rules.rule_number")
    .join("episodes", "episodes.episode_id", "rule_appearance.episode_id")
    .orderBy("rules.rule_number")
    .catch((err) => {
      console.error(err);
      res.json(err);
    });

  res.send(rules);
};

module.exports = { getAllRules };
