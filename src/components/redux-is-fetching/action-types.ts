/**
 * Request actions must end with _REQUEST
 * Succeded request actions must end with _COMMIT
 * Failed request actions must end with _ROLLBACK
 */

export const COMMIT = '_COMMIT';
export const ROLLBACK = '_ROLLBACK';
export const REQUEST = '_REQUEST';

export function getRequestName(name: string) {
    return name + REQUEST;
}

export function getCommitName(name: string) {
    return name + REQUEST + COMMIT;
}

export function getRollbackName(name: string) {
    return name + REQUEST + ROLLBACK;
}

export function getActionsNames(name: string) {
    return [
        getRequestName(name),
        getCommitName(name),
        getRollbackName(name)
    ];
}

export const getActionRoot = (actionType: string) => actionType.replace(COMMIT, '').replace(ROLLBACK, '');
