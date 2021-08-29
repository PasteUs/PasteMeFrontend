import axios from 'axios'

function getLast(value) {
    return value[value.length - 1];
}

export default {
    get: function (url, params = {}, alert_error = true) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                if (alert_error) {
                    alert('GET: ' + url + '\n' + JSON.stringify(error));
                }
                reject(error);
            });
        });
    },
    post: function (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, params).then(response => {
                resolve(response.data);
            }).catch(error => {
                alert('POST: ' + url + '\n' + JSON.stringify(error));
                reject(error);
            });
        });
    },
    put: function (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.put(url, params).then(response => {
                resolve(response.data);
            }).catch(error => {
                alert('PUT: ' + url + '\n' + JSON.stringify(error));
                reject(error);
            });
        });
    },
    join: function (...args) {
        let result = args.map(pathPart => pathPart.replace(/(^\/|\/$)/g, "")).join("/");
        return result + (getLast(getLast(args)) === '/' ? '/' : '');
    }
}
