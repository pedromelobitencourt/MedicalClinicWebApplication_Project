<template>
    <div>
        <form  @submit.prevent="editEmployee" class="container">
            <div class="card">
                <div class="card-header">
                    <h4>Editar Funcionário</h4>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="">Funcionário</label>
                        <select required v-model="selectedOption" ref="selectedOption" class="block mt-1 w-100" disabled>
                            <option value="" selected>-- Escolha uma opção --</option>
                            <option v-for="employee in options" :key="employee.id" :value="employee.id">
                                {{ employee.name }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="">Salario</label>
                        <input type="text" v-model="model.employee.salario" name="" id="" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="">Data de Contrato</label>
                        <v-date-picker 
                            v-model="model.employee.dataContrato"
                            dark
                            full-width
                            :value="model.employee.dataContrato"
                            class="custom-date-picker">
                        </v-date-picker>
                    </div>
                    <div class="mb-3">
                        <button type="submit" class="btn btn-primary w-100">Salvar</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'HandbookEdit',
    data() {
        return {
            errorList: null,
            model: {
                employee: {
                    id: '',
                    pessoaId: '',
                    name: '',
                    salario: '',
                    dataContrato: null,
                },
            },
            selectedOption: null,
            options: [],
        }
    },
    mounted() {
        this.fetchOptions(this.$route.params.id);
        this.getFuncionarioData(this.$route.params.id)
    },
    methods: {
        getFuncionarioData(id) {
            console.log(id);
            axios.get(`http://localhost:8000/employees/${id}/edit`)
                .then(res => {
                    const data = res.data.response;

                    this.model.employee.id = data.id;
                    this.model.employee.dataContrato = data.dataContrato.substr(0, 10);
                    this.model.employee.pessoaId = data.pessoaId;
                    this.model.employee.name = data.name;
                    this.model.employee.salario = data.salario.toFixed(2);

                    const index = this.options.findIndex(option => option.name === data.name);
                    if (index !== -1) {
                        // Definir selectedOption com base no índice encontrado
                        this.selectedOption = this.options[index].id;
                    } else {
                        // Lidar com o caso em que a opção não foi encontrada
                        console.error('Opção não encontrada:', data.nome);
                    }

                })
        },

        editEmployee() {
            var myThis = this;

            const name = this.options[this.$refs.selectedOption.selectedIndex - 1].name;
            this.model.employee.name = name;
            this.model.employee.id = this.$route.params.id;

            axios.put(`http://localhost:8000/employees/${this.model.employee.id}/edit`, this.model.employee)
                .then(res => {
                    console.log(res.data);

                    this.model.employee = {
                        id: '',
                        pessoaId: '',
                        name: '',
                        salario: '',
                        dataContrato: null,
                    }

                    this.$router.go();
                })
                .catch(function (error) {
                    if(error.response) {
                        if(error.response.status === 422) {
                            myThis.errorList = error.response.data.errors;
                        }
                    }
                    else if (error.request) {
                        console.log(error.request);
                    }
                    else {
                        console.log("Error:", error.message);
                    }
                })
        },
        async fetchOptions() {
            try {
                const response = await axios.get('http://localhost:8000/pacients/name');
                console.log("AHHAH", response)
                this.options = response.data.response;
            }
            catch (error) {
                console.error("Handbook creation: ", error);
            }
        },
    }
}
</script>

<style>
    .container {
        width: 100%;
        height: 100%
    }
</style>