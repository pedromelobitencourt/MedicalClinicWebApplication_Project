<template>
    <div class="endereco-wrapper container">
        <div class="card">
            <div class="card-header">
                <h4>
                    Endereço
                    <router-link to="/address/create" class="btn btn-primary float-end">
                        Add Endereço
                    </router-link>
                </h4>
            </div>
            <div class="card-body table-container">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="max-width">CEP</th>
                            <th class="max-width">Estado</th>
                            <th class="max-width">Cidade</th>
                            <th class="max-width">Bairro</th>
                            <th class="min-width">Logradouro</th>
                        </tr>
                    </thead>

                    <tbody v-if="enderecos.length > 0">
                        <tr v-for="(endereco, index) in enderecos" :key="index">
                            <td class="max-width"> {{endereco.cep}} </td>
                            <td class="max-width"> {{endereco.estado}} </td>
                            <td class="max-width2"> {{endereco.cidade}} </td>
                            <td class="max-width2"> {{endereco.bairro}} </td>
                            <td class="max-width2"> {{endereco.logradouro}} </td>
                            <td class="min-width">
                                <button type="button" @click="deleteEndereco(endereco.cep)" class="btn btn-danger float-end">
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
    name: 'endereco',
    data() {
        return {
            enderecos: [],
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 0,
        }
    },
    mounted() {

        this.getEnderecos();
    },
    methods: {
        getEnderecos() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;

            console.log(startIndex, endIndex);
            console.log("chegou axios");
            axios.get('http://localhost:8000/address')
                .then(res => {
                    console.log(res.data.response);
                    this.totalItems = res.data.response.length;
                    this.enderecos = res.data.response.slice(startIndex, endIndex);
                    //console.log()
                })
        },
        changePage(offset) {
            this.currentPage += offset;
            this.getEnderecos();
        },
        deleteEndereco(cep) {
            console.log("chegou axios delete");
            if(confirm('Você tem certeza que quer deletar tal registro?')){
                console.log("chegou axios delete");
                axios.delete(`http://localhost:8000/address/${cep}`)
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
    .endereco-wrapper {
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