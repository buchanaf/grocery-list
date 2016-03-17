require('babel-polyfill');
const Schema = require('./schema');
const knex = require('../db').knex;

function createTable(tableName) {
  return knex.schema.createTable(tableName, (table) => {
    let column;
    const columnKeys = Object.keys(Schema[tableName]);
    columnKeys.forEach((key) => {
      if (
        Schema[tableName][key].type === 'text' &&
        Schema[tableName][key].hasOwnProperty('fieldtype')
      ) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].fieldtype);
      } else if (
        Schema[tableName][key].type === 'string' &&
        Schema[tableName][key].hasOwnProperty('maxlength')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].maxlength);
      } else {
        column = table[Schema[tableName][key].type](key);
      }

      if (
        Schema[tableName][key].hasOwnProperty('nullable') &&
        Schema[tableName][key].nullable === true) {
        column.nullable();
      } else {
        column.notNullable();
      }

      if (
        Schema[tableName][key].hasOwnProperty('primary') &&
        Schema[tableName][key].primary === true) {
        column.primary();
      }

      if (
        Schema[tableName][key].hasOwnProperty('unique') &&
        Schema[tableName][key].unique) {
        column.unique();
      }

      if (
        Schema[tableName][key].hasOwnProperty('unsigned') &&
        Schema[tableName][key].unsigned) {
        column.unsigned();
      }

      if (Schema[tableName][key].hasOwnProperty('references')) {
        column.references(Schema[tableName][key].references);
      }

      if (Schema[tableName][key].hasOwnProperty('defaultTo')) {
        column.defaultTo(Schema[tableName][key].defaultTo);
      }
    });
  });
}

function createTables() {
  const tableNames = Object.keys(Schema);
  const tables = tableNames.map((tableName) => createTable(tableName));
  return Promise.all(tables);
}

createTables()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    throw error;
  });
