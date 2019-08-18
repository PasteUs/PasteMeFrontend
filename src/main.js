import Vue from 'vue'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import clipboard from 'clipboard'
import BootstrapVue from 'bootstrap-vue'

import App from './App.vue'
import router from './assets/js/router'
import store from './assets/js/store'
import i18n from './assets/js/i18n'
import api from './assets/js/api'
import markdownIt from './assets/js/external/markdownIt'

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

Vue.prototype.markdown = markdownIt;

Vue.component('QRCode', VueQrcode);
Vue.component('font-awesome-icon', FontAwesomeIcon);

api.get('/usr/config.json').then(response => {
    store.state.config = response;
    return  api.get(store.state.config.api, {method: "beat"});
}).then(() => {
    return new Vue({
        store,
        i18n,
        router,
        render: h => h(App)
    }).$mount('#app');
});
