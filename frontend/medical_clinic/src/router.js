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
import PhotoPage from './components/PhotoPage.vue';
import EmployeesView from './components/EmployeesView.vue';
import EmployeesCreate from './components/EmployeesCreate.vue';
import EmployeesEdit from './components/EmployeesEdit.vue';
import PersonCreate from './components/PersonCreate.vue';
import PersonView from './components/PersonView.vue';
import PersonEdit from './components/PersonEdit.vue';
import PacienteCreate from './components/PacienteCreate.vue';
import Paciente from './components/Paciente.vue';
import PacienteEdit from './components/PacienteEdit.vue';
import DoctorsView from './components/DoctorsView.vue';

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
        { path: '/scheduling', component: AppointmentScheduling },
        { path: '/photo', component: PhotoPage },
        { path: '/employees', component: EmployeesView },
        { path: '/employees/create', component: EmployeesCreate },
        { path: '/employees/:id/edit', component: EmployeesEdit },
        { path: '/people', component: PersonView },
        { path: '/person/create', component: PersonCreate },
        { path: '/person/:id/edit', component: PersonEdit },
        { path: '/scheduling', component: AppointmentScheduling },
        { path: '/paciente/create', component: PacienteCreate },
        { path: '/paciente', component: Paciente },
        { path: '/paciente/:id/edit', component: PacienteEdit },
        { path: '/doctors', component: DoctorsView },
    ] 
})