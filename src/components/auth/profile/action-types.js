import { getActionsNames } from '../../redux-is-fetching/action-types';

export const [GET_USER_REQUEST, GET_USER_REQUEST_COMMIT, GET_USER_REQUEST_ROLLBACK] = getActionsNames('Profile/GET_USER');

export const [UPSERT_USER_REQUEST, UPSERT_USER_REQUEST_COMMIT, UPSERT_USER_REQUEST_ROLLBACK] = getActionsNames('Profile/UPSERT_USER');
