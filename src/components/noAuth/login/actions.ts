import Config from '../../../constants/Config';
// @ts-ignore
import {DO_LOGIN_REQUEST, DO_LOGIN_REQUEST_COMMIT, DO_LOGIN_REQUEST_ROLLBACK} from './action-types';
// @ts-ignore
import {REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_REQUEST_COMMIT, REFRESH_TOKEN_REQUEST_ROLLBACK} from './action-types';
import {AnyAction} from 'redux';

export function login(username: string, password: string) {

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

export function refreshToken(refreshToken: string, commitAction: AnyAction) {

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