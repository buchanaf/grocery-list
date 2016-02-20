
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table) {
      table.string('facebook_id').notNullable();
    }),
  ]);
};

exports.down = function(knex, Promise) {

};
