const knex = require("knex")(require("../knexfile"));

/**
 * Function to check whether an API_Key is in the database/valid.
 * @param {*} api_key
 * @returns
 */
const checkApiKey = async (api_key) => {
  const validKeys = await knex("api_keys")
    .select("key")
    .then((rows) => {
      return rows.map((row) => row.key);
    })
    .catch((err) => console.error(err));

  return validKeys.includes(api_key);
};

module.exports = { checkApiKey };
