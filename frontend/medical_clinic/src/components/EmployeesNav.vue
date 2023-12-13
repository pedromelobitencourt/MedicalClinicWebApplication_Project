<template>
    <nav class="navbar-light navbar navbar-expand fixed-top bg-light mb-20" style="position: relative;">
      <router-link to="/" class="nav-link">
        <img class = "logo" src="../assets/Logo2.png" alt=" mb-20">
      </router-link>
  
      <div class="container">
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/employees/create" class="nav-link" style="margin-left: 80px;font-size: 20px;padding-bottom: 50px;margin-right: 40px; ">Novo Funcionario</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/paciente/create" class="nav-link" style="font-size: 20px;font-size: 20px;padding-bottom: 50px;margin-right: 40px; ">Novo Paciente</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/employees" class="nav-link" style="font-size: 20px;font-size: 20px;padding-bottom: 50px;margin-right: 40px; ">Listar Funcionario</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/paciente" class="nav-link" style="font-size: 20px;font-size: 20px;padding-bottom: 50px;margin-right: 40px; ">Listar pacientes</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/address" class="nav-link" style="font-size: 20px;font-size: 20px;padding-bottom: 50px;margin-right: 40px; ">Listar endereços</router-link>
            </li>
            <li class="nav-item">
              <router-link to="" class="nav-link" style="font-size: 20px;font-size: 20px;padding-bottom: 50px;margin-right: 40px; ">Listar todos agendamentos</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="isDoctor" to="" class="nav-link" style="font-size: 20px;font-size: 20px;padding-bottom: 50px;margin-right: 40px; ">Listar meus agedamentos</router-link>
            </li>
           
            <li class="nav-item">
              <router-link to="/" class="nav-link" style="font-size: 20px;font-size: 20px;padding-bottom: 50px;margin-right: 40px;color: #31AFB4; " @click="logout">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  
  export default {
    name: 'EmployeesNav',
    data() {
      return {
        user : null,
        isDoctor:null
      }
    },
    methods: {
    logout() {
      console.log('Executando a função de logout');
        localStorage.removeItem('user');
        this.isLoggedIn = false;
        console.log(this.isLoggedIn);
      this.$router.push('/');
    }
  },
  created() {
      this.user = JSON.parse(localStorage.getItem('user'));
        
    }
  }
  </script>
  
  <style scoped>
  .logo{
  width: 280px;
  height: 90px;
  }
  
  </style>