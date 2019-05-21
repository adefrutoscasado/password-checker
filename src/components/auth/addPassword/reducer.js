import {GET_PLATFORMS_REQUEST, GET_PLATFORMS_REQUEST_COMMIT, GET_PLATFORMS_REQUEST_ROLLBACK} from './action-types';
import {POST_PASSWORD_REQUEST, POST_PASSWORD_REQUEST_COMMIT, POST_PASSWORD_REQUEST_ROLLBACK} from './action-types';

export const initialState = {
  postPasswordError: '',
  platforms: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PLATFORMS_REQUEST:
      return state;

    case GET_PLATFORMS_REQUEST_COMMIT:
      return {
        ...state,
        platforms: action.payload
      }
    
    case GET_PLATFORMS_REQUEST_ROLLBACK:
      return {
        ...initialState
      }

    case POST_PASSWORD_REQUEST:
      return state;

    case POST_PASSWORD_REQUEST_COMMIT:
      return {
        ...state
      }
    
    case POST_PASSWORD_REQUEST_ROLLBACK:
      return {
        ...state,
        postPasswordError: action.payload.message
      }
      
    default:
      return state;
  }
}