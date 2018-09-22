import Vue from 'vue';
import Vuetify from 'vuetify';
import VueApollo from 'vue-apollo';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Home from '@/pages/Home.vue';
import Login from '@/pages/Login.vue';

Vue.use(Vuetify);
Vue.use(VueApollo);

Vue.component('page-home', Home);
Vue.component('page-login', Login);

const apolloProvider = new VueApollo({
    defaultClient: new ApolloClient({
        link: new HttpLink({ uri: 'http://kinko.test/store' }),
        cache: new InMemoryCache(),
        connectToDevTools: true,
    }),
});

const app = new Vue({
    provide: apolloProvider.provide(),
});

app.$mount('#app');
