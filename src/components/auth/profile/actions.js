import Config from '../../../constants/Config';
import {GET_USER_REQUEST, GET_USER_REQUEST_COMMIT, GET_USER_REQUEST_ROLLBACK} from './action-types';
import {UPSERT_USER_REQUEST, UPSERT_USER_REQUEST_COMMIT, UPSERT_USER_REQUEST_ROLLBACK} from './action-types';

export function getUser(userId) {
  return {
    types: [
      GET_USER_REQUEST,
      GET_USER_REQUEST_COMMIT,
      GET_USER_REQUEST_ROLLBACK
    ],
    effect: {
      url: Config.api.getPath(`/users/${userId}/?eager=user_platforms.[platform,passwords]`),
      method: 'GET'
    }
  }
}

export function upsertUser(userId, graphBody) {
  let data = {
    user_platforms: graphBody
  }
  return {
    types: [
      UPSERT_USER_REQUEST,
      UPSERT_USER_REQUEST_COMMIT,
      UPSERT_USER_REQUEST_ROLLBACK
    ],
    effect: {
      url: Config.api.getPath(`/users/${userId}/upsert`),
      method: 'PUT',
      body: JSON.stringify(data)
    }
  }
}
