require("dotenv").config();

const {
  DATABASE_URL,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

// Prefer a single DATABASE_URL (Heroku style) when present; Heroku Postgres
// requires SSL. Fall back to discrete vars for local development.
const connection = DATABASE_URL
  ? {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : {
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
    };

/**
 * @type { import("knex").Knex.Config }
 */
module.exports = {
  client: "pg",
  connection,
};
