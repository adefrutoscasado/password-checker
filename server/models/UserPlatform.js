const { Model } = require('objection')
const { isInt } = require('./../helpers/type')

const knexConnection = require('../services/knexConnection')
Model.knex(knexConnection)

class UserPlatform extends Model {
  static get tableName() {
    return 'user_platform'
  }

  static get virtualAttributes() {
    return ['platform_score'];
  }

  get platform_score() {
    let platformScore = this.getLastPlatformScore()
    return platformScore
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['platform_id'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        platform_id: { type: 'integer' },
      }
    }
  }

  static get relationMappings() {
    const { Password, Platform } = require('./');
    return {
      passwords: {
        relation: Model.HasManyRelation,
        modelClass: Password,
        join: {
          from: 'user_platform.id',
          to: 'password.user_platform_id'
        }
      },
      platform: {
        relation: Model.BelongsToOneRelation,
        modelClass: Platform,
        join: {
          from: 'user_platform.platform_id',
          to: 'platform.id'
        }
      },
    };
  }

  $beforeValidate(jsonSchema, json, opt) {
    if (isInt(json.user_id)) json.user_id = parseInt(json.user_id)
    if (isInt(json.platform_id)) json.platform_id = parseInt(json.platform_id)
  }

  getLastPlatformScore() {
    if (!this.passwords.length) return 0
    return this.passwords[this.passwords.length-1].score
  }

  toResponse() {
    return {
      id: this.id,
      platform: this.platform,
      passwords: this.passwords.map(p => p.toResponse())
    }
  }

  toRankingResponse() {
    return {
      id: this.id,
      platform: this.platform,
      platform_score: this.platform_score,
      passwords: this.passwords.map(p => p.toResponse())
    }
  }
}

module.exports = UserPlatform