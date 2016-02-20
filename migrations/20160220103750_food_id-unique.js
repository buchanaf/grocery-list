
exports.up = function(knex, Promise) {

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('food', function(table) {
      table.dropColumn('food_id');
    }),
  ]);
};
