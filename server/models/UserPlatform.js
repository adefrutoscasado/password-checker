const { Model } = require('objection')
const bcrypt = require('bcrypt');

const knexConnection = require('../services/knexConnection')
Model.knex(knexConnection)

class UserPlatform extends Model {
  static get tableName() {
    return 'user_platform'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'platform_id'],
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
}

module.exports = UserPlatform