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

    <form @submit.prevent="saveDoctor" class="container">
      <div class="card">
        <div class="card-header">
          <h4>Adicionar Médico</h4>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="selectedOption">Funcionário</label>
            <select required v-model="selectedOption1" id="selectedOption1" ref="selectedOption1" class="block mt-1 w-100">
              <option value="" selected>-- Escolha uma opção --</option>
              <option value="" selected>-- Se não houver opção, não há funcionários cadastrados que não são médicos --</option>
              <option v-for="person in options1" :key="person.name" :value="person.name">
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
            <select required v-model="selectedOption2" id="selectedOption2" ref="selectedOption2" class="block mt-1 w-100">
              <option value="" selected>-- Escolha uma opção --</option>
              <option v-for="specialty in options2" :key="specialty.specialty" :value="specialty.specialty">
                {{ specialty.specialty }}
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
      selectedOption1: null,
      selectedOption2: null,
      options1: [],
      options2: [],
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

    this.selectedOption1 = ''
    this.selectedOption2 = ''
    this.fetchOptions();
  },
  methods: {
    async saveDoctor() {
      try {
        var myThis = this;

        const name = this.options1[this.$refs.selectedOption1.selectedIndex - 2].name;
        const especialidade = this.options2[this.$refs.selectedOption2.selectedIndex - 1].specialty;

        this.model.doctor.name = name;
        this.model.doctor.especialidade = especialidade;

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
                    this.registerMessage("Médico cadastrado com sucesso")
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
        const response1 = await axios.get('http://localhost:8000/doctor/create/employees');
        const response2 = await axios.get('http://localhost:8000/doctors/doctor-specialties');
        this.options1 = response1.data.response;
        this.options2 = response2.data.response;
        console.log(this.options1)
        console.log(this.options2)
      } catch (error) {
        console.error('Médico creation: ', error);
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
            router.push('/doctors');
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
</style>
