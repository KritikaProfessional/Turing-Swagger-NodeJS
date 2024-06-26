// Update with your config settings.

module.exports = {

  development: {

    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'Kritika@123',
      database: 'ecommerce_task'
    }
  },

  // development: {
  //   client: 'mysql',
  //   connection: {
  //     database: 'Ecommerce_Task',
  //     user:     'root',
  //     password: 'Nav@gur1'
  //   }
  // },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
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
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
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
