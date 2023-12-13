<template>
    <div class="paciente-wrapper container" style="margin-bottom: 200px;">
        <div class="card">
            <div class="card-header">
                <h4>
                    Paciente
                    <router-link to="/paciente/create" class="btn btn-primary float-end">
                        Add Paciente
                    </router-link>
                </h4>
            </div>
            <div class="card-body table-container">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="max-width">Nome</th>
                            <th class="max-width">Peso</th>
                            <th class="max-width">Altura</th>
                            <th class="max-width">Tipo Sanguineo</th>
                            <th class="min-width">Ação</th>
                        </tr>
                    </thead>

                    <tbody v-if="pacientes.length > 0">
                        <tr v-for="(paciente, index) in pacientes" :key="index">
                            <td class="max-width"> {{paciente.name}} </td>
                            <td class="max-width2"> {{paciente.peso}} </td>
                            <td class="max-width2"> {{paciente.altura}} </td>
                            <td class="max-width2"> {{paciente.tipoSanguineo}} </td>
                            <td class="min-width">
                                <router-link :to="{ path: '/paciente/'+paciente.id+'/edit' }" class="btn btn-success float-end">
                                    Editar
                                </router-link>
                                <button type="button" @click="deletePaciente(paciente.id)" class="btn btn-danger float-end">
                                    Deletar
                                </button>
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
    name: 'paciente',
    data() {
        return {
            pacientes: [],
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 0,
        }
    },
    mounted() {

        this.getPacientes();
    },
    methods: {
        async getPacientes() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;

            await axios.get('http://localhost:8000/pacientes')
                .then(res => {
                    this.totalItems = res.data.length;
                    this.pacientes = res.data.slice(startIndex, endIndex);
                })
        },
        changePage(offset) {
            this.currentPage += offset;
            this.getPacientes();
        },
        async deletePaciente(id) {

            if(confirm('Você tem certeza que quer deletar tal registro?')){
                await axios.delete(`http://localhost:8000/pacientes/${id}`)
                    .then(res => {
                        const message = res.data.message;
                        alert(message);
                        this.$router.go();
                    })
                    .catch(error => {
                        alert(error.message);
                    });
            }
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