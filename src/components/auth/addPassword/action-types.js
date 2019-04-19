import { getActionsNames } from '../../redux-is-fetching/action-types';

export const [GET_PLATFORMS_REQUEST, GET_PLATFORMS_REQUEST_COMMIT, GET_PLATFORMS_REQUEST_ROLLBACK] = getActionsNames('Platforms/GET_PLATFORMS');

export const [POST_PASSWORD_REQUEST, POST_PASSWORD_REQUEST_COMMIT, POST_PASSWORD_REQUEST_ROLLBACK] = getActionsNames('Platforms/POST_PASSWORD');
