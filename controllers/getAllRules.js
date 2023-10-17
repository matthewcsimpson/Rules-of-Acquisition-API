const knex = require("knex")(require("../knexfile"));

/**
 * Function to return all of the rules of acquisition.
 * Response includes rule number and text.
 * @param {*} _req
 * @param {*} res
 */
const getAllRules = async (_req, res) => {
  let rules = await knex("rules")
    .select("rules.rule_number", "rules.rule_text")
    .orderBy("rules.rule_number")
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
  res.status(200).json(rules);
};

module.exports = { getAllRules };
