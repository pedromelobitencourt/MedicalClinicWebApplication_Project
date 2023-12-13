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

        <form  @submit.prevent="editPerson" class="container">
            <div class="card">
                <div class="card-header">
                    <h4>Editar Pessoa</h4>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label for="">Pessoa</label>
                        <input type="text" v-model="model.person.nome" name="" id="" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="">Email</label>
                        <input type="email" v-model="model.person.email" name="" id="" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="">Telefone</label>
                        <input type="tel"
                        v-model="model.person.telefone"
                        pattern="[0-9]{9}"
                        class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="">CEP</label>
                        <select required v-model="selectedOption" id="selectedOption" ref="selectedOption" class="block mt-1 w-100">
                            <option value="" selected>-- Escolha uma opção --</option>
                            <option value="" selected>-- Se não houver opção, não há ceps cadastrados --</option>
                            <option v-for="cep in options" :key="cep.cep" :value="cep.cep">
                            {{ cep.cep }}
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
    name: 'PersonEdit',
    data() {
        return {
            errorList: null,
            model: {
                person: {
                    id: '',
                    nome: '',
                    email: '',
                    telefone: '',
                    enderecoCep: null,
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
        this.fetchOptions();
        this.getPersonData(this.$route.params.id)
    },
    methods: {
        async getPersonData(id) {
            console.log(id);
            await axios.get(`http://localhost:8000/person/${id}/edit`)
                .then(res => {
                    const data = res.data.response;
                    this.model.person.id = data.id;
                    this.model.person.nome = data.name;
                    this.model.person.email = data.email;
                    this.model.person.telefone = data.telefone;
                    this.model.person.enderecoCep = data.enderecoCep;

                    const index = this.options.findIndex(option => option.cep === data.enderecoCep);
                    if (index !== -1) {
                        // Definir selectedOption com base no índice encontrado
                        this.selectedOption = this.options[index].cep;
                        console.log("OPCAO", this.selectedOption)
                    } else {
                        // Lidar com o caso em que a opção não foi encontrada
                        console.error('Opção não encontrada:', data.enderecoCep);
                    }
                });
        },

        async editPerson() {
            var myThis = this;
            console.log("person", this.model.person);

            const cep = this.options[this.$refs.selectedOption.selectedIndex - 2].cep;
            this.model.person.enderecoCep = cep;
            console.log('Person saved:', this.model.person);

            await axios.put(`http://localhost:8000/person/${this.model.person.id}/edit`, this.model.person)
                .then(res => {
                    console.log(res.data);

                    this.model.employee = {
                        id: '',
                        pessoaId: '',
                        name: '',
                        salario: '',
                        dataContrato: null,
                    }


                    this.registerMessage("Pessoa editada com sucesso");
                    
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
                });
        },

        async fetchOptions() {
            try {
                const response = await axios.get('http://localhost:8000/ceps');
                this.options = response.data.response;
                console.log("options", this.options);
            } catch (error) {
                console.error('cep creation: ', error);
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
            router.push('/people');
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