import Config from '../../../constants/Config';
import {DO_LOGIN_REQUEST, DO_LOGIN_REQUEST_COMMIT, DO_LOGIN_REQUEST_ROLLBACK} from './action-types';
import {REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_REQUEST_COMMIT, REFRESH_TOKEN_REQUEST_ROLLBACK} from './action-types';

export function login(username, password) {

  const data = {
    username,
    password
  }

  return {
    types: [
      DO_LOGIN_REQUEST,
      DO_LOGIN_REQUEST_COMMIT,
      DO_LOGIN_REQUEST_ROLLBACK
    ],
    effect: {
      url: Config.api.getPath('/auth/login'),
      method: 'POST',
      body: JSON.stringify(data)
    }
  }

}

export function refreshToken(refreshToken, commitAction) {

  return {
    types: [
      REFRESH_TOKEN_REQUEST,
      REFRESH_TOKEN_REQUEST_COMMIT,
      REFRESH_TOKEN_REQUEST_ROLLBACK
    ],
    effect: {
      url: Config.api.getPath('/auth/refresh'),
      method: 'POST',
      body: JSON.stringify({refresh_token: refreshToken})
    },
    commitAction,
    rollbackAction: {type: 'LOGOUT'}
  }

}