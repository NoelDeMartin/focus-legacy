import Vue from 'vue';
import Vuetify from 'vuetify';

import App from './App.vue';

import Login from './pages/Login.vue';

Vue.use(Vuetify);

Vue.component('focus-app', App);
Vue.component('page-login', Login);

const app = new Vue();

app.$mount('#app');
