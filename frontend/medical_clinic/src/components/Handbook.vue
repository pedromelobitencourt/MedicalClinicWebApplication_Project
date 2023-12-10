<template>
    <div class="handbook-wrapper container">
        <div class="card">
            <div class="card-header">
                <h4>
                    Prontuário
                    <router-link to="/handbook/create" class="btn btn-primary float-end">
                        Add Prontuário
                    </router-link>
                </h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Anamnese</th>
                            <th>Medicamentos</th>
                            <th>Atestados</th>
                            <th>Ação</th>
                        </tr>
                    </thead>

                    <tbody v-if="handbooks.length > 0">
                        <tr v-for="(handbook, index) in handbooks" :key="index">
                            <td> {{handbook.id}} </td>
                            <td> {{handbook.anamnese}} </td>
                            <td> {{handbook.medicamentos}} </td>
                            <td> {{handbook.atestados}} </td>
                            <td>
                                <router-link to="/" class="btn btn-success float-end">
                                    Editar
                                </router-link>
                                <button type="button" class="btn btn-danger float-end">Deletar</button>
                            </td>
                        </tr>
                    </tbody>

                    <tbody v-else>
                        <tr>
                            <td colspan="4">Loading...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

export default {
    name: 'handbook',
    data() {
        return {
            handbooks: []
        }
    },
    mounted() {

        this.getHandbooks();
    },
    methods: {
        getHandbooks() {
            axios.get('http://localhost:8000/handbook')
                .then(res => {
                    this.handbooks = res.data.response;
                })
        }
    }
}
</script>


<style>
    .handbook-wrapper {
        width: 100%
    }
</style>