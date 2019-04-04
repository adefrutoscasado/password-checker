import {DO_LOGIN_BEGIN, DO_LOGIN_SUCCESS, DO_LOGIN_FAILURE} from './action-types';

const initialState = {
  loggedIn: false,
  loginError: '',
  userId: null,
  access_token: null
};

function rootReducer (state = initialState, action) {
  switch (action.type) {
    case DO_LOGIN_BEGIN:
      return state;

    case DO_LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        userId: action.payload.userId,
        access_token: action.payload.access_token
      }
    
    case DO_LOGIN_FAILURE:
    console.log(action.payload)
      return {
        ...initialState,
        loggedIn: false,
        loginError: action.payload
      }
    
    default:
      return state;
  }
}

export default rootReducer;