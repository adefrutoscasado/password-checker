import { getActionsNames } from '../../redux-is-fetching/action-types';

export const [DO_REGISTER_REQUEST, DO_REGISTER_REQUEST_COMMIT, DO_REGISTER_REQUEST_ROLLBACK] = getActionsNames('Register/DO_REGISTER');