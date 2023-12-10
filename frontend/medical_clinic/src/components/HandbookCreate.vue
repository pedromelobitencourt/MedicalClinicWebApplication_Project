<template>
    
    <form  @submit.prevent="saveHandbook" class="container">
        <div class="card">
            <div class="card-header">
                <h4>Adicionar Prontuário</h4>
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

</template>

<script>
import axios from 'axios';
import Select2 from 'vue3-select2-component'

export default {
    name: 'HandbookCreate',
    data() {
        return {
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
            const name = this.options[this.$refs.selectedOption.selectedIndex - 1].name;
            console.log("O nome", name)
            this.model.handbook.name = name;

            axios.post('http://localhost:8000/handbook', this.model.handbook)
                .then(res => {
                    console.log(res.data);
                })
                .catch(console.log)
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