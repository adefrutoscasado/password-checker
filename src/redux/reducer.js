import login from '../components/noAuth/login/reducer';
import isFetching from '../components/redux-is-fetching/reducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  login,
  isFetching
});

const rootReducer = (state, action) => {
  console.log('ACTION', action)
  if (action.type === 'LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;
