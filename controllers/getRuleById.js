const knex = require("../db");
const { exists } = require("../helpers/exists");

/**
 * Build a handler returning a single rule (or revised rule) by number,
 * together with the episodes it appeared in. The two variants share one
 * control flow; `revised` toggles the existence filter, the rule columns
 * selected, and the episode-appearance filter.
 * @param {{ revised: boolean }} options
 */
const makeGetRuleById = ({ revised }) => async (req, res) => {
  const ruleId = Number(req.params.rule_id);
  const ruleExists = Number.isNaN(ruleId)
    ? false
    : await exists("rules", (qb) => {
        qb.where("rule_number", ruleId);
        if (revised) qb.whereNotNull("revised_edition");
      });

  if (!ruleExists) {
    return res.status(404).json({
      error: revised
        ? `There is no revised rule by that number`
        : `There is no rule by that number`,
    });
  }

  const ruleColumns = revised
    ? ["rules.rule_number", "rules.revised_edition", "rules.revised_note"]
    : [
        "rules.rule_number",
        "rules.rule_text",
        "rules.rule_variation",
        "rules.rule_note",
      ];

  const ruleDetails = await knex("rules")
    .where("rules.rule_number", ruleId)
    .select(ruleColumns);

  const episodeQuery = knex("rules")
    .where("rules.rule_number", ruleId)
    .distinct()
    .select(
      "series.series_name",
      "episodes.episode_season",
      "episodes.episode_number",
      "episodes.episode_title",
      "episodes.episode_synopsis",
      "episodes.episode_date"
    )
    .join("rule_appearance", "rule_appearance.rule_number", "rules.rule_number")
    .join("episodes", "episodes.episode_id", "rule_appearance.episode_id")
    .join("series", "series.series_id", "episodes.series_id")
    .orderBy("episodes.episode_date", "asc");

  if (revised) episodeQuery.where("rule_appearance.revised_edition", true);

  const episodeDetails = await episodeQuery;

  res.status(200).json({ ruleDetails: ruleDetails[0], episodeDetails });
};

const getRuleById = makeGetRuleById({ revised: false });
const getRevisedRuleById = makeGetRuleById({ revised: true });

module.exports = { getRuleById, getRevisedRuleById };
