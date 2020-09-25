import configProvider from '../providers/configProvider';

const ApiService = {};

ApiService.apiFetch = (method, path, body = undefined, headers = {}) => {

    let bodyToSend = null;
    if (body) {
        bodyToSend = JSON.stringify(body);
    } else if (body === null) {
        bodyToSend = 'null';
    } else if (body === false) {
        bodyToSend = 'false';
    } else {
        bodyToSend = null;
    }
    const apiUrl = configProvider.get().apiUrl;

    const myHeaders = {
        'Content-Type': 'application/json'
    };

    return fetch(`http://${apiUrl}${path}`, {
        body: bodyToSend,
        cache: 'no-store',
        headers: myHeaders,
        method
    }).then((response) => {
        if (response.status >= 400 && response.status <= 599) {
            throw new Error(response);
        }
        return response;
    });
};

export default ApiService;
