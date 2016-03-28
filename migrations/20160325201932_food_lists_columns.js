
exports.up = function(knex, Promise) {
  return knex.schema.table('foods_lists', function(table) {
    table.integer('quantity').nullable();
    table.string('measurement').nullable();
    table.string('category').nullable();
    table.string('notes').nullable();
  });
};

exports.down = function(knex, Promise) {

};
