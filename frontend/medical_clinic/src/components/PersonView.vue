<template>
    <div class="handbook-wrapper container">
        <div class="card">
            <div class="card-header">
                <h4>
                    Pessoas Cadastradas
                    <router-link to="/person/create" class="btn btn-primary float-end">
                        Add Pessoa
                    </router-link>
                </h4>
            </div>
            <div class="card-body table-container">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th class="max-width">Nome</th>
                            <th class="max-width">Email</th>
                            <th class="max-width">Telefone</th>
                            <th class="max-width">CEP</th>
                            <th class="min-width">Ação</th>
                        </tr>
                    </thead>

                    <tbody v-if="people.length > 0">
                        <tr v-for="(person, index) in people" :key="index">
                            <td> {{person.id}} </td>
                            <td class="max-width2"> {{person.name}} </td>
                            <td class="max-width2"> {{person.email}} </td>
                            <td class="max-width"> {{person.telefone}} </td>
                            <td class="max-width"> {{person.enderecoCep}} </td>
                            <td class="min-width">
                                <router-link :to="{ path: '/person/'+person.id+'/edit' }" class="btn btn-success float-end">
                                    Editar
                                </router-link>
                                <button type="button" @click="deletePerson(person.id)" class="btn btn-danger float-end">
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
    name: 'PeopleView',
    data() {
        return {
            people: [],
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 0,
        }
    },
    mounted() {

        this.getPeople();
    },
    methods: {
        async getPeople() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;

            await axios.get('http://localhost:8000/people')
                .then(res => {
                    this.people = res.data.response
                    this.totalItems = this.people.length;
                    this.people = this.people.slice(startIndex, endIndex);
                    console.log(res.data);
                })
                .catch(error => {
                    console.error("Error fetching employees", error);
                });

            
        },
        changePage(offset) {
            this.currentPage += offset;
            this.getPeople();
        },
        async deletePerson(id) {
            console.log("O ID", id)
            if(confirm('Você tem certeza que quer deletar tal registro?')){
                await axios.delete(`http://localhost:8000/person/${id}/delete`)
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
        max-width: 60px;
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