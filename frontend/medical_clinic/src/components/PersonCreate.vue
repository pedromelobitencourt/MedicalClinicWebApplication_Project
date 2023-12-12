<template>
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
          <input
            type="text"
            v-model="model.person.enderecoCep"
            class="form-control"
            placeholder="XXXXXXXX"
            pattern="[0-9]{8}"
            required>
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
  methods: {
    async savePerson() {
      try {
        var myThis = this;

        console.log('Person saved:', this.model.person);

        axios.post('http://localhost:8000/person', this.model.person)
                .then(res => {
                    console.log(res.data);

                    this.model.person = {
                        id: '',
                        nome: '',
                        email: '',
                        telefone: '',
                        enderecoCep: null,
                    }
                })
                .catch(function (error) {
                    console.log("erroooooo", error)
                    if(error.response) {
                        if(error.response.status === 422) {
                            myThis.errorList = error.response.data.errors;
                        }
                        else if (error.response.data.error.code === 'ER_NO_REFERENCED_ROW_2') {
                            console.log("cep error")
                            myThis.errorList = error.response.data.errors;
                        }
                        console.log("erro 1")
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
  },
};
</script>

<style>
.container {
    width: 650px
}
</style>
