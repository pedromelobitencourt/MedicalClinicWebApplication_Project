<template>
    <div class="handbook-wrapper container">
        <div class="card">
            <div class="card-header">
                <h4>
                    Funcionários
                    <router-link to="/employees/create" class="btn btn-primary float-end">
                        Add Funcionário
                    </router-link>
                </h4>
            </div>
            <div class="card-body table-container">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th class="max-width">Nome</th>
                            <th class="max-width">Salário</th>
                            <th class="max-width">Data de Contrato</th>
                            <th class="min-width">Ação</th>
                        </tr>
                    </thead>

                    <tbody v-if="employees.length > 0">
                        <tr v-for="(employee, index) in employees" :key="index">
                            <td> {{employee.id}} </td>
                            <td class="max-width2"> {{employee.name}} </td>
                            <td class="max-width"> {{employee.salario}} </td>
                            <td class="max-width2"> {{employee.dataContrato}} </td>
                            <td class="min-width">
                                <router-link :to="{ path: '/employees/'+employee.id+'/edit' }" class="btn btn-success float-end">
                                    Editar
                                </router-link>
                                <button type="button" @click="deleteEmployee(employee.id)" class="btn btn-danger float-end">
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
    name: 'EmployeesView',
    data() {
        return {
            employees: [],
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 0,
        }
    },
    mounted() {

        this.getEmployees();
    },
    methods: {
        async getEmployees() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;

            await axios.get('http://localhost:8000/employees')
                .then(res => {
                    const formattedData = res.data.response.map(employee => {
                    const formattedDate = new Date(employee.dataContrato).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        timeZone: 'UTC', // ajuste conforme necessário
                    });

                    const formattedSalary = parseFloat(employee.salario).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 2,
                    });

                    return {
                        ...employee,
                        dataContrato: formattedDate,
                        salario: formattedSalary,
                        // Adicione outras formatações conforme necessário
                    };
                    });

                    console.log("Employees", formattedData);
                    this.totalItems = formattedData.length;
                    this.employees = formattedData.slice(startIndex, endIndex);
                })
                .catch(error => {
                    console.error("Error fetching employees", error);
                });
        },
        changePage(offset) {
            this.currentPage += offset;
            this.getEmployees();
        },
        async deleteEmployee(id) {
            console.log("O ID", id)
            if(confirm('Você tem certeza que quer deletar tal registro?')){
                await axios.delete(`http://localhost:8000/employees/${id}/delete`)
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