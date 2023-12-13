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
        <form  @submit.prevent="savePaciente" class="container">
        <div class="card">
            <div class="card-header">
                <h4>Cadastrar Paciente</h4>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="">Pessoa</label>
                    <select required v-model="selectedOption1" ref="selectedOption1" class="block mt-1 w-100">
                        <option value="" selected>-- Escolha uma opção --</option>
                        <option v-for="pessoa in options1" :key="pessoa.id" :value="pessoa.id">
                            {{ pessoa.name }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="">Peso</label>
                    <input type="number" step=".01" v-model="model.paciente.peso" id="" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Altura</label>
                    <input type="number" step=".01" v-model="model.paciente.altura" name="" id="" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="">Tipo Sanguineo</label>
                    <select required v-model="selectedOption2" ref="selectedOption2" class="block mt-1 w-100">
                            <option value="" selected>-- Escolha uma opção --</option>
                            <option v-for="option in options2" :key="option.type">
                                {{ option.type }}
                            </option>
                    </select>
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
    name: 'PacienteCreate',
    data() {
        return {
            errorList: null,
            model: {
                paciente: {
                    peso: '',
                    altura: '',
                    tipoSanguineo: '',
                    pessoaId: null
                },
            },
            selectedOption: null,
            options1: [],
            options2: [],
        }
    },
    mounted() {
    },
    created() {
        const user = JSON.parse(localStorage.getItem('user'));
        this.isLoggedIn = !!user; // Define isLoggedIn como true se o usuário estiver logado
        console.log("Ta logado", this.isLoggedIn);

        if(!this.isLoggedIn) {
            this.$router.push('/login')
        }

        this.selectedOption1 = ''
        this.selectedOption2 = ''
        this.fetchOptions();
    },
    methods: {
        async savePaciente() {
            var myThis = this;

            const pessoaId = this.options1[this.$refs.selectedOption1.selectedIndex - 1].id;
            const tipoSanguineo = this.options2[this.$refs.selectedOption2.selectedIndex - 1].type;
            this.model.paciente.pessoaId = pessoaId;
            this.model.paciente.tipoSanguineo = tipoSanguineo;

            await axios.post('http://localhost:8000/pacientes', this.model.paciente)
                .then(res => {
                    if (res.status === 201) {
                        const msg = "Paciente cadastrado com sucesso";
                        this.registerMessage(msg);
                        
                    }
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
                console.log("Pessoa creation: ");
                const response1 = await axios.get('http://localhost:8000/pessoa');
                const response2 = await axios.get('http://localhost:8000/people/blood-types')
                this.options1 = response1.data;
                this.options2 = response2.data.bloodTypes;
                console.log("Pessoa End ");
                console.log(this.options2);
            }
            catch (error) {
                console.error("Pessoa creation: ", error);
            }
        },
        toggleMessage(msg) {
                this.$refs.message_p.innerText = msg;
                this.$refs.fade.classList.toggle("hide");
                this.$refs.message.classList.toggle("hide");
            },
        closeMessage() {
                this.toggleMessage();
                router.push('/paciente');
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
    /* Message */
    #fade {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
    }

    #fade .spinner-border {
        width: 60px;
        height: 60px;
    }

    .hide {
        display: none !important;
    }

    #message {
        width: 40%;
    }

    .alert.alert-light p {
        border-bottom: 1px solid #333;
        padding: 1.2em 0;
    }
</style>