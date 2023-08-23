const knex = require("knex")(require("../knexfile"));

/**
 * Function to return all of the rules of acquisition. 
 * Response includes rule number and text. 
 * @param {*} _req 
 * @param {*} res 
 */
const getAllRules = async (_req, res) => {
  let rules = await knex("rules")
    .select({
      "Rule #": "rule_number",
      Text: "rule_text",
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });

  res.send(rules);
};

module.exports = { getAllRules };
