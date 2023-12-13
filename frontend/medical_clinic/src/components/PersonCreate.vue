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

    <form @submit.prevent="savePerson" class="container">
      <div class="card">
        <div class="card-header">
          <h4>Adicionar Pessoa</h4>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="salario">Nome Completo</label>
            <input 
              type="text" 
              v-model="model.person.nome"
              class="form-control"
              placeholder="Nome Completo"
              required>
          </div>
          <div class="mb-3">
            <label for="email">Email</label>
            <input 
              type="email" 
              v-model="model.person.email"
              class="form-control"
              placeholder="email@email.com"
              required>
          </div>
          <div class="mb-3">
            <label for="telefone">Telefone</label>
            <input
              type="tel" 
              v-model="model.person.telefone" 
              pattern="[0-9]{9}" 
              placeholder="XXXXXXXXX"
              class="form-control" 
              required>
          </div>
          <div class="mb-3">
            <label for="cep">CEP</label>
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
  name: 'PersonCreate',
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
      locale: 'pt-BR',
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.isLoggedIn = !!user; // Define isLoggedIn como true se o usuário estiver logado
    console.log("Ta logado", this.isLoggedIn);

    if(!this.isLoggedIn) {
        this.$router.push('/login')
    }
    this.selectedOption = ''
    this.fetchOptions();
  },
  mounted() {
  },
  methods: {
    async savePerson() {
      try {
        var myThis = this;

        const cep = this.options[this.$refs.selectedOption.selectedIndex - 2].cep;
        this.model.person.enderecoCep = cep;
        console.log('Person saved:', this.model.person);

        await axios.post('http://localhost:8000/person', this.model.person)
                .then(res => {
                    console.log(res.data);

                    this.model.person = {
                        id: '',
                        nome: '',
                        email: '',
                        telefone: '',
                        enderecoCep: null,
                    }
                    this.registerMessage("Pessoa cadastrada com sucesso")
                })
                .catch(function (error) {
                    if(error.response) {
                        if(error.response.status === 422) {
                            myThis.errorList = error.response.data.errors;
                        }
                        else if (error.response.data.error.code === 'ER_NO_REFERENCED_ROW_2') {
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

      } catch (error) {
        console.error('Error saving employee:', error);
      }
    },
    async fetchOptions() {
      try {
        const response = await axios.get('http://localhost:8000/ceps');
        this.options = response.data.response;
        console.log(this.options);
        this.$refs.selectedOption.selectedIndex = 0;
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
  },
};
</script>

<style>
.container {
    width: 650px
}

select {
  border: 1px solid black;
  cursor: pointer;
}

</style>
