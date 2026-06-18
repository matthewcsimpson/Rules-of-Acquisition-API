const knex = require("../db");

/**
 * Returns true if at least one row in `table` matches the supplied
 * where-builder. Uses an indexed `.first()` lookup instead of loading
 * the table's whole id column and scanning it in JS.
 *
 * @param {string} table - table name
 * @param {(qb: import("knex").Knex.QueryBuilder) => void} build - applies the where clause(s)
 * @returns {Promise<boolean>}
 */
const exists = async (table, build) => {
  const row = await knex(table).where(build).first();
  return Boolean(row);
};

module.exports = { exists };
