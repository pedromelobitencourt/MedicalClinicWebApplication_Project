import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import AddressRegistration from './components/AddressRegistration.vue';
import Handbook from './components/Handbook.vue';
import HandbookCreate from './components/HandbookCreate.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/address', component: AddressRegistration },
        { path: '/handbook', name: 'handbook' , component: Handbook },
        { path: '/handbook/create', component: HandbookCreate }
    ]
})