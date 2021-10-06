import axios from 'axios'

function getLast(value) {
    return value[value.length - 1];
}


export default {
    get: function (url, params = {}, acceptedCode = [], errorHandler = this.errorHandler) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                if (this.validator(error)) {
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
    },
    post: function (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, params).then(response => {
                resolve(response.data);
            }).catch(error => {
                this.errorHandler(error);
                reject(error);
            });
        });
    },
    put: function (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.put(url, params).then(response => {
                resolve(response.data);
            }).catch(error => {
                this.errorHandler(error);
                reject(error);
            });
        });
    },
    join: function (...args) {
        let result = args.map(pathPart => pathPart.replace(/(^\/|\/$)/g, "")).join("/");
        return result + (getLast(getLast(args)) === '/' ? '/' : '');
    },
    /**
     * 判断是否属于后端已定义的返回值
     * @param error
     * @returns boolean
     */
    validator: function (error) {
        return error.response && error.response.data && error.response.data.code &&
            error.response.data.message && typeof error.response.data.code === 'number' &&
            error.response.data.code > 20000;

    },
    errorHandler: function (error, alert_error = true) {
        if (alert_error) {
            if (this.validator(error)) {
                alert(JSON.stringify(error.response.data))
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
}
