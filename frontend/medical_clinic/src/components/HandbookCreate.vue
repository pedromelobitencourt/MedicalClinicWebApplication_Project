<template>
    
    <form  @submit.prevent="saveHandbook" class="container">
        <div class="card">
            <div class="card-header">
                <h4>Adicionar Prontuário</h4>
            </div>
            <div class="card-body">
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

export default {
    name: 'HandbookCreate',
    data() {
        return {
            model: {
                handbook: {
                    anamnese: '',
                    medicamentos: '',
                    atestados: ''
                }
            }
        }
    },
    methods: {
        saveHandbook() {
            axios.post('http://localhost:8000/handbook', this.model.handbook)
                .then(res => {
                    console.log(res.data);
                })
                .catch(console.log)
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