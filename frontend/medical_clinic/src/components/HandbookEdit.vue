<template>
    <div>
        <form  @submit.prevent="saveHandbook" class="container">
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

export default {
    name: 'HandbookCreate',
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
    mounted() {
        this.fetchOptions();
    },
    methods: {
        saveHandbook() {
            var myThis = this;

            const name = this.options[this.$refs.selectedOption.selectedIndex - 1].name;
            console.log("O nome", name)
            this.model.handbook.name = name;

            axios.post('http://localhost:8000/handbook', this.model.handbook)
                .then(res => {
                    console.log(res.data);

                    this.model.handbook = {
                        anamnese: '',
                        medicamentos: '',
                        atestados: '',
                        name: null
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
                const response = await axios.get('http://localhost:8000/pacients/name');
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