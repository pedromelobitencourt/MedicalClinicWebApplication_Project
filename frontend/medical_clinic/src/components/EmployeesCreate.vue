<template>
  <form @submit.prevent="saveEmployee" class="container">
    <div class="card">
      <div class="card-header">
        <h4>Adicionar Funcionário</h4>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="selectedOption">Funcionário</label>
          <select required v-model="selectedOption" id="selectedOption" ref="selectedOption" class="block mt-1 w-100">
            <option value="" selected>-- Escolha uma opção --</option>
            <option value="" selected>-- Se não houver opção, não há pessoas cadastradas que não são funcionários --</option>
            <option v-for="person in options" :key="person.name" :value="person.name">
              {{ person.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="salario">Salario</label>
          <input type="text" v-model="model.employee.salario" id="salario" class="form-control" required>
        </div>
        <div class="mb-3">
          <label for="senha">Senha</label>
          <input type="password" v-model="model.employee.senha" id="senha" class="form-control" required>
        </div>
        <div class="mb-3">
          <label for="dataContrato">Data de Contrato</label>
          <v-date-picker 
            v-model="model.employee.dataContrato"
            dark
            :locale="locale"
            full-width
            class="custom-date-picker">
          </v-date-picker>
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
  name: 'EmployeeCreate',
  data() {
    return {
      errorList: null,
      model: {
        employee: {
          id: '',
          pessoaId: '',
          name: '',
          senha: '',
          salario: '',
          dataContrato: null,
        },
      },
      selectedOption: null,
      options: [],
      locale: 'pt-BR',
    };
  },
  mounted() {
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
  methods: {
    async saveEmployee() {
      try {
        var myThis = this;

        const name = this.options[this.$refs.selectedOption.selectedIndex - 2].name;
        this.model.employee.name = name;
        console.log('Employee saved:', this.model.employee);

        await axios.post('http://localhost:8000/employees', this.model.employee)
                .then(res => {
                    console.log(res.data);

                    this.model.handbook = {
                        id: '',
                        pessoaId: '',
                        salario: '',
                        senha: '',
                        dataContrato: '',
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

      } catch (error) {
        console.error('Error saving employee:', error);
      }
    },
    async fetchOptions() {
      try {
        const response = await axios.get('http://localhost:8000/employees/create');
        this.options = response.data.response;
        console.log("selectMenu", this.$refs.selectMenu);
        console.log("ResponseData", response.data.response)
      } catch (error) {
        console.error('Funcionario creation: ', error);
      }
    },
    logout() {
      localStorage.removeItem('user');
      this.isLoggedIn = false;
      console.log(this.isLoggedIn);
      this.$router.push('/login');
    }
  },
};
</script>

<style>
.container {
    width: 650px
}
</style>
