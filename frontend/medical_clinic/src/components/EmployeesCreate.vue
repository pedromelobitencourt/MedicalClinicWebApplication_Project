<template>
  <form @submit.prevent="saveEmployee" class="container">
    <div class="card">
      <div class="card-header">
        <h4>Adicionar Funcionário</h4>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="selectedOption">Paciente</label>
          <select required v-model="selectedOption" id="selectedOption" ref="selectMenu" class="block mt-1 w-100">
            <option value="" selected>-- Escolha uma opção --</option>
            <option v-for="employee in options" :key="employee.id" :value="employee.PessoaId">
              {{ employee.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="salario">Salario</label>
          <input type="text" v-model="model.employee.salario" id="salario" class="form-control">
        </div>
        <div class="mb-3">
          <label for="dataContrato">Data de Contrato</label>
          <v-date-picker v-model="model.employee.dataContrato" dark :locale="locale" full-width class="custom-date-picker"></v-date-picker>
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
      this.fetchOptions();
    // this.selectedOption = this.options[0];
  },
  methods: {
    async saveEmployee() {
      try {
        console.log('Employee saved:', this.model.employee);
        // Adicione a lógica de salvar o funcionário aqui
      } catch (error) {
        console.error('Error saving employee:', error);
      }
    },
    async fetchOptions() {
      try {
        const response = await axios.get('http://localhost:8000/employees');
        this.options = response.data.response;
        console.log(this.$refs.selectMenu);
      } catch (error) {
        console.error('Funcionario creation: ', error);
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
