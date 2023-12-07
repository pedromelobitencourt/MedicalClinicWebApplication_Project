<template>
  <div id="app">
    <Nav />

        <router-view />

  </div>
</template>

<script>
  import Nav from './components/Nav.vue';
export default {
  name: 'app',
    components: {
      Nav,
    }
  
}
</script>

<style>
  body, html, #app, #root, .auth-wrapper {
    width: 100%;
    height: 100%;
  }

</style>
