const { Model } = require('objection')
const { isInt } = require('./../helpers/type')
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

  $beforeValidate(jsonSchema, json, opt) {
    if (isInt(json.user_platform)) json.user_platform = parseInt(json.user_platform)
    if (isInt(json.score)) json.score = parseInt(json.score)
  }

  async $beforeSave(queryContext, old) {
    this.password = bcrypt.hashSync(this.password, 14).replace(/^\$2b(.+)$/i, '\$2y$1')
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext)
    await this.$beforeSave(queryContext)
  }

}

module.exports = Password