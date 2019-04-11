import Config from '../../../constants/Config';
import {GET_RANKING_REQUEST, GET_RANKING_REQUEST_COMMIT, GET_RANKING_REQUEST_ROLLBACK} from './action-types';

export function getRanking() {

  return {
    types: [
      GET_RANKING_REQUEST,
      GET_RANKING_REQUEST_COMMIT,
      GET_RANKING_REQUEST_ROLLBACK
    ],
    effect: {
      url: Config.api.getPath('/ranking'),
      method: 'GET'
    }
  }

}