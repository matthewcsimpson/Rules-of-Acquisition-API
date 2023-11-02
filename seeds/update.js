const newEpisodes = [
  {
    episode_id: "ld-4x10",
    series_id: "LD",
    episode_season: 4,
    episode_number: 10,
    episode_date: "2023-11-02",
    episode_synopsis: "Mariner faces her past in the season four finale.",
    episode_title: "Old Friends, New Planets",
  },
];

const newAppearances = [
  {
    rule_number: 91,
    episode_id: "ld-4x10",
  },
  {
    rule_number: 289,
    episode_id: "ld-4x10",
  },
  {
    rule_number: 0,
    episode_id: "voy-3x05",
  },
];

const newRules = [
  {
    rule_number: 91,
    rule_text: "Your boss is only worth what he pays you.",
  },
  {
    rule_number: 289,
    rule_text: "Shoot first, count profits later.",
  },
  {
    rule_number: 0,
    rule_text: "When no appropriate rule applies, make one up.",
  },
];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("rules").insert(newRules);
  await knex("episodes").insert(newEpisodes);
  await knex("rule_appearance").insert(newAppearances);
};
