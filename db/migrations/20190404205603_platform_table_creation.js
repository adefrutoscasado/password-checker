exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('platform', function (table) {
      table.increments()
      table
        .string('name', 100)
        .unique()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('platform')
  ])
}