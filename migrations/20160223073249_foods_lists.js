
exports.up = function(knex, Promise) {
  return knex.schema.createTable('foods_lists', function(table) {
    table.integer('food_id').references('foods.id');
    table.integer('list_id').references('lists.id');
  });
};

exports.down = function(knex, Promise) {

};
