<template>
 <div class="auth-wrapper">
      <div class="auth-inner">
        <h3>Agendamento de consulta</h3>
        <form >
          <div class="form-especialidade">
            <select class="form-select" aria-label=""  v-model="EspecialidadeSelecionada"
            @change="selecionarMedicos($event)">
                  <option selected value="" >Selecione a especialidade Desejada</option>
                  <option v-for="medico in medicos"   :key="medico.id" :value="medico.especialidade">
                    {{ medico.especialidade }}</option>
                
          </select>

          </div>

          <div class="form-nomeMedico">

            <select class="form-select" aria-label="">
                  <option selected>Selecione o nome do medico/a</option>
                  <option value="1"></option>
                  <option value="2"></option>
                  <option value="3"></option>
          </select>

          </div>

          <div class="form-dataConsulta">

            <label for="dataConsulta">Data da consulta:</label>
            
            <b-form-datepicker v-model="dataC" :date-disabled-fn="dateDisabled" locale="pt-br" name="dataConsulta" id="dataConsulta" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" date-format="d/m/Y"
            >
            
            </b-form-datepicker>

            
          </div>

          <div class="form-horarioEscolhido">

            <label for="horaConsulta">Data da consulta:</label>
            <b-form-timepicker name="horaConsulta" id="horaConsulta" v-model="horaC" locale="en" ></b-form-timepicker>

          </div>
          
          <h4>Dados pessoais</h4>

          <div class="form-group my-3">
                <label class="mb-1">Nome</label>
                <input type="text" class="form-control" v-model="NomeP" placeholder="Nome do paciente" id="nomePaciente" >
            </div>

            <div class="form-group my-3">
              <label class="mb-1">Email</label>
              <input type="email" class="form-control mb-1" placeholder="Email">
          
            </div>

            <div class="form-group my-3">
                <label class="mb-1">Telefone</label>
                <input type="text" class="form-control" v-model="TelefoneP" placeholder="Telefone do paciente" id="Telefone" :readonly="isStreetReadOnly">
            </div>




        </form>

      </div>
    </div>

</template>

<script>
import axios from 'axios';


export default {
  name: 'appointmentScheduling',
    data() {
      return {
        medicos: [], 
         especialidades: [], 
        value: '',
        EspecialidadeSelecionada:'',
        MedicoSelecionado:''
      }
    },
    mounted() {
    // eslint-disable-next-line no-console
    console.log("carregado.");
    this.carregarMedicos();
  },
    methods: {
      dateDisabled(ymd, date) {
        
        const weekday = date.getDay()
        const day = date.getDate()
      
        return weekday === 0 || weekday === 6 || day === 13
      },

      async carregarMedicos(){
        await axios.get('http://localhost:8000/medico').then(res =>{

          console.log(res.data);
          this.medicos = res.data.response;


          console.log("Objeto Medicos:");
          console.log(this.medicos);

          console.log("Especialidade do primeiro meido:");
          console.log(this.medicos[0].especialidade);

        }).catch(error => {
      console.error('Erro na requisição:', error);
    });

      },
      selecionarMedicos(event){
        this.MedicoSelecionado= event.target.value;
        //console.log(this.MedicoSelecionado);

      },
      

    }
  }

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
label {
  display: block;
  margin-bottom: 10px;
}
#dataConsulta {
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  background-color: #fff;
  padding: 3px 5px;
  box-shadow: inset 0 3px 6px rgba(0,0,0,0.1);
  width: 190px;
}
.form-especialidade{
  margin-top: 20px;
}
.form-nomeMedico{
  margin-top: 20px;
}

</style>