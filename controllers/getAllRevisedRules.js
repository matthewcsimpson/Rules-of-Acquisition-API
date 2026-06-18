const knex = require("../db");

const getAllRevisedRules = async (_req, res) => {
  const rules = await knex("rules")
    .select("rules.rule_number", "rules.revised_edition")
    .whereNotNull("rules.revised_edition");

  res.status(200).json(rules);
};

module.exports = { getAllRevisedRules };
