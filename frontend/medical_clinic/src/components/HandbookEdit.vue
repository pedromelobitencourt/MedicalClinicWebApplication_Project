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

        <form  @submit.prevent="editHandbook" class="container">
            <div class="card">
                <div class="card-header">
                    <h4>Editar Prontuário</h4>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="">Paciente</label>
                        <select required v-model="selectedOption" ref="selectedOption" class="block mt-1 w-100">
                            <option value="" selected>-- Escolha uma opção --</option>
                            <option v-for="pacient in options" :key="pacient.id" :value="pacient.id">
                                {{ pacient.name }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="">Anamnese</label>
                        <input type="text" v-model="model.handbook.anamnese" id="" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="">Medicamentos</label>
                        <input type="text" v-model="model.handbook.medicamentos" name="" id="" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="">Atestados</label>
                        <input type="text" v-model="model.handbook.atestados" name="" id="" class="form-control">
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
    name: 'HandbookEdit',
    data() {
        return {
            errorList: null,
            model: {
                handbook: {
                    anamnese: '',
                    medicamentos: '',
                    atestados: '',
                    name: null
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

        this.getHandbookData(this.$route.params.id)
    },
    methods: {
        async getHandbookData(id) {
            await axios.get(`http://localhost:8000/handbook/${id}/edit`)
                .then(res => {
                    const data = res.data.response;
                    this.model.handbook.anamnese = data.anamnese;
                    this.model.handbook.medicamentos = data.medicamentos;
                    this.model.handbook.atestados = data.atestados;
                    const index = this.options.findIndex(option => option.name === data.nome);

                    if (index !== -1) {
                        // Definir selectedOption com base no índice encontrado
                        this.selectedOption = this.options[index].id;
                    } else {
                        // Lidar com o caso em que a opção não foi encontrada
                        console.error('Opção não encontrada:', data.nome);
                    }

                })
        },

        async editHandbook() {
            var myThis = this;

            const name = this.options[this.$refs.selectedOption.selectedIndex - 1].name;
            this.model.handbook.name = name;
            this.model.handbook.id = this.$route.params.id;

            await axios.put(`http://localhost:8000/handbook/${this.model.handbook.id}/edit`, this.model.handbook)
                .then(res => {
                    console.log(res.data);

                    this.model.handbook = {
                        anamnese: '',
                        medicamentos: '',
                        atestados: '',
                        name: null,
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
      },
        closeMessage() {
            this.toggleMessage();
            router.push('/handbook');
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