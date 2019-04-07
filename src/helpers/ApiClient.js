import Config from '../constants/Config'

export default class ApiClient {

    static async requestRegisterUser (email, password, confirmPassword) {
    const data = {
        email,
        password,
        confirmPassword
    };
    return ApiClient.fetch(Config.api.getPath('/auth/register'), 'POST', data)
    }

    static async requestGetPlatforms () {
        return ApiClient.fetch(Config.api.getPath('/platforms'), 'GET')
    }

    static async requestSubmitPassword (userId, platformId, password, score) {
        const data = {
            password,
            score,
        };
        return ApiClient.fetch(Config.api.getPath(`/users/${userId}/platform/${platformId}/password`), 'POST', data)
    }

    static async fetch(path, method = 'GET', params = {}) {
    let response;
    let json;

    const finalUrl = path + '?' + (Math.random() + new Date().getTime());

    const requestParams = {
        method,
        headers: ApiClient.getHeaders(),
        cache: 'no-cache' //https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
    };
    if (method === 'POST' || method === 'PUT') {
        requestParams.body = JSON.stringify(params);
    }
    response = await fetch(finalUrl, requestParams);
    json = await response.json();
    if (Config.api.SUCCESS_STATUS.includes(response.status) && response.ok) {
        return json;
    }
    throw new Error(json.message);

    }

    static getHeaders() {
        return {
            'Cache-Control': 'no-cache',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

}