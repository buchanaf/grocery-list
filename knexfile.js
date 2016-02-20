// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      user     : 'Alex_Buchanan',
      database : 'grocery',
      charset  : 'utf8'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      user     : 'Alex_Buchanan',
      database : 'grocery',
      charset  : 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      user     : 'Alex_Buchanan',
      database : 'grocery',
      charset  : 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
