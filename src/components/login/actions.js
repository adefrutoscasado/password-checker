import Config from '../../constants/Config';
import {DO_LOGIN_REQUEST, DO_LOGIN_REQUEST_COMMIT, DO_LOGIN_REQUEST_ROLLBACK} from './action-types';

export function login(email, password) {

  const data = {
    email,
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