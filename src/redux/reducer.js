import {DO_LOGIN_REQUEST, DO_LOGIN_REQUEST_COMMIT, DO_LOGIN_REQUEST_ROLLBACK} from '../components/noAuth/login/action-types';
import {initialState as loginInitialState} from '../components/noAuth/login/reducer';

const initialState = {
  loginInitialState
};

const rootReducer = (state = initialState, action) => {
  console.log('ACTION', action)
  switch (action.type) {
    // LOGIN REDUCER
    case DO_LOGIN_REQUEST:
      return state;

    case DO_LOGIN_REQUEST_COMMIT:
      return {
        ...state,
        loggedIn: true,
        userId: action.payload.id,
        access_token: action.payload.access_token
      }
    
    case DO_LOGIN_REQUEST_ROLLBACK:
      return {
        ...initialState,
        loggedIn: false,
        loginError: action.payload.message
      }
    
    default:
      return state;
  }
}

export default rootReducer;