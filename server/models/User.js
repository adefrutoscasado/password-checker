const { Model } = require('objection')
const knexConnection = require('./../services/knexConnection')
Model.knex(knexConnection)

const unique = require('objection-unique')({
  fields: ['email'],
  identifiers: ['id']
});

class User extends unique(Model) {
  static get tableName() {
    return 'user'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ["email", "password"],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        password: { type: 'string' }
      }
    }
  }
}

module.exports = User
