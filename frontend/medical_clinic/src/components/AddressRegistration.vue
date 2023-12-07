<template>
    <form @submit.prevent="handleSubmit">
        <h3>Cadastro de Endereço</h3>

        <div class="form-group my-3">
            <label class="mb-1">CEP</label>
            <input type="text" class="form-control" v-model="cep" placeholder="CEP">
        </div>

        <div class="form-group my-3">
            <label class="mb-1">Estado</label>
            <input type="text" class="form-control" v-model="estado"  placeholder="Estado">
        </div>

        <div class="form-group my-3">
            <label class="mb-1">Cidade</label>
            <input type="text" class="form-control" v-model="cidade" placeholder="Cidade">
        </div>

        <div class="form-group my-3">
            <label class="mb-1">Bairro</label>
            <input type="text" class="form-control" v-model="bairro" placeholder="Bairro">
        </div>

        <div class="form-group my-3">
            <label class="mb-1">Logradouro</label>
            <input type="text" class="form-control" v-model="logradouro" placeholder="Logradouro">
        </div>

        <button class="btn btn-primary btn-block w-100">Cadastrar</button>
    </form>

</template>

<script>
    import axios from 'axios';

    export default {
        name: 'AddressRegistration',
        data() {
            return {
                cep: '',
                estado: '',
                cidade: '',
                bairro: '',
                logradouro: ''
            }
        },
        methods: {
            // Send to backend
            async handleSubmit() {                
                const response = await axios.post('address', {
                    cep: this.cep,
                    estado: this.estado,
                    cidade: this.cidade,
                    bairro: this.bairro,
                    logradouro: this.logradouro,
                });

                console.log("Response: ", response);
            }
        }
    }
</script>
