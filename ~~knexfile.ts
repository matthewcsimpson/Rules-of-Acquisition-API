import type { Knex } from "knex";
import dotenv from "dotenv";

const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PORT = Number(process.env.DATABASE_PORT);
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  production: {
    client: "mysql2",
    connection: {
      database: DATABASE_NAME,
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      charset: "utf8",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

// module.exports = config;
export default config;