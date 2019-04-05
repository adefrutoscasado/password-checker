const { Model } = require('objection')

const knexConnection = require('./../services/knexConnection')
Model.knex(knexConnection)

const unique = require('objection-unique')({
  fields: ['name'],
  identifiers: ['id']
});

class Platform extends unique(Model) {
  static get tableName() {
    return 'platform'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ["name"],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
      }
    }
  }
}

module.exports = Platform