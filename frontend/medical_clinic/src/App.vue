<template>
  <div id="app">
    <Nav />

   
        <router-view />
      
    
      <Footer />
</div>
</template>

<script>
  import Nav from './components/Nav.vue';
  import Footer from './components/Footer.vue';

  export default {
    name: 'app',
    data() {
      return {
        
      }
    },
    components: {
      Nav, Footer
    },
    }
    
</script>

<style>
  body, html, #app, #root, .auth-wrapper {
    width: 100%;
    height: 100%;
  }

  #app {
    text-align: center;
  }

  
</style>