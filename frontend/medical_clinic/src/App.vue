<template>
  <div id="app">
    <Nav />

    <div class="container-fluid scroll" :class="{ 'auth-wrapper': !isHandbook, 'auth-wrapper-handbook': isHandbook }">
      <div :class="{ 'auth-inner': !isHandbook, 'auth-inner-handbook': isHandbook }">
        <router-view />
    <Footer />
  </div>
</template>

<script>
  import Nav from './components/Nav.vue';
  export default {
    name: 'app',
    data() {
      return {
        isHandbook: false,
      }
    },
    components: {
      Nav,
    },
    mounted() {
      this.isHandbook = this.$route.name === 'handbook' || this.$route.name === 'handbook/create';
    }
  import Footer from './components/Footer.vue';
export default {
  name: 'app',
    components: {
      Nav, Footer
    }
  
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

  .nav-light {
    background-color: #ffffff;
    box-shadow: 0px 14px 8px rgba(34, 35, 58, 0.2);
  }

  .auth-wrapper {
    display: block;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    margin-top: 100px;
  }

  .auth-wrapper-handbook {
    display: block;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    margin-top: 100px;
  }

  .auth-inner {
    margin: auto;
    width: 450px;
    background: #ffffff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    padding: 40px 55px 45px 55px;
    border-radius: 15px;
    transition: all .3s;
  }

  .auth-inner-handbook {
      margin: auto;
      width: 1500px;
      background: #ffffff;
      box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
      padding: 20px 5px 25px 15px;
      border-radius: 15px;
      transition: all .3s;
      align-content: center;

  }

  .auth-wrapper .form-control:focus {
    border-color: #1dd2db;
    box-shadow: none;
  }

  .auth-wrapper h3 {
    text-align: center;
    margin: 0;
    line-height: 1;
    padding-bottom: 20px;
    height: 100%;
  }

  .custom-control-label {
    font-weight: 400;
  }

  .forgot-password,
  .forgot-password a {
    text-align: right;
    font-size: 13px;
    padding-top: 10px;
    color: #7f7d7d;
    margin: 0;
  }

  .forgot-password a {
    color: #1dd2db;
  }

  .navbar-brand {
    margin-right: 36em;
  }

  .navbar-nav .nav-item {
    margin-right: 0.5em;
  }

  @media (max-width: 1400px) {
    .navbar-brand {
      margin-right: 25em;
    }

    .navbar-nav .nav-item {
    margin-left: 0.5em;
    }
  }

  @media (max-width: 1200px) {
    .navbar-brand {
      margin-right: 17em;
    }

    .navbar-nav .nav-item {
    margin-left: 0.2em;
    }
  }

  @media (max-width: 1000px) {
    .navbar-brand {
      margin-right: 4em;
    }

    .navbar-nav .nav-item {
    margin-left: 0.2em;
    }
  }

  @media (max-width: 800px) {
    .navbar-brand {
      margin-right: 1em;
    }

    .navbar-nav .nav-item {
    margin-left: 0.2em;
    }
  }

  @media (max-width: 550px) {
    .navbar-brand {
      margin-right: 8em;
    }

    .navbar-nav .nav-item {
    margin-left: 0.2em;
    }
  }

</style>