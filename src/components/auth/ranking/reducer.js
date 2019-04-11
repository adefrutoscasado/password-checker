import {GET_RANKING_REQUEST, GET_RANKING_REQUEST_COMMIT, GET_RANKING_REQUEST_ROLLBACK} from './action-types';

export const initialState = {
  ranking: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_RANKING_REQUEST:
      return state;

    case GET_RANKING_REQUEST_COMMIT:
      return {
        ...state,
        ranking: action.payload
      }
    
    case GET_RANKING_REQUEST_ROLLBACK:
      return {
        ...initialState
      }
    
    default:
      return state;
  }
}