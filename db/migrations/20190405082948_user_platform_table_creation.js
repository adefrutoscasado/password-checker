
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('user_platform', function (table) {
      table.increments()
      table.integer('user_id')
      table.integer('platform_id')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user_platform')
  ])
}