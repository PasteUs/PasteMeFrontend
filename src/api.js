import axios from 'axios'

export default {
    get: function(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                alert(url + '\n' + JSON.stringify(error));
                reject(error);
            });
        });
    },
    post: function(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, params).then(response => {
                resolve(response.data);
            }).catch(error => {
                alert(url + '\n' + JSON.stringify(error));
                reject(error);
            });
        });
    },
    put: function(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.put(url, params).then(response => {
                resolve(response.data);
            }).catch(error => {
                alert(url + '\n' + JSON.stringify(error));
                reject(error);
            });
        });
    }
}
