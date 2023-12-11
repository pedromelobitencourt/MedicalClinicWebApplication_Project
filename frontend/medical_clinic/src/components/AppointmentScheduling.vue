<template>
 <div class="auth-wrapper">
      <div class="auth-inner">
        <form >
          <div class="form-especialidade">
            <select class="form-select" aria-label="Default select example">
                  <option selected>Selecione a especialidade Desejada</option>
                  <option value="1"></option>
                  <option value="2"></option>
                  <option value="3"></option>
          </select>

          </div>

          <div class="form-nomeMedico">

            <select class="form-select" aria-label="Default select example">
                  <option selected>Selecione o nome do medico/a</option>
                  <option value="1"></option>
                  <option value="2"></option>
                  <option value="3"></option>
          </select>

          </div>

          <div class="form-dataConsulta">


          </div>

          <div class="form-horarioEscolhido">

          </div>
          




        </form>

      </div>
    </div>

</template>

<script>


</script>


<style>
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

</style>