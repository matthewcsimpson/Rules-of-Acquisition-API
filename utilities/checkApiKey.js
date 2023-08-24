const knex = require("knex")(require("../knexfile"));

const checkApiKey = async (api_key) => {
  const validKeys = await knex("api_keys")
    .select("key")
    .then((rows) => {
      return rows.map((row) => row.key);
    })
    .catch((err) => console.error(err));

  return (validKeys.includes(api_key));
};

module.exports = { checkApiKey };
