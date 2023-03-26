/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return (
    knex.schema
      // rules
      .createTable("rules", (table) => {
        table.integer("rule_number").unsigned();
        table.text("rule_text");
        table.boolean("canon").defaultTo(true);
        table.primary("rule_number");
      })
      // series
      .createTable("series", (table) => {
        table.string("series_id").notNullable();
        table.string("series_name").notNullable();
        table.primary("series_id");
      })
      // episodes
      .createTable("episodes", (table) => {
        table.string("episode_id").notNullable();
        table
          .string("series_id")
          .references("series_id")
          .inTable("series")
          .onUpdate("cascade")
          .onDelete("cascade");
        table.integer("episode_season").notNullable();
        table.integer("episode_number").notNullable();
        table.dateTime("episode_date").notNullable();
        table.text("episode_synopsis").notNullable();
        table.string("episode_title").notNullable();
        table.primary("episode_id");
      })
      // rule appearance
      .createTable("rule_appearance", (table) => {
        table
          .integer("rule_number")
          .unsigned()
          .references("rule_number")
          .inTable("rules")
          .onUpdate("cascade")
          .onDelete("cascade");
        table
          .string("episode_id")
          .references("episode_id")
          .inTable("episodes")
          .onUpdate("cascade")
          .onDelete("cascade");
        table.increments("rule_appearance_id");
        table.primary("rule_appearance_id");
      })
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("rule_appearance")
    .dropTable("episodes")
    .dropTable("series")
    .dropTable("rules");
};
