<template>
    <div class="agenda-wrapper container">
        <div class="card">
            <!-- <div class="card-header">
                <h4>
                    Paciente
                    <router-link to="/paciente/create" class="btn btn-primary float-end">
                        Add Paciente
                    </router-link>
                </h4>
            </div> -->
            <div class="card-body table-container">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="max-width">Nome</th>
                            <th class="max-width">Data</th>
                            <th class="max-width">Horário</th>
                            <th class="max-width">Email</th>
                            <th class="max-width">Telefone</th>
                        </tr>
                    </thead>

                    <tbody v-if="agendas.length > 0">
                        <tr v-for="(agenda, index) in agendas" :key="index">
                            <td class="max-width"> {{agenda.name}} </td>
                            <td class="max-width2"> {{dataFormatada(agenda.data)}} </td>
                            <td class="max-width2"> {{horaFormatada(agenda.data)}} </td>
                            <td class="max-width2"> {{agenda.email}} </td>
                            <td class="max-width2"> {{agenda.telefone}} </td>
                        </tr>
                    </tbody>

                    <tbody v-else>
                        <tr>
                            <td colspan="4">Não há consultas marcadas</td>
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
    name: 'agenda',
    data() {
        return {
            agendas: [],
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 0,
        }
    },
    async created() {
        const user = JSON.parse(localStorage.getItem('user'));
        this.isLoggedIn = !!user; // Define isLoggedIn como true se o usuário estiver logado
        console.log("Ta logado", this.isLoggedIn);
        console.log(user);
        

        if(!this.isLoggedIn) {
            this.$router.push('/login')
        } else {
            await axios.post('http://localhost:8000/employees/isDoctor', user)
                .then(res => {
                    console.log("Resposta do servidor", res.data);
                    console.log(res.data);
                    if(res.data.isDoctor) {
                        const id = res.data.doctorId[0];
                        const medicoId = id;
                        console.log(medicoId);
                        this.getAgendaMedico(medicoId);
                    }else {
                        this.$router.push('/login')
                    }
                        
            });
        }
      
    },
    // mounted() {

        
    // },
    methods: {
        async getAgendaMedico(medicoId) {
            const { idMedico } = medicoId;
            console.log(idMedico);
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;

            await axios.get(`http://localhost:8000/agendas/${idMedico}`, idMedico)
                .then(res => {
                    this.totalItems = res.data.length;
                    console.log(this.totalItems);
                    this.agendas = res.data.slice(startIndex, endIndex);
                    console.log(this.agendas);
                })
        },
        changePage(offset) {
            this.currentPage += offset;
            this.getAgendaMedico(this.medicoId.id);
        },
        dataFormatada(dataHora) {
            const optionsData = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const dataHoraTeste = new Date(dataHora);
            return dataHoraTeste.toLocaleDateString(undefined, optionsData);
        },
        horaFormatada(dataHora) {
            const optionsHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const dataHoraTeste = new Date(dataHora);
            return dataHoraTeste.toLocaleTimeString(undefined, optionsHora);
        },
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
        max-width: 200px;
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
        min-width: 150px;
    }

    th {
        text-align: center;
    }

</style>