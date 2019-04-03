module.exports = {
  development: {
    client: 'sqlite',
    connection: {
      filename: './db/db.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    }
  }
}