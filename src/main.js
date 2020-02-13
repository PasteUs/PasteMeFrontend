import Vue from 'vue'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import clipboard from 'clipboard'
import BootstrapVue from 'bootstrap-vue'

import App from './App.vue'
import router from './assets/js/router'
import store from './assets/js/store'
import i18n from './assets/js/i18n'
import api from './assets/js/api'
import markdownIt from './assets/js/external/markdown-it'
import DirectiveRegister from './assets/js/event/directive-register'

import '@/assets/css/global.css'

let VueCookie = require('vue-cookie');
DirectiveRegister(Vue);
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueCookie);
Vue.prototype.clipboard = clipboard;
Vue.prototype.api = api;

Vue.prototype.markdown = markdownIt;

Vue.component('QRCode', VueQrcode);

api.get('/usr/config.json').then(response => {
    store.state.config = response;
    return  api.get(store.state.config.backendApi, {method: "beat"});
}).then(() => {
    return new Vue({
        store,
        i18n,
        router,
        render: h => h(App)
    }).$mount('#app');
});
