import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import AddressRegistration from './components/AddressRegistration.vue';
import AddressList from './components/AddressList.vue';
import Handbook from './components/Handbook.vue';
import HandbookCreate from './components/HandbookCreate.vue';
import HandbookEdit from './components/HandbookEdit.vue';
import AppointmentScheduling from './components/AppointmentScheduling.vue';
import PacienteCreate from './components/PacienteCreate.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Login },
        { path: '/address', name: 'address' , component: AddressList },
        { path: '/address/create', component: AddressRegistration },
        { path: '/handbook', name: 'handbook' , component: Handbook },
        { path: '/handbook/create', component: HandbookCreate },
        { path: '/handbook/:id/edit', component: HandbookEdit },
        {path: '/scheduling', component: AppointmentScheduling},
        {path: '/paciente/create', component: PacienteCreate}
    ] 
})