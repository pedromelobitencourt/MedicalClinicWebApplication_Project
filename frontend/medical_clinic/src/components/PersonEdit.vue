<template>
    <div>
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
    mounted() {
        this.getPersonData(this.$route.params.id)
        this.fetchOptions();
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
    }
}
</script>

<style>
    .container {
        width: 100%;
        height: 100%
    }
</style>