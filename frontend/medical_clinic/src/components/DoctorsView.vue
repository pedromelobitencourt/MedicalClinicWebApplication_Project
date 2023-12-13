<template>
    <div class="handbook-wrapper container">
        <div class="card">
            <div class="card-header">
                <h4>
                    Médicos
                </h4>
            </div>
            <div class="card-body table-container">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th class="max-width">Nome</th>
                            <th class="max-width">CRM</th>
                            <th class="max-width">Especialidade</th>
                            <th class="min-width">Ação</th>
                        </tr>
                    </thead>

                    <tbody v-if="doctors.length > 0">
                        <tr v-for="(doctor, index) in doctors" :key="index">
                            <td> {{doctor.id}} </td>
                            <td class="max-width2"> {{doctor.nomeMedico}} </td>
                            <td class="max-width"> {{doctor.crm}} </td>
                            <td class="max-width2"> {{doctor.especialidade}} </td>

                                <td v-if="currentDoctorId === doctor.id" class="min-width">
                                    <router-link :to="{ path: '/doctor/'+doctor.id+'/view' }" class="btn btn-success float-end">
                                        Visualizar
                                    </router-link>
                                </td>
                        </tr>
                    </tbody>

                    <tbody v-else>
                        <tr>
                            <td colspan="4">Loading...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="pagination-container d-flex justify-content-center">
            <button @click="changePage(-1)" :disabled="currentPage === 1" class="btn btn-secondary">Anterior</button>
            <span id="pagSpan" class="my-auto">Página {{ currentPage }}</span>
            <button @click="changePage(1)" :disabled="currentPage * itemsPerPage >= totalItems" class="btn btn-secondary">Próxima</button>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';

export default {
    name: 'DoctorsView',
    data() {
        return {
            doctors: [],
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 0,
            isLoggedIn: false,
            isADoctor: false,
            currentDoctorId: null
        }
    },
    async created() {
        const user = JSON.parse(localStorage.getItem('user'));
        this.isLoggedIn = !!user; // Define isLoggedIn como true se o usuário estiver logado
        console.log("Ta logado", user);

        if(!this.isLoggedIn) {
            this.$router.push('/login')
        }

        this.isADoctor = await this.isDoctor(user.id);
        console.log("doctor", this.isADoctor)
        this.getDoctors();
    },
    methods: {
        async getDoctors() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;

            await axios.get('http://localhost:8000/medicos')
                .then(res => {
                    const data = res.data;
                    this.totalItems = data.length;
                    this.doctors = data.slice(startIndex, endIndex);
                    console.log(data);
                })
                .catch(error => {
                    console.error("Error fetching employees", error);
                });
        },
        changePage(offset) {
            this.currentPage += offset;
            this.getDoctors();
        },
        logout() {
            localStorage.removeItem('user');
            this.isLoggedIn = false;
            console.log(this.isLoggedIn);
            this.$router.push('/login');
        },
        async isDoctor(id) {
            console.log("id", id);
            await axios.post('http://localhost:8000/employees/isDoctor', JSON.parse(localStorage.getItem('user')))
                .then(res => {
                    const data = res.data;
                    console.log("isdoctor", data)
                    this.isADoctor = data;

                    if(this.isADoctor) {
                        this.currentDoctorId = data.doctorId[0].idMedico;
                        console.log("eeh medico", this.currentDoctorId)
                    }
                })
        }
    }
}
</script>


<style>
.container {
    align-items: stretch;
}
    .handbook-wrapper {
        margin: 20px 150px 0px 150px;
        width: 100%;
        flex: 1;
        height: 100%;
        padding: 0;
    }

    .table-container {
        overflow-y: hidden; /* Adicione uma barra de rolagem vertical quando necessário */
        max-height: calc(100vh - 100px);
    }

    .card {
        width: 100%;
    }

    .max-width {
        max-width: 100px;
    }
    .max-width2 {
        max-width: 250px;
    }

    .pagination-container {
        margin-top: 10px; /* Adicione espaçamento acima dos botões */
    }

    .btn-next {
        margin-left: 10px; /* Adicione espaçamento entre os botões */
    }
    #pagSpan {
        margin-right: 15px;
        margin-left: 15px;
    }
    .min-width {
        min-width: 100px;
    }

    th {
        text-align: center;
    }

</style>