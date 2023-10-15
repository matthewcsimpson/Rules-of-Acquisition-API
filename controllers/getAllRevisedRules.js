const knex = require("knex")(require("../knexfile"));

const getAllRevisedRules = async (_req, res) => {
  let rules = await knex("rules")
    .select("rules.rule_number", "rules.revised_edition")
    .whereNotNull("rules.revised_edition")
    .catch((err) => {
      console.error(err);
    }).finally(() => {
      knex.destroy();
    });

  res.status(200).json(rules);
};

module.exports = { getAllRevisedRules };
