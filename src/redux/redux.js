import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducer';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

function tryParseJSON(json) {
  if (!json) {
    return null;
  }
  try {
    return JSON.parse(json);
  } catch (e) {
    throw new Error('Failed to parse unexpected JSON response: ' + json);
  }
}

function getResponseBody(res) {
  const contentType = res.headers.get('content-type') || false;
  if (contentType && contentType.indexOf('json') >= 0) {
    return res.text().then(tryParseJSON);
  }
  return res.text();
}

function fetchAsyncMiddleware({dispatch, getState}) {
  return next => action => {
    const {types, effect} = action;

    if(!action.effect) return next(action);

    const [requestType, commitType, rollbackType] = types;
    dispatch({type: requestType});

    const {url, ...options} = effect;
    let headers = getHeaders(options);

    // adding Bearer auth when loggedIn
    const loginState = getState().login;
    if(loginState.loggedIn) {
      let authHeader = {
        'Authorization': `Bearer ${loginState.access_token}`
      }
      headers = Object.assign({}, headers, authHeader)
    }

    return fetch(url, {...options, headers})
    .then(res => {
      if(res.ok) {
        getResponseBody(res).then(payload => {
          dispatch({type: commitType, payload});
        });
        return Promise.resolve(getState());
      }
      getResponseBody(res).then(error => {
        dispatch({type: rollbackType, payload: error});
        return Promise.reject(error);
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
}

const getHeaders = (options = {}) => {
  return {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Accept': 'application/json',
    ...options.headers,
  };
}

// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(fetchAsyncMiddleware, thunk)));

export default () => {
  return {store, persistor: persistStore(store)};
};