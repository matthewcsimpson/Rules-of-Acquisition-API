// Single shared knex client. Every controller imports this instead of
// instantiating its own pool against the same database.
module.exports = require("knex")(require("./knexfile"));
