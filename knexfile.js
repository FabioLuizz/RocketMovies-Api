const path = require('path')

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "Src", "Database", "database.db")
    },

    migrations: {
      directory: path.resolve(__dirname, "Src", "Database", "Knex", "Migrations")
    },

    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },

    useNullAsDefault: true
  },


};
