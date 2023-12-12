<template>
 <div class="auth-wrapper">
      <div class="auth-inner">
        <h3>Agendamento de consulta</h3>
        <form @submit.prevent="efetuarAgendamento" >
          <div class="form-especialidade">
            <label for="MedicoSelecionado">Selecione a especialidade:</label>
            <select class="form-select" aria-label=""  v-model="EspecialidadeSelecionada"
            @change="selecionarMedicos($event)">
                  <option selected value="" >Selecione a especialidade Desejada</option>
                  <option v-for="espec in especialidades"   :key="espec" :value="espec">
                    {{ espec}}</option>
                
          </select>

          </div>

          <div class="form-nomeMedico">

            <label for="MedicoSelecionado">Selecione o médico/a:</label>
            <select class="form-select" aria-label="" v-model="MedicoSelecionado"
            @change="selecionarDataEHorario($event)">
                  <option selected  value="">Selecione o nome do medico/a</option>
                  <option v-for="medico in medicos"   :key="medico.id" :value="medico.id">{{ medico.name }}</option>
                  
          </select>

          </div>

          <div class="form-dataConsulta" style="margin-top: 20px;">

            <label for="dataConsulta">Data da consulta:</label>
            
            <b-form-datepicker v-model="dataC" :date-disabled-fn="dateDisabled" locale="pt-br" name="dataConsulta" id="dataConsulta" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" date-format="d/m/Y" @input="atualizarHorariosDisponiveis"
            >
            
            </b-form-datepicker>

            
          </div>

          <div class="form-horarioEscolhido"  style="margin-top: 20px;">

            <label for="horaConsulta">Horario da consulta:</label>
            <select class="form-select" v-model="HorarioSelecionado">
              <option selected value="" >Selecione o horario desejado</option>
              <option v-for="hora in ListaPadrao"   :key="hora" :value="hora">
                    {{ hora}}hrs</option>
            </select>

          </div>
          
          <h4 style="margin-top: 20px;">Dados pessoais</h4>

          <div class="form-group my-3">
                <label class="mb-1">Nome</label>
                <input type="text" class="form-control" v-model="NomeP" placeholder="Nome do paciente" id="nomePaciente" >
            </div>

            <div class="form-group my-3">
              <label class="mb-1">Email</label>
              <input type="email" class="form-control mb-1" placeholder="Email" v-model="EmailP">
          
            </div>

            <div class="form-group my-3">
                <label class="mb-1">Telefone</label>
                <input type="text" class="form-control" v-model="TelefoneP" placeholder="Telefone do paciente" id="Telefone" :readonly="isStreetReadOnly">
            </div>



            <button type="submit" class="btn btn-primary w-100" >Agendar consulta</button>
        </form>

        <b-modal v-model="showSuccessPopup" title="Sucesso" @hide="resetScreen">
        <p>Agendamento realizado com sucesso!</p>
        <template #modal-footer="{ ok }">
          <b-button @click="ok">Ok</b-button>
        </template>
      </b-modal>

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
        Datas:[],
        DatasEHorariosOcupados:{},
        value: '',
        EspecialidadeSelecionada:'',
        MedicoSelecionado:'',
        DataSelecionada:'',
        HorarioSelecionado:'',
        dataC:'',
        HorariosDisponiveis:[],
        ListaPadrao:["8","9","10","11","12","13","14","15","16","17"],
        TelefoneP:'',
        NomeP:'',
        EmailP:'',
        showSuccessPopup: false,
      }
    },
    mounted() {
    // eslint-disable-next-line no-console
    console.log("carregado.");
    this.carregarMedicos();
  },
    methods: {
      dateDisabled(ymd) {


      // const hoje = new Date();
      // const [ano, mes, dia] = ymd.split('-').map(Number);
      // const dataSelecionada = new Date(ano, mes - 1, dia);

      // // Desabilita datas anteriores à data atual
      // return dataSelecionada < hoje;
        // console.log("datepicker",this.DatasEHorariosOcupados);
        
        
        for (const chave in this.DatasEHorariosOcupados) {
          const lista = this.DatasEHorariosOcupados[chave];

          // console.log(`Chave: ${chave}`);
          
          for (const valor of lista) {
            let tamanhoMax = 0;
            // console.log(`  Valor: ${valor}`);
            tamanhoMax =+ tamanhoMax+1;
            // console.log("tamnhoMax",tamanhoMax)
            
            if(tamanhoMax>=10){
            //   const [ano, mes, dia] = chave.split('-').map(Number);


            // const dataObj = new Date(ano, mes - 1, dia);
            
            return chave===ymd;

            }
          }}
          
          
          

        

        
        // const weekday = date.getDay()
        // const day = date.getDate()
      
        
      },

      carregarMedicos(){
        axios.get('http://localhost:8000/medicos').then(res =>{

       
          
          const especialidadesSet = new Set(res.data.map(med => med.especialidade));
      
        this.especialidades = Array.from(especialidadesSet);

         




        }).catch(error => {
      console.error('Erro na requisição:', error);
    });

      },
      selecionarMedicos(event){
         this.EspecialidadeSelecionada = event.target.value;


        
         
         if(this.EspecialidadeSelecionada !=='' &&this.EspecialidadeSelecionada !==null){

          

          
          
        

        axios.get(`http://localhost:8000/medicos/name/${this.EspecialidadeSelecionada}`)
        .then((response) => {
          
          this.medicos = response.data;
        })
        .catch((error) => {
          console.error('Erro na requisição ao backend (controllerMedicos):', error);
        });

    

      }
      },
      selecionarDataEHorario(event){
        this.MedicoSelecionado = event.target.value;
        console.log("Id do medico selecionado:",this.MedicoSelecionado);


        


        
         
         if(this.MedicoSelecionado !=='' &&this.MedicoSelecionado !==null){

          

          
          
        

        axios.get(`http://localhost:8000/agenda/${this.MedicoSelecionado}`)
        .then((response) => {
          
          this.Datas = response.data;
          console.log("Datas da agenda:",this.Datas);
       
          this.DatasEHorariosOcupados = {};
        
          for (const obj of this.Datas) {
          const chave =  obj.data.split("T")[0].slice(0,10);
          console.log("Chave selecionada:",chave);

          this.DatasEHorariosOcupados[chave] = [];

          for (const obj2 of this.Datas) {

          

            if(chave===obj2.data.split("T")[0].slice(0,10)){
              console.log("Hora Selecionada:",obj2.data.split("T")[1]
              .slice(0,2));

              this.DatasEHorariosOcupados[chave].push(obj2.data.split("T")[1]
              .slice(0,2));

            }
            
          }
        }
        })
        .catch((error) => {
          console.error('Erro na requisição ao backend (controllerAgenda):', error);
        });

        
        
      }

      },
      atualizarHorariosDisponiveis(){
        console.log("Data escolhida:", this.dataC);
        for (const chave in this.DatasEHorariosOcupados) {
          const lista = this.DatasEHorariosOcupados[chave];
          // console.log(`Chave: ${chave}`);

          if(chave === this.dataC){
            for (const valor of lista) {

              console.log(this.ListaPadrao, lista);

              this.ListaPadrao = this.ListaPadrao.filter(itemB => !lista.includes(itemB));
            
              console.log("Horarios disponiveis:", this.HorariosDisponiveis);
          }
          }

         
          }},
           async efetuarAgendamento(){
            try {
              const dataCompletaString = this.dataC + " " + this.HorarioSelecionado + ":00:00";
              const dataCompleta = new Date(dataCompletaString);
              const dataFormatada = dataCompleta.toISOString();
              const novaData =  new Date(dataFormatada);

              console.log(novaData,this.NomeP,this.EmailP,this.TelefoneP,parseInt(this.MedicoSelecionado))
                    const response = await axios.post('http://localhost:8000/agenda', {
                      
                      data: novaData,
                      horario: "tarde",
                      name:this.NomeP ,
                      email:this.EmailP,
                      medicoID:parseInt(this.MedicoSelecionado),
                      telefone:this.TelefoneP
                      
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

              


                    if (response.status === 201) {
                        //const msg = "Agendamento realizado com sucesso";
                        this.showSuccessPopup = true;
                        
                    } else {
                        //const msg = "Ocorreu um erro inesperado 1";
                        
                    }
                } 
                catch (error) {
                  console.error("Erro ao agendar consulta:", error);

              if (error.response) {
                  console.error("Status da resposta:", error.response.status);
                  console.error("Dados da resposta:", error.response.data);
                  console.error("Cabeçalhos da resposta:", error.response.headers);
              } else if (error.request) {
                  console.error("Erro na solicitação:", error.request);
              } else {
                  console.error("Erro durante a configuração da solicitação:", error.message);
              }

                    
                }
          },
          resetScreen() {
      this.showSuccessPopup = false;
      location.reload();
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
 margin-bottom: 100px;
 margin-top: 100px;
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