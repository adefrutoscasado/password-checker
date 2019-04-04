import Config from '../../constants/Config';
import {DO_REGISTER_REQUEST, DO_REGISTER_COMMIT, DO_REGISTER_ROLLBACK} from './action-types';

export function registerUser(email, password, confirmPassword) {

  const data = {
    email,
    password,
    confirmPassword
  }

  return {
    types: [
      DO_REGISTER_REQUEST,
      DO_REGISTER_COMMIT,
      DO_REGISTER_ROLLBACK
    ],
    effect: {
      url: Config.api.getPath('/auth/register'),
      method: 'POST',
      body: JSON.stringify(data)
    }
  }

}