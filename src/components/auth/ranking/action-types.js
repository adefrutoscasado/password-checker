import { getActionsNames } from '../../redux-is-fetching/action-types';

export const [GET_RANKING_REQUEST, GET_RANKING_REQUEST_COMMIT, GET_RANKING_REQUEST_ROLLBACK] = getActionsNames('Ranking/GET_RANKING');