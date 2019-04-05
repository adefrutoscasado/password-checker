const { Model } = require('objection')
const bcrypt = require('bcrypt');
const jwt = require('express-jwt');

const knexConnection = require('./../services/knexConnection')
Model.knex(knexConnection)

const unique = require('objection-unique')({
  fields: ['username'],
  identifiers: ['id']
});

class User extends unique(Model) {
  static get tableName() {
    return 'user'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ["username", "password"],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string' },
        password: { type: 'string', minLength: 8 }
      }
    }
  }

  static async getByUsername(username) {
    return await this.query().where("username", username).first()
  }


  async $afterGet(queryContext) {
    if (this.password) this.password = this.password.replace(/^\$2y(.+)$/i, '\$2a$1')
  }

  async $beforeSave(queryContext, old) {
    this.password = bcrypt.hashSync(this.password, 14).replace(/^\$2a(.+)$/i, '\$2y$1')
  }

  async $beforeInsert(queryContext) {
    await super.$beforeInsert(queryContext)
    await this.$beforeSave(queryContext)
  }

  async $beforeUpdate(opt, queryContext) {
    await super.$beforeUpdate(opt, queryContext)
    await this.$beforeSave(queryContext, opt.old)
  }

  checkCredentials(password) {
    return bcrypt.compareSync(password, this.password); // (plain text, hash)
  }
}

module.exports = User