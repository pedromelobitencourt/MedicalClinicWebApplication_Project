<template>
    <div class="handbook-wrapper container">
        <div class="card">
            <div class="card-header">
                <h4>
                    Prontuário
                    <router-link to="/handbook/create" class="btn btn-primary float-end">
                        Add Prontuário
                    </router-link>
                </h4>
            </div>
            <div class="card-body table-container">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th class="max-width">Nome</th>
                            <th class="max-width">Anamnese</th>
                            <th class="max-width">Medicamentos</th>
                            <th class="max-width">Atestados</th>
                            <th class="min-width">Ação</th>
                        </tr>
                    </thead>

                    <tbody v-if="handbooks.length > 0">
                        <tr v-for="(handbook, index) in handbooks" :key="index">
                            <td> {{handbook.id}} </td>
                            <td class="max-width2"> {{handbook.name}} </td>
                            <td class="max-width2"> {{handbook.anamnese}} </td>
                            <td class="max-width2"> {{handbook.medicamentos}} </td>
                            <td class="max-width2"> {{handbook.atestados}} </td>
                            <td class="min-width">
                                <router-link :to="{ path: '/handbook/'+handbook.id+'/edit' }" class="btn btn-success float-end">
                                    Editar
                                </router-link>
                                <button type="button" @click="deleteHandbook(handbook.id)" class="btn btn-danger float-end">
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
    name: 'handbook',
    data() {
        return {
            handbooks: [],
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 0,
        }
    },
    created() {
        const user = JSON.parse(localStorage.getItem('user'));
        this.isLoggedIn = !!user; // Define isLoggedIn como true se o usuário estiver logado
        console.log("Ta logado", this.isLoggedIn);

        if(!this.isLoggedIn) {
            this.$router.push('/login')
        }
    },
    mounted() {
        this.getHandbooks();
    },
    methods: {
        async getHandbooks() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;

            await axios.get('http://localhost:8000/handbook')
                .then(res => {
                    this.totalItems = res.data.response.length;
                    this.handbooks = res.data.response.slice(startIndex, endIndex);
                })
        },
        changePage(offset) {
            this.currentPage += offset;
            this.getHandbooks();
        },
        async deleteHandbook(id) {
            if(confirm('Você tem certeza que quer deletar tal registro?')){
                await axios.delete(`http://localhost:8000/handbook/${id}/delete`)
                    .then(res => {
                        const message = res.data.message;
                        alert(message);
                        this.$router.go();
                    })
                    .catch(error => {
                        alert(error.message);
                    });
            }
        },
        logout() {
            localStorage.removeItem('user');
            this.isLoggedIn = false;
            console.log(this.isLoggedIn);
            this.$router.push('/login');
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