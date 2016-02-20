require('babel-polyfill');
const Schema = require('./schema');
const knex = require('../db').knex;

function createTable(tableName) {
  return knex.schema.createTable(tableName, function (table) {
    var column;
    var columnKeys = Object.keys(Schema[tableName]);
    columnKeys.forEach(function (key) {
      if (Schema[tableName][key].type === 'text' && Schema[tableName][key].hasOwnProperty('fieldtype')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].fieldtype);
      } else if (Schema[tableName][key].type === 'string' && Schema[tableName][key].hasOwnProperty('maxlength')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].maxlength);
      } else {
        column = table[Schema[tableName][key].type](key);
      }

      if (Schema[tableName][key].hasOwnProperty('nullable') && Schema[tableName][key].nullable === true) {
        column.nullable();
      } else {
        column.notNullable();
      }

      if (Schema[tableName][key].hasOwnProperty('primary') && Schema[tableName][key].primary === true) {
        column.primary();
      }

      if (Schema[tableName][key].hasOwnProperty('unique') && Schema[tableName][key].unique) {
        column.unique();
      }

      if (Schema[tableName][key].hasOwnProperty('unsigned') && Schema[tableName][key].unsigned) {
        column.unsigned();
      }

      if (Schema[tableName][key].hasOwnProperty('references')) {
        column.references(Schema[tableName][key].references);
      }

      if (Schema[tableName][key].hasOwnProperty('defaultTo')) {
        column.defaultTo(Schema[tableName][key].defaultTo);
      }
    });
    console.log(column);
  });
}

function createTables () {
  var tables = [];
  var tableNames = Object.keys(Schema);

  tables = tableNames.map(function (tableName) {
    return createTable(tableName);
  });

  return Promise.all(tables);
}

createTables()
  .then(function() {
    console.log('here');
    process.exit(0);
  })
  .catch(function (error) {
    throw error;
  });

// (function(){
//   // console.log('here');
//   return knex.schema.dropTable('users')
//     .dropTable('food')
//     .dropTable('lists');

// }());