import {GET_USER_REQUEST, GET_USER_REQUEST_COMMIT, GET_USER_REQUEST_ROLLBACK} from './action-types';
import {UPSERT_USER_REQUEST, UPSERT_USER_REQUEST_COMMIT, UPSERT_USER_REQUEST_ROLLBACK} from './action-types';

export const initialState = {
  upsertUserError: '',
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return state;

    case GET_USER_REQUEST_COMMIT:
      return {
        ...state,
        user: action.payload
      }
    
    case GET_USER_REQUEST_ROLLBACK:
      return {
        ...initialState
      }

    case UPSERT_USER_REQUEST:
      return state;

    case UPSERT_USER_REQUEST_COMMIT:
      return {
        ...state
      }
    
    case UPSERT_USER_REQUEST_ROLLBACK:
      return {
        ...initialState,
        upsertUserError: action.payload.message
      }
      
    default:
      return state;
  }
}