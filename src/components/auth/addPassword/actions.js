import Config from '../../../constants/Config';
import {GET_PLATFORMS_REQUEST, GET_PLATFORMS_REQUEST_COMMIT, GET_PLATFORMS_REQUEST_ROLLBACK} from './action-types';
import {POST_PASSWORD_REQUEST, POST_PASSWORD_REQUEST_COMMIT, POST_PASSWORD_REQUEST_ROLLBACK} from './action-types';

export function getPlatforms() {
  return {
    types: [
      GET_PLATFORMS_REQUEST,
      GET_PLATFORMS_REQUEST_COMMIT,
      GET_PLATFORMS_REQUEST_ROLLBACK
    ],
    effect: {
      url: Config.api.getPath('/platforms'),
      method: 'GET'
    }
  }
}

export function postPassword(userId, platformId, password, score) {
  const data = {
    password,
    score
  }
  return {
    types: [
      POST_PASSWORD_REQUEST,
      POST_PASSWORD_REQUEST_COMMIT,
      POST_PASSWORD_REQUEST_ROLLBACK
    ],
    effect: {
      url: Config.api.getPath(`/users/${userId}/platforms/${platformId}/password`),
      method: 'POST',
      body: JSON.stringify(data)
    }
  }
}
