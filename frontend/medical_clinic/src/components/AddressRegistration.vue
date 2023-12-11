<template>
    <div class="auth-wrapper">
      <div class="auth-inner">
    <div>
        <div id="fade" class="hide" ref="fade">
            <div id="loader" class="spinner-border text-info hide" role="status" ref="loader">
                <span class="visually-hidden">Loading...</span>
            </div>

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
    </div>
    </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import router from '../router';

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
                try {
                    const response = await axios.post('http://localhost:8000/addressRegistration', {
                        cep: this.cep,
                        estado: this.estado,
                        cidade: this.cidade,
                        bairro: this.bairro,
                        logradouro: this.logradouro,
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    // Verifique a resposta do servidor


                    if (response.status === 201) {
                        const msg = "Endereço cadastrado com sucesso";
                        this.registerMessage(msg);
                        
                    } else {
                        const msg = "Ocorreu um erro inesperado 1";
                        this.registerMessage(msg);
                    }
                } 
                catch (error) {
                    const erro = error.response.data;

                    if(erro && erro === "ER_DUP_ENTRY") {
                        const msg = "CEP já cadastrado";
                        this.registerMessage(msg);
                    }
                    else {
                        const msg = "Ocorreu um erro inesperado 2";
                        this.registerMessage(msg);
                    }
                }
            },
            handleKeyPress(e) {
                const onlyNumbers = /[0-9]/;
                const key = String.fromCharCode(e.keyCode);

                // Allow only numbers
                if(!onlyNumbers.test(key)) {
                    e.preventDefault();
                    return;
                }
            },
            getAddressEvent(e) {
                const inputValue = e.target.value;

                if(inputValue.length === 8) {
                    this.toggleLoader();
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
                    this.toggleLoader();
                    this.toggleMessage("CEP inválido, tente novamente");

                    this.disableAllReadOnly();
                    this.resetFormValues();

                    return;
                }
                else {
                    this.logradouro = data.logradouro;
                    this.cidade = data.localidade;
                    this.bairro = data.bairro;
                    this.estado = data.uf;

                    this.enableAllReadOnly();

                    this.toggleLoader();
                }
            },
            toggleLoader() {
                this.$refs.fade.classList.toggle("hide");
                this.$refs.loader.classList.toggle("hide");                
            },
            toggleMessage(msg) {
                this.$refs.message_p.innerText = msg;
                this.$refs.fade.classList.toggle("hide");
                this.$refs.message.classList.toggle("hide");
            },
            closeMessage() {
                this.toggleMessage();
            },
            disableAllReadOnly() {
                this.isCityReadOnly = false;
                this.isNeighborhoodReadOnly = false;
                this.isStateReadOnly = false;
                this.isStreetReadOnly = false;
            },
            enableAllReadOnly() {
                this.isCityReadOnly = true;
                this.isNeighborhoodReadOnly = true;
                this.isStateReadOnly = true;
                this.isStreetReadOnly = true;
            },
            resetFormValues() {
                this.cep = '';
                this.logradouro = '';
                this.cidade = '';
                this.bairro = '';
                this.estado = '';
            },
            registerMessage(msg) {
                this.toggleMessage(msg);
                this.disableAllReadOnly();
                this.resetFormValues();
            }
        }
    }
</script>


<style>
    :root {
        --bg-color: #04044c;
        --secondary-bg-color: #494a7d;
        --primary-color: #fff;
        --secondary-color: #25cc88;
        --text-color: #8789af;
        --border-color: #20235b;
    }

    #checkout-page {
        background-color: var(--bg-color);
        color: var(--primary-color);
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

    /* Steps */
    #order-form-container {
        padding: 1.5em;
    }

    #steps {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid var(--border-color);
        position: relative;
    }

    .step {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .step i {
        background-color: var(--secondary-bg-color);
        width: 45px;
        height: 45px;
        line-height: 45px;
        border-radius: 50%;
        text-align: center;
        font-size: 1.2em;
        margin-bottom: 0.3em;
    }

    .step .active {
        background-color: var(--secondary-color);
    }

    .step p {
        color: var(--text-color);
    }

    .line {
        border-bottom: 1px solid var(--border-color);
        position: absolute;
        top: 22.5px;
        width: 90%;
        left: 5%;
        z-index: -1;
    }

    /* Form header */
    #form-header p {
        color: var(--text-color);
    }

    /* Form */
    #order-form-container {
        max-width: 700px;
    }

    #order-form-container input,
    #order-form-container select {
        background-color: var(--bg-color);
        border: 2px solid var(--border-color);
        color: var(--primary-color);
    }

    #order-form-container select {
        padding: 1rem 0.75rem;
    }

    #order-form-container label {
        color: var(--text-color);
    }

    #order-form-container input:disabled,
    #order-form-container select:disabled {
        background-color: var(--secondary-bg-color);
        color: var(--text-color);
    }

    #order-form-container input:focus {
        border-color: var(--secondary-color);
    }

    #order-form-container .form-floating > label {
        left: 1em;
    }

    #save-btn {
        background-color: #25cc88;
        border: none;
        height: 3em;
        width: 8em;
        border-radius: 1.5em;
    }
    .auth-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}

.auth-inner {
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all .3s;
}

    /* Responsive */
    @media (min-width: 500px) {
        #save-btn {
            width: 8em;
        }
    }
</style>