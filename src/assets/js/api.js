import axios from 'axios'

function getLast(value) {
    return value[value.length - 1];
}

/**
 * 判断是否属于后端已定义的返回值
 * @param error
 * @returns boolean
 */
function validator(error) {
    return error.response && error.response.data && error.response.data.code &&
        error.response.data.message && typeof error.response.data.code === 'number' &&
        error.response.data.code > 20000;
}

function defaultErrorHandler(error, alert_error = true) {
    if (alert_error) {
        if (validator(error)) {
            let data = error.response.data;
            alert(data.code + ': ' + data.message);
        } else {
            alert(JSON.stringify({
                message: error.message,
                method: error.config.method,
                url: error.config.url,
                params: error.config.params
            }))
        }
    }
}

function wrapper(func) {
    return function (url, params = {}, acceptedCode = [], errorHandler = defaultErrorHandler) {
        return new Promise((resolve, reject) => {
            func(url, params).then(response => {
                resolve(response.data);
            }).catch(error => {
                if (validator(error)) {
                    let data = error.response.data;
                    if (acceptedCode.includes(data.code)) {
                        resolve(data)
                        return
                    }
                }
                errorHandler(error);
                reject(error);
            });
        });
    }
}

export default {
    get: wrapper(function (url, params) {
        return axios.get(url, {
            params: params,
            headers: {
                'Accept': 'application/json'
            }
        })
    }),
    post: wrapper(axios.post),
    put: wrapper(axios.put),
    delete: wrapper(axios.delete),
    patch: wrapper(axios.patch),
    join: function (...args) {
        let result = args.map(pathPart => pathPart.replace(/(^\/|\/$)/g, "")).join("/");
        return result + (getLast(getLast(args)) === '/' ? '/' : '');
    },

}
