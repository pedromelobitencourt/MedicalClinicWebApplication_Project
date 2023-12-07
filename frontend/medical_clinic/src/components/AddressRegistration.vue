<template>
    <form @submit.prevent="handleSubmit" ref="addressForm" id="address-form">
        <h3>Cadastro de Endereço</h3>

        <div class="form-group my-3">
            <label class="mb-1">CEP</label>
            <input type="text" class="form-control" v-model="cep" placeholder="CEP" id="cep" @keypress="handleKeyPress" @keyup="getAddressEvent">
        </div>

        <div class="form-group my-3">
            <label class="mb-1">Estado</label>
            <input type="text" class="form-control" v-model="estado"  placeholder="Estado" id="state" :readonly="isStateReadOnly">
        </div>

        <div class="form-group my-3">
            <label class="mb-1">Cidade</label>
            <input type="text" class="form-control" v-model="cidade" placeholder="Cidade" id="city" :readonly="isCityReadOnly">
        </div>

        <div class="form-group my-3">
            <label class="mb-1">Bairro</label>
            <input type="text" class="form-control" v-model="bairro" placeholder="Bairro" id="neighborhood" :readonly="isNeighborhoodReadOnly">
        </div>

        <div class="form-group my-3">
            <label class="mb-1">Logradouro</label>
            <input type="text" class="form-control" v-model="logradouro" placeholder="Logradouro" id="street" :readonly="isStreetReadOnly">
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
                logradouro: '',
                isCityReadOnly: false,
                isNeighborhoodReadOnly: false,
                isStateReadOnly: false,
                isStreetReadOnly: false
            }
        },
        mounted() {
            // Vue's lifecycle hook for when the component has been mounted
            // You can add event listeners here or in the template using v-on
            this.$refs.cep.addEventListener("keypress", this.handleKeyPress);
        },
        beforeDestroy() {
            // Clean up your event listeners when the component is destroyed
            this.$refs.cep.removeEventListener("keypress", this.handleKeyPress);
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
            },
            handleKeyPress(e) {
                const onlyNumbers = /[0-9]/;
                const key = String.fromCharCode(e.keyCode);
                console.log(key);

                // Allow only numbers
                if(!onlyNumbers.test(key)) {
                    e.preventDefault();
                    return;
                }
            },
            getAddressEvent(e) {
                const inputValue = e.target.value;

                if(inputValue.length === 8) {
                    // this.simulateBlurOnCEP()
                    this.apiCEP(inputValue)
                }
            },
            simulateBlurOnCEP() { //The user can't change it
                this.$refs.cep.blur();
            },
            async apiCEP(cep) {
                const apiUrl = `https://viacep.com.br/ws/${cep}/json`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                
                //Show error and reset form
                if(data.erro === true) {
                    this.$refs.addressForm.reset();
                }
                else {
                    console.log(data)
                    this.cidade = "Bel";
                    this.logradouro = data.logradouro;
                    this.cidade = data.localidade;
                    this.bairro = data.bairro;
                    this.estado = data.uf;

                    this.isCityReadOnly = true;
                    this.isNeighborhoodReadOnly = true;
                    this.isStateReadOnly = true;
                    this.isStreetReadOnly = true;
                }
            }
        }
    }
</script>
