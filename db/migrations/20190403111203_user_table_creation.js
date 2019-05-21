
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user', function (table) {
      table.increments()
      table
        .string('username', 100)
        .unique()
      table.string('password', 100)
      table.timestamps();
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user')
  ])
}
