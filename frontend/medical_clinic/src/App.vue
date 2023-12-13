<template>
  

  <div id="app">
      <Nav v-if=" user=== null" /> 
      <EmployeesNav v-if="user !== null"  />

   
        <router-view />
     
    <Footer /> 
</div>


</template>

<script>
  import Nav from './components/Nav.vue';
  import Footer from './components/Footer.vue';
  import EmployeesNav from './components/EmployeesNav.vue';

  export default {
    name: 'app',
    data() {
      return {
        isLogged:null,
        user:null
      }
    },
    components: {
      EmployeesNav, Nav,Footer
    }
    ,
    mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log('Componente App foi montado no DOM. User:',this.user );
  }
  // ,watch: {
  //     user(newVal) {
  //       this.user = JSON.parse(localStorage.getItem('user'));
  //       console.log('user foi atualizado. User:', );
        
  //     },
  //   },

    }
    
    
</script>

<style>
  body, html, #app, #root, .auth-wrapper {
    width: 100%;
    height: 100%;
    margin: 0%;
  }

  
</style>