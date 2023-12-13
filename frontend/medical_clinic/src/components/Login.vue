<template>
     <div class="auth-wrapper">
      <div class="auth-inner">
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>

        <div class="form-group my-3">
            <label class="mb-1" style="font-weight: bold;">Email</label>
            <input type="email" v-model="model.login.email" class="form-control mb-1" placeholder="Email...">
            <small id="emailHelp" class="form-text text-muted">Nós nunca compartilharemos seu e-mail.</small>
        </div>

        <div class="form-group my-3">
            <label class="mb-1" style="font-weight: bold;">Senha</label>
            <input type="password" v-model="model.login.senha" class="form-control" id="exampleInputPassword1" placeholder="Senha">
        </div>

        <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
    </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Login',
    data() {
      return {
          model: {
            login: {
              email: '',
              senha: ''
            }
          }
      }
    },
    created() {
      const user = JSON.parse(localStorage.getItem('user'));
        this.isLoggedIn = !!user; // Define isLoggedIn como true se o usuário estiver logado
        console.log("Ta logado", this.isLoggedIn);

        if(this.isLoggedIn) {
            this.$router.push('/handbook')
        }
    },
    methods: {
      async handleSubmit() {
        const response = await axios.post('http://localhost:8000/login', {
          email: this.model.login.email,
          senha: this.model.login.senha
        });

        const login = response.data.response;
        console.log(login);

        localStorage.setItem('user', JSON.stringify(login));
        window.location.reload();
        //this.$router.push('/');
      }
    }
}
</script>
<style scoped>
 @import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');

* {
  box-sizing: border-box;
}

body {
  background: #1dd2db;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
  font-family: 'Fira Sans', sans-serif;
}

h1, h2, h3, h4, h5, h6, label, span {
  font-weight: 500;
  font-family: 'Fira Sans', sans-serif;
}

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
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}

.auth-inner {
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all .3s;
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
  margin-right: 50em;
}

.navbar-nav .nav-item {
  margin-right: 0.5em;
}

@media (max-width: 1400px) {
  .navbar-brand {
    margin-right: 40em;
  }

  .navbar-nav .nav-item {
  margin-left: 0.5em;
  }
}

@media (max-width: 1200px) {
  .navbar-brand {
    margin-right: 35em;
  }

  .navbar-nav .nav-item {
  margin-left: 0.2em;
  }
}

@media (max-width: 1000px) {
  .navbar-brand {
    margin-right: 23em;
  }

  .navbar-nav .nav-item {
  margin-left: 0.2em;
  }
}

@media (max-width: 800px) {
  .navbar-brand {
    margin-right: 15em;
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
