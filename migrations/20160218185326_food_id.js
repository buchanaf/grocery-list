
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('food', function(table) {
      table.string('food_id').notNullable();
    }),
  ]);
};

exports.down = function(knex, Promise) {

};
