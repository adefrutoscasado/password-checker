import login from '../components/noAuth/login/reducer';
import isFetching from '../components/redux-is-fetching/reducer';
import ranking from '../components/auth/ranking/reducer';
import platforms from '../components/auth/addPassword/reducer';
import profile from '../components/auth/profile/reducer';
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  login,
  isFetching,
  ranking,
  platforms,
  profile
});

const rootReducer = (state, action) => {
  console.log('ACTION', action)
  if (action.type === 'LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;
