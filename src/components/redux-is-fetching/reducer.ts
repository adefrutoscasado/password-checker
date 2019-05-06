import {COMMIT, getActionRoot, REQUEST, ROLLBACK} from './action-types';
import {FetchingState} from './types';
import {AnyAction} from 'redux';

export const initialState: FetchingState = {
    isFetching: [],
    results: {},
};

export default function (state = initialState, action: AnyAction) {
    // Updating fetching in the state
    const actionName = action.type;
    const actionRoot = getActionRoot(actionName);
    if (actionName.endsWith(COMMIT) || actionName.endsWith(ROLLBACK)) {
        // Filtering out the action from isFetching array (by the root of the action's name
        //Add action result to
        return {
            ...state,
            isFetching: state.isFetching.filter(a => a !== actionRoot),
            results: {
                ...state.results,
                [actionRoot]: {
                    success: actionName.endsWith(COMMIT),
                    message: action.payload && action.payload.message
                }
            }
        };
    } else if (actionName.endsWith(REQUEST) && !state.isFetching.includes(actionRoot)) {
        // Add fetch loading
        const results = {...state.results};
        //Remove previous action result
        delete results[actionRoot];
        return {
            ...state,
            isFetching: [...state.isFetching, actionRoot],
            results: results
        };
    }
    // Not a request action
    return state;
}