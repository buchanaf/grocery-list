
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('food', function(table) {
      table.increments('id').primary().notNullable();
      table.string('name').notNullable();
      table.string('food_id').notNullable().unique();
    }),
  ]);
};

exports.down = function(knex, Promise) {

};
