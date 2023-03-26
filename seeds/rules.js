const rules_data = require("../seed_data/rules_data");
const series_data = require("../seed_data/series_data");
const episode_data = require("../seed_data/episode_data");
const rule_appearance_data = require("../seed_data/rule_appearance_data");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("rules").del();
  await knex("rules").insert(rules_data);
  await knex("series").del();
  await knex("series").insert(series_data);
  await knex("episodes").del();
  await knex("episodes").insert(episode_data);
  await knex("rule_appearance").del();
  await knex("rule_appearance").insert(rule_appearance_data);
};
