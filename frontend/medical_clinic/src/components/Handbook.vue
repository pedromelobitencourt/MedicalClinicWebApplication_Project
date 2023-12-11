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
                            <th>Nome</th>
                            <th>Anamnese</th>
                            <th>Medicamentos</th>
                            <th>Atestados</th>
                            <th>Ação</th>
                        </tr>
                    </thead>

                    <tbody v-if="handbooks.length > 0">
                        <tr v-for="(handbook, index) in handbooks" :key="index">
                            <td> {{handbook.id}} </td>
                            <td> {{handbook.name}} </td>
                            <td> {{handbook.anamnese}} </td>
                            <td> {{handbook.medicamentos}} </td>
                            <td> {{handbook.atestados}} </td>
                            <td>
                                <router-link to="/" class="btn btn-success float-end">
                                    Editar
                                </router-link>
                                <button type="button" class="btn btn-danger float-end">Deletar</button>
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
    mounted() {

        this.getHandbooks();
    },
    methods: {
        getHandbooks() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;

            axios.get('http://localhost:8000/handbook')
                .then(res => {
                    this.totalItems = res.data.response.length;
                    this.handbooks = res.data.response.slice(startIndex, endIndex);
                })
        },
        changePage(offset) {
            this.currentPage += offset;
            this.getHandbooks();
        }
    }
}
</script>


<style>
.container {
    align-items: stretch;
}
    .handbook-wrapper {
        margin-top: 20px;
        width: 100%;
        flex: 1;
        height: 100%;
    }

    .table-container {
        overflow-y: hidden; /* Adicione uma barra de rolagem vertical quando necessário */
        max-height: calc(100vh - 100px);
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

</style>