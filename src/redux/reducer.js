import {combineReducers} from 'redux';
import login, {name as loginName} from '../components/login/reducer';

const appReducer = combineReducers({
  [loginName]: login,
  routerFluxFocus: (state = { routerFluxFocus: undefined }) => state //Fake reducer, we need to hook in the rootReducer to intercept RNRF events and set current focus scene
});

const rootReducer = (state, action) => {
  try {
    console.log('ACTION', action);
    return appReducer(state, action);
  } catch (e) {
    console.log('REDUX ERROR', e)
  }
};

export default rootReducer;