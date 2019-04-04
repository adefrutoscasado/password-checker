import login from '../components/noAuth/login/reducer';
import isFetching from '../components/redux-is-fetching/reducer';
import { combineReducers } from '../../../../../AppData/Local/Microsoft/TypeScript/3.0/node_modules/redux';

const appReducer = combineReducers({
  login,
  isFetching
});

const rootReducer = (state, action) => {
  console.log('ACTION', action)
  return appReducer(state, action)
}

export default rootReducer;
