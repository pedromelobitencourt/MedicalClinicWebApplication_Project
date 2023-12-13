<template>
  <form @submit.prevent="saveEmployee" class="container">
    <div class="card">
      <div class="card-header">
        <h4>Adicionar Médico</h4>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="selectedOption">Funcionário</label>
          <select required v-model="selectedOption" id="selectedOption" ref="selectedOption" class="block mt-1 w-100">
            <option value="" selected>-- Escolha uma opção --</option>
            <option value="" selected>-- Se não houver opção, não há funcionários cadastrados que não são médicos --</option>
            <option v-for="person in options" :key="person.name" :value="person.name">
              {{ person.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="salario">CRM</label>
          <input type="text" v-model="model.doctor.crm" id="crm" class="form-control" required>
        </div>
        <div class="mb-3">
          <label for="senha">Especialidade</label>
          <input type="password" v-model="model.doctor.especialidade" id="especialidade" class="form-control" required>
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
  name: 'DoctorCreate',
  data() {
    return {
      errorList: null,
      model: {
        doctor: {
          id: '',
          crm: '',
          especialidade: '',
          funcionarioId: '',
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
        this.model.doctor.name = name;
        console.log('Employee saved:', this.model.doctor);

        await axios.post('http://localhost:8000/doctor/create', this.model.doctor)
                .then(res => {
                    console.log(res.data);

                    this.model.doctor = {
                        id: '',
                        crm: '',
                        especialidade: '',
                        funcionarioId: '',
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
        console.error('Error saving doctor:', error);
      }
    },
    async fetchOptions() {
      try {
        const response = await axios.get('http://localhost:8000/doctor/create/employees');
        this.options = response.data.response;
        console.log(this.options)
      } catch (error) {
        console.error('Médico creation: ', error);
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
