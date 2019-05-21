exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('password', function (table) {
      table.increments()
      table.integer('user_platform_id')
      table.string('password', 100)
      table.integer('score')
      table.timestamps();
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('password')
  ])
}