
exports.up = function(knex, Promise) {
  return knex.schema.table('foods_lists', function(table) {
    table.bool('complete').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {

};
