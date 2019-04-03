
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user', function (table) {
      table.increments()
      table.string('email', 100)
      table.string('password', 100)
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user')
  ])
}
