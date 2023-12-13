<template>
  <div id="app">
    <Nav />

   
        <router-view />
     
      <!-- <Footer /> -->
</div>
</template>

<script>
  import Nav from './components/Nav.vue';
  import Footer from './components/Footer.vue';
  export default {
    name: 'app',
    data() {
      return {
        isHandbook: false,
      }
    },
    components: {
      Nav, Footer
    },
    mounted() {
      this.isHandbook = this.$route.name === 'handbook' || this.$route.name === 'handbook/create';
    }}
    
</script>

<style>
  body, html, #app, #root, .auth-wrapper {
    width: 100%;
    height: 100%;
    margin: 0%;
  }

  
</style>