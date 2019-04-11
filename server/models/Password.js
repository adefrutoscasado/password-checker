const { Model } = require('objection')
const { isInt } = require('./../helpers/type')

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

  $beforeValidate(jsonSchema, json, opt) {
    if (isInt(json.user_platform)) json.user_platform = parseInt(json.user_platform)
    if (isInt(json.score)) json.score = parseInt(json.score)
  }

}

module.exports = Password