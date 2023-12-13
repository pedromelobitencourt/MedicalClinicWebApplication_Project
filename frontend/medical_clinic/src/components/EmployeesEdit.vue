<template>
    <div>

        <div id="fade" class="hide" ref="fade">
            <div id="message" class="hide" ref="message">
                <div class="alert alert-light" role="alert">
                    <h4>Mensagem:</h4>
                    <p ref="message_p"></p>

                    <button id="close-message" class="btn btn-secondary" ref="close_button" @click="closeMessage">
                        Fechar
                    </button>
                </div>
            </div>
        </div>

        <form  @submit.prevent="editEmployee" class="container">
            <div class="card">
                <div class="card-header">
                    <h4>Editar Funcionário</h4>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="">Funcionário</label>
                        <input type="text" v-model="model.employee.name" name="" id="" class="form-control" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="">Salario</label>
                        <input type="text" v-model="model.employee.salario" name="" id="" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="">Senha</label>
                        <input type="text" v-model="model.employee.senha" name="" id="" class="form-control">
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
import router from '../router';

export default {
    name: 'EmployeeEdit',
    data() {
        return {
            errorList: null,
            model: {
                employee: {
                    id: '',
                    pessoaId: '',
                    name: '',
                    senha: '',
                    salario: '',
                    dataContrato: null,
                },
            },
            selectedOption: null,
            options: [],
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
        this.fetchOptions(this.$route.params.id);
        this.getFuncionarioData(this.$route.params.id)
    },
    methods: {
        async getFuncionarioData(id) {
            console.log(id);
            await axios.get(`http://localhost:8000/employees/${id}/edit`)
                .then(res => {
                    const data = res.data.response;

                    this.model.employee.id = data.id;
                    this.model.employee.dataContrato = data.dataContrato.substr(0, 10);
                    this.model.employee.pessoaId = data.pessoaId;
                    this.model.employee.name = data.name;
                    this.model.employee.salario = data.salario.toFixed(2);
                    this.model.employee.senha = data.senha;

                    console.log("dataaa", data)
                })
        },

        async editEmployee() {
            var myThis = this;

            this.model.employee.id = this.$route.params.id;

            await axios.put(`http://localhost:8000/employees/${this.model.employee.id}/edit`, this.model.employee)
                .then(res => {
                    console.log(res.data);

                    this.model.employee = {
                        id: '',
                        pessoaId: '',
                        name: '',
                        salario: '',
                        dataContrato: null,
                    }

                    this.registerMessage("Funcionário editado com sucesso")
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
                console.log("AHHAH", response.data)
                this.options = response.data.response;
            }
            catch (error) {
                console.error("Handbook creation: ", error);
            }
        },
        logout() {
            localStorage.removeItem('user');
            this.isLoggedIn = false;
            console.log(this.isLoggedIn);
            this.$router.push('/login');
        },
        toggleMessage(msg) {
          this.$refs.message_p.innerText = msg;
          this.$refs.fade.classList.toggle("hide");
          this.$refs.message.classList.toggle("hide");
          console.log("message");
      },
        closeMessage() {
            this.toggleMessage();
            router.push('/employees');
        },
        registerMessage(msg) {
            this.toggleMessage(msg);
            //this.resetFormValues();
        }
    }
}
</script>

<style>
    .container {
        width: 100%;
        height: 100%
    }
</style>