import {GET_PLATFORMS_REQUEST, GET_PLATFORMS_REQUEST_COMMIT, GET_PLATFORMS_REQUEST_ROLLBACK} from './action-types';

export const initialState = {
  platforms: []
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
    
    default:
      return state;
  }
}