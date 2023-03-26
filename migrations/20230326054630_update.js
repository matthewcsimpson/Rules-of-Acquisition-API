/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("rules", (table) => {
      table.text("rule_variation");
      table.text("rule_note");
      table.text("revised_edition");
    })
    .alterTable("rule_appearance", (table) => {
      table.boolean("variation").defaultTo(false);
      table.boolean("revised_edition").defaultTo(false);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
