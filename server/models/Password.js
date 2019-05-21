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
        password: { type: 'string', minLength: 6 },
        score: { type: 'integer' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      }
    }
  }

  $beforeValidate(jsonSchema, json, opt) {
    if (isInt(json.user_platform)) json.user_platform = parseInt(json.user_platform)
    if (isInt(json.score)) json.score = parseInt(json.score)
  }

  async $beforeSave(queryContext, old) {
    if (this.password) this.password = bcrypt.hashSync(this.password, 14).replace(/^\$2b(.+)$/i, '\$2y$1')
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext)
    await this.$beforeSave(queryContext)
    this.created_at = new Date().toISOString()
    delete this.updated_at
  }

  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext)
    await this.$beforeSave(queryContext, opt.old)
    this.updated_at = new Date().toISOString()
    delete this.created_at
  }


  toResponse() {
    return {
      id: this.id,
      created_at: this.created_at,
      updated_at: this.updated_at,
      score: this.score
    }
  }
}

module.exports = Password