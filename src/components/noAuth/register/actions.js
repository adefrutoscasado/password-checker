import Config from '../../../constants/Config';
import {DO_REGISTER_REQUEST, DO_REGISTER_REQUEST_COMMIT, DO_REGISTER_REQUEST_ROLLBACK} from './action-types';

export function registerUser(username, password, confirmPassword) {

  const data = {
    username,
    password,
    confirmPassword
  }

  return {
    types: [
      DO_REGISTER_REQUEST,
      DO_REGISTER_REQUEST_COMMIT,
      DO_REGISTER_REQUEST_ROLLBACK
    ],
    effect: {
      url: Config.api.getPath('/auth/register'),
      method: 'POST',
      body: JSON.stringify(data)
    }
  }

}