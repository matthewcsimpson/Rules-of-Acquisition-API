const knex = require("knex")(require("../knexfile"));

const getAllEpisodes = async (_req, res) => {
  await knex
    .select(
      "episodes.episode_id",
      "episodes.episode_title",
      "series.series_name",
      "episodes.episode_season",
      "episodes.episode_number",
      "episodes.episode_date",
      "episodes.episode_synopsis",
      "rules.rule_number",
      "rules.rule_text"
    )
    .from("episodes")
    .join(
      "rule_appearance",
      "episodes.episode_id",
      "rule_appearance.episode_id"
    )
    .join("rules", "rule_appearance.rule_number", "rules.rule_number")
    .join("series", "episodes.series_id", "series.series_id")
    .orderBy("episodes.episode_date", "asc")
    .then((rows) => {
      const episodes = {};

      rows.forEach((row) => {
        const {
          episode_id,
          episode_title,
          series_name,
          episode_season,
          episode_number,
          episode_synopsis,
          episode_date,
          rule_number,
          rule_text,
        } = row;

        if (!episodes[episode_id]) {
          episodes[episode_id] = {
            episode_title,
            series_name,
            episode_season,
            episode_number,
            episode_synopsis,
            episode_date,
            episode_id,
            episode_rules: [],
          };
        }

        if (rule_number) {
          episodes[episode_id].episode_rules.push({
            rule_number,
            rule_text,
          });
        }
      });

      const result = Object.values(episodes);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { getAllEpisodes };
