import {DO_LOGIN_REQUEST, DO_LOGIN_REQUEST_COMMIT, DO_LOGIN_REQUEST_ROLLBACK} from './action-types';
import {REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_REQUEST_COMMIT, REFRESH_TOKEN_REQUEST_ROLLBACK} from './action-types';
import {AnyAction} from 'redux';
import {SessionState} from './types';

export const initialState: SessionState = {
  loggedIn: false,
  loginError: '',
  userId: null,
  access_token: null,
  refresh_token: null,
  username: ''
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case DO_LOGIN_REQUEST:
      return {
        ...state,
        username: (JSON.parse(action.data)).username
      }

    case DO_LOGIN_REQUEST_COMMIT:
      return {
        ...state,
        loggedIn: true,
        userId: action.payload.id,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        loginError:''
      }
    
    case DO_LOGIN_REQUEST_ROLLBACK:
      return {
        ...initialState,
        loggedIn: false,
        loginError: action.payload.message
      }

    case REFRESH_TOKEN_REQUEST:
      return state;

    case REFRESH_TOKEN_REQUEST_COMMIT:
      return {
        ...state,
        loggedIn: true,
        userId: action.payload.id,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        loginError:''
      }
    
    case REFRESH_TOKEN_REQUEST_ROLLBACK:
      return {
        ...initialState,
        loggedIn: false,
        loginError: action.payload.message
      }
    
    default:
      return state;
  }
}