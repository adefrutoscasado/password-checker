exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('passwords', function (table) {
      table.increments()
      table.integer('user_id')
      table.integer('platform_id')
      table.string('password', 100)
      table.integer('score')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('passwords')
  ])
}