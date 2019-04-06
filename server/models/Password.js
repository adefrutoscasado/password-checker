const { Model } = require('objection')
const bcrypt = require('bcrypt');

const knexConnection = require('./../services/knexConnection')
Model.knex(knexConnection)

const unique = require('objection-unique')({
  fields: ['name'],
  identifiers: ['id']
});

class Password extends unique(Model) {
  static get tableName() {
    return 'password'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
      }
    }
  }

}

module.exports = Password