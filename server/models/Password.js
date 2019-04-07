const { Model } = require('objection')
const bcrypt = require('bcrypt');

const knexConnection = require('./../services/knexConnection')
Model.knex(knexConnection)

class Password extends Model {
  static get tableName() {
    return 'password'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['password', 'score'],
      properties: {
        id: { type: 'integer' },
        user_platform: { type: 'integer' },
        password: { type: 'string' },
        score: { type: 'integer' },
      }
    }
  }

}

module.exports = Password