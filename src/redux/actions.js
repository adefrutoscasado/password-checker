import Config from '../constants/Config';
import {DO_LOGIN_BEGIN, DO_LOGIN_SUCCESS, DO_LOGIN_FAILURE} from './action-types';

export function fetchLogin(email, password) {

  return dispatch => {
    dispatch(fetchLoginBegin());
    return fetch(Config.api.getPath('/auth/login'), {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Accept': 'application/json'
      }
    })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchLoginSuccess(json));
      })
      .catch(error => {
        dispatch(fetchLoginFailure(error))
      });
  };
  
}

const fetchLoginBegin = () => ({
  type: DO_LOGIN_BEGIN
})

const fetchLoginSuccess = payload => ({
  type: DO_LOGIN_SUCCESS,
  payload
})

const fetchLoginFailure = payload => ({
  type: DO_LOGIN_FAILURE,
  payload
})

function handleErrors(response) {
  if (!response.ok){
    throw new Error(response.statusText);
  }
  return response;
}