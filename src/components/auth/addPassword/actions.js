import Config from '../../../constants/Config';
import {GET_PLATFORMS_REQUEST, GET_PLATFORMS_REQUEST_COMMIT, GET_PLATFORMS_REQUEST_ROLLBACK} from './action-types';

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
