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
        <form  @submit.prevent="editPaciente" class="container">
        <div class="card">
            <div class="card-header">
                <h4>Editar Paciente</h4>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="">Nome</label>
                    <input type="text" readonly v-model="model.nome" id="" class="form-control">
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
                    <select required v-model="selectedOption" ref="selectedOption" class="block mt-1 w-100">
                            <option value="" selected>-- Escolha uma opção --</option>
                            <option v-for="option in options" :key="option.type">
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
    name: 'PacienteEdit',
    data() {
        return {
            errorList: null,
            model: {
                paciente: {
                    peso: '',
                    altura: '',
                    tipoSanguineo: ''
                },
                nome : ''
            },
            options: []
        }
    },
    mounted() {
        this.fetchOptions();
        this.getPacienteData(this.$route.params.id);
    },
    methods: {
        getPacienteData(id) {
            axios.get(`http://localhost:8000/paciente/${id}/edit`)
                .then(res => {
                    const data = res.data.response;
                    console.log(data);
                    this.model.nome = data.name;
                    console.log("Nome: ", this.model.nome);
                    this.model.paciente.peso = data.peso;
                    this.model.paciente.altura = data.altura;
                    this.model.paciente.tipoSanguineo = data.tipoSanguineo;

                    const index = this.options.findIndex(option => option.type === data.tipoSanguineo);
                    if (index !== -1) {
                        // Definir selectedOption com base no índice encontrado
                        this.selectedOption = this.options[index].type;
                        console.log("OPCAO", this.selectedOption)
                    } else {
                        // Lidar com o caso em que a opção não foi encontrada
                        console.error('Opção não encontrada:', data.nome);
                    }
                        })
        },

        editPaciente() {
            var myThis = this;

            const bloodType = this.options[this.$refs.selectedOption.selectedIndex - 1].type;
            this.model.paciente.tipoSanguineo = bloodType;
            console.log(this.model.paciente.tipoSanguineo)

            this.model.paciente.id = this.$route.params.id;

            axios.put(`http://localhost:8000/paciente/${this.model.paciente.id}/edit`, this.model.paciente)
                .then(res => {
                    if (res.status === 201) {
                        const msg = "Paciente editado com sucesso";
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
            },
        async fetchOptions() {
            await axios.get('people/blood-types')
                .then(res => {
                    this.options = res.data.bloodTypes;
                    console.log("blood", this.options)
                })
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