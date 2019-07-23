import Vue from 'vue'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import clipboard from 'clipboard'
import BootstrapVue from 'bootstrap-vue'

import App from './App.vue'
import router from './assets/js/router'
import store from './assets/js/store'
import i18n from './assets/js/i18n'
import api from './assets/js/api'
import hljs from './assets/js/hljs'

import './assets/js/daovoice.object'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/css/global.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGlobeAsia } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGlobeAsia);

let VueCookie = require('vue-cookie');
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueCookie);
Vue.prototype.clipboard = clipboard;
Vue.prototype.api = api;

Vue.prototype.markdown = require('markdown-it')({
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (error) {
                alert(JSON.stringify(error));
            }
        }
        return '<pre class="hljs"><code>' + this.utils.escapeHtml(str) + '</code></pre>';
    },
    linkify: true,
    typographer: true
}).use(require('markdown-it-task-checkbox'), {
    disabled: true,
    divWrap: false,
    divClass: 'checkbox',
    idPrefix: 'cbx_',
    ulClass: 'task-list',
    liClass: 'task-list-item'
});

Vue.component('QRCode', VueQrcode);
Vue.component('font-awesome-icon', FontAwesomeIcon);

(async function () {
    await (function() {
        return new Promise ((resolve, reject) => {
            api.get('usr/config.json').then(response => {
                store.state.config = response;
                resolve();
            }).catch(error => {
                reject(error);
            })
        })
    })();
    api.head(store.state.config.api);
    new Vue({
        store,
        i18n,
        router,
        render: h => h(App)
    }).$mount('#app');
})();
