require('babel-polyfill');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'Alex_Buchanan',
    database: 'grocery',
    charset: 'utf8',
  },
});

module.exports = require('bookshelf')(knex);
