const { Model, transaction } = require('objection')
const bcrypt = require('bcrypt');

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

  static get virtualAttributes() {
    return ['total_score'];
  }

  get total_score() {
    let platforms = this.user_platforms
    let totalScore = 0
    if (platforms && platforms.length) {
      totalScore = platforms.reduce((counter, platform) => {
        return counter + this.getPonderateScore(platform.platform_score)
      }, 0);
    }
    return totalScore
  }



  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string' },
        password: { type: 'string', minLength: 8 },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' },
      }
    }
  }

  static get relationMappings() {
    const { UserPlatform } = require('./');
    return {
      user_platforms: {
        relation: Model.HasManyRelation,
        modelClass: UserPlatform,
        join: {
          from: 'user.id',
          to: 'user_platform.user_id'
        }
      },
    };
  }

  getPonderateScore (platformScore) {
    switch(platformScore) {
      case 1:
        return 0.1;
      case 2:
        return platformScore*0.3;
      case 3:
        return platformScore*0.6;
      case 4:
        return platformScore*0.8;
      case 5:
        return platformScore;
      default:
        return 0;
    }
  }

  static async getByUsername(username) {
    return await this.query().where('username', username).first()
  }

  static async upsertGraphAndFetch(data) {
    let updatedData
    try {
      updatedData = await transaction(this.knex(), async (trx) => {
        return await this.query(trx).allowUpsert('user_platforms.[passwords]').upsertGraphAndFetch(data)
      })
    } catch (err) {
      throw new Error(err)
    }
    return updatedData
  }

  async $afterGet(queryContext) {
    if (this.password) this.password = this.password.replace(/^\$2y(.+)$/i, '\$2b$1')
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

  checkCredentials(password) {
    return bcrypt.compareSync(password, this.password); // (plain text, hash)
  }

  getPlatform(platform_id) {
    return this.user_platforms.find(u_p => u_p.platform_id === platform_id)
  }

  toResponse() {
    return {
      id: this.id,
      username: this.username,
      user_platforms: this.user_platforms ? this.user_platforms.map(u_p => u_p.toResponse()) : null
    }
  }

  toRankingResponse() {
    return {
      id: this.id,
      username: this.username,
      created_at: this.created_at,
      updated_at: this.updated_at,
      total_score: this.total_score.toFixed(2),
      user_platforms: this.user_platforms ? this.user_platforms.map(u_p => u_p.toRankingResponse()) : null
    }
  }
}

module.exports = User