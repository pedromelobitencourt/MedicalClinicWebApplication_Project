<template>
  <nav class="navbar-light navbar navbar-expand fixed-top bg-light mb-20" style="position: relative;">
    <router-link to="/" class="nav-link">
      <img class = "logo" src="../assets/Logo2.png" alt=" mb-20">
    </router-link>

    <div class="container">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" style="margin-left: 80px;font-size: 20px;padding-bottom: 50px;margin-right: 40px; ">Principal</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/photo" class="nav-link" style="font-size: 20px;font-size: 20px;padding-bottom: 50px;margin-right: 40px; ">Galeria</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/address/create" class="nav-link" style="font-size: 20px;font-size: 20px;padding-bottom: 50px;margin-right: 40px; ">Cadastrar Endereço</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/scheduling" class="nav-link" style="font-size: 20px;font-size: 20px;padding-bottom: 50px;margin-right: 40px; ">Agendamento</router-link>
          </li>
          <li class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="48" viewBox="0 0 54 48" fill="none"  style="padding-top: 10px;margin-right: 40px">
            <path d="M21.625 0C25.5038 0 29.2237 1.36964 31.9664 3.80761C34.7092 6.24558 36.25 9.55219 36.25 13C36.25 16.22 34.9225 19.18 32.74 21.46L33.3475 22H35.125L46.375 32L43 35L31.75 25V23.42L31.1425 22.88C28.4887 24.8935 25.1141 25.9998 21.625 26C17.7462 26 14.0263 24.6304 11.2836 22.1924C8.54084 19.7544 7 16.4478 7 13C7 9.55219 8.54084 6.24558 11.2836 3.80761C14.0263 1.36964 17.7462 0 21.625 0ZM21.625 4C16 4 11.5 8 11.5 13C11.5 18 16 22 21.625 22C27.25 22 31.75 18 31.75 13C31.75 8 27.25 4 21.625 4Z" fill="#31AFB4"/>
          </svg>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link" style="font-size: 20px;font-size: 20px;padding-bottom: 50px;margin-right: 40px;color: #31AFB4; ">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'Nav'
}
</script>

<style scoped>
.logo{
width: 280px;
height: 90px;
}

</style>