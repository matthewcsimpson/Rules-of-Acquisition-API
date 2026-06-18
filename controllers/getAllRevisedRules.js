const knex = require("../db");

const getAllRevisedRules = async (_req, res) => {
  let rules = await knex("rules")
    .select("rules.rule_number", "rules.revised_edition")
    .whereNotNull("rules.revised_edition")
    .catch((err) => {
      console.error(err);
    });

  res.status(200).json(rules);
};

module.exports = { getAllRevisedRules };
