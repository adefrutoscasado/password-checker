import { getActionsNames } from '../../redux-is-fetching/action-types';

export const [DO_LOGIN_REQUEST, DO_LOGIN_REQUEST_COMMIT, DO_LOGIN_REQUEST_ROLLBACK] = getActionsNames('Login/DO_LOGIN');

export const [REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_REQUEST_COMMIT, REFRESH_TOKEN_REQUEST_ROLLBACK] = getActionsNames('Login/REFRESH_TOKEN');