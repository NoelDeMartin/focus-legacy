import Vue from 'vue';
import Vuetify from 'vuetify';

import Login from './pages/Login.vue';

Vue.use(Vuetify);

Vue.component('page-login', Login);

const app = new Vue();

app.$mount('#app');
