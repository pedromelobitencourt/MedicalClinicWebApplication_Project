<template>
 <div class="auth-wrapper">
      <div class="auth-inner">
        <h3>Agendamento de consulta</h3>
        <form @submit.prevent="efetuarAgendamento" >
          <div class="form-especialidade">
            <label for="EspecialidadeSelecionada">Selecione a especialidade:</label>
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
            
            <b-form-datepicker v-model="dataC" :date-disabled-fn="dateDisabled" locale="pt-br" name="dataConsulta" id="dataConsulta" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" date-format="d/m/Y" @input="atualizarHorariosDisponiveis" :disabled="!this.MedicoSelecionado"
            >
            
            </b-form-datepicker>

            
          </div>

          <div class="form-horarioEscolhido"  style="margin-top: 20px;">

            <label for="horaConsulta">Horario da consulta:</label>
            <select class="form-select" v-model="HorarioSelecionado" 
            :disabled="!this.MedicoSelecionado||!this.dataC">
              <option selected value="" >Selecione o horario desejado</option>
              <option v-for="hora in HorariosDisponiveis"   :key="hora" :value="hora">
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

      <b-modal v-model="showWarningModal" title="Aviso">
    <p>Por favor, preencha todos os campos antes de agendar.</p>
    <template #modal-footer="{ ok }">
      <b-button @click="ok">OK</b-button>
    </template>
  </b-modal>



      </div>
    </div>

</template>

<script>
import axios from 'axios';
import moment from 'moment';


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
        showWarningModal: false
      }
    },
    mounted() {
    // eslint-disable-next-line no-console
    console.log("carregado.");
    this.carregarMedicos();
  },
    methods: {
      dateDisabled(ymd) {


      
        // console.log("datepicker",this.DatasEHorariosOcupados);
        
        let DiaCheio =  false;

        for (const chave in this.DatasEHorariosOcupados) {
          const lista = this.DatasEHorariosOcupados[chave];
          
          //console.log("DateDisabled, chave e lista:",chave,lista );
          // console.log(`Chave: ${chave}`);
          let tamanhoMax = 0;
          for (const valor of lista) {
            
            // console.log(`  Valor: ${valor}`);
            tamanhoMax = tamanhoMax+1;
            // console.log("tamnhoMax",tamanhoMax)
            //console.log("tamanhoMax da dupla acima",tamanhoMax);
            if(tamanhoMax>=10){
            //   const [ano, mes, dia] = chave.split('-').map(Number);


            // const dataObj = new Date(ano, mes - 1, dia);
            
           DiaCheio = chave===ymd;

            }


          }}
          
          
          

        const hoje = new Date().setHours(0,0,0,0);//formato aparece estranho no console
        //console.log("data atual: ",hoje );
      const [ano, mes, dia] = ymd.split('-').map(Number);
      const dataSelecionada = new Date(ano, mes - 1, dia);
      //console.log("data selecionada: ",dataSelecionada );
      //console.log("resultado logico: ",dataSelecionada < hoje );


      // Desabilita datas anteriores à data atual
      return (dataSelecionada < hoje)||(DiaCheio);

        
        // const weekday = date.getDay()
        // const day = date.getDate()
      
        
      },

      async carregarMedicos(){
        await axios.get('http://localhost:8000/medicos').then(res =>{

       
          
          const especialidadesSet = new Set(res.data.map(med => med.especialidade));
      
        this.especialidades = Array.from(especialidadesSet);

         
          console.log("carregarMedicos, Lista de especialidades:",this.especialidades);



        }).catch(error => {
      console.error('Erro na requisição:', error);
    });

      },
      async selecionarMedicos(event){
         this.EspecialidadeSelecionada = event.target.value;


        
         
         if(this.EspecialidadeSelecionada !=='' &&this.EspecialidadeSelecionada !==null){

          

          
          
        

        await axios.get(`http://localhost:8000/medicosname/${this.EspecialidadeSelecionada}`)
        .then((response) => {
          
          this.medicos = response.data;
          console.log("Selecionar medicos, lista de medicos selecionados",this.medicos);
        })
        .catch((error) => {
          console.error('Erro na requisição ao backend (controllerMedicos):', error);
        });

    

      }
      },
      async selecionarDataEHorario(event){
        this.MedicoSelecionado = event.target.value;
        console.log("Id do medico selecionado:",this.MedicoSelecionado);


        


        
         
         if(this.MedicoSelecionado !=='' &&this.MedicoSelecionado !==null){

          

          
          
        

        await axios.get(`http://localhost:8000/agenda/${this.MedicoSelecionado}`)
        .then((response) => {
          
          this.Datas = response.data;
         // console.log("Datas da agenda:dia e horario",this.Datas);
       
          this.DatasEHorariosOcupados = {};
        
          for (const obj of this.Datas) {
          const chave =  obj.data.split("T")[0].slice(0,10);
          //console.log("Chave selecionada:",chave);

          this.DatasEHorariosOcupados[chave] = [];

          for (const obj2 of this.Datas) {

          

            if(chave===obj2.data.split("T")[0].slice(0,10)){
              
              //console.log("Hora Selecionada:",obj2.data.split("T")[1]
              //.slice(0,2));

              this.DatasEHorariosOcupados[chave].push(obj2.data.split("T")[1]
              .slice(0,2));

            }
            
          }

         
        }
        console.log("Dicionario DatasEHorariosOcupados:",this.DatasEHorariosOcupados);
        })
        .catch((error) => {
          console.error('Erro na requisição ao backend (controllerAgenda):', error);
        });

        
        
      }

      },
      atualizarHorariosDisponiveis(){
        console.log("DataC, data escolhida:", this.dataC);

        this.HorariosDisponiveis = this.ListaPadrao;

        for (const chave in this.DatasEHorariosOcupados) {
          const lista = this.DatasEHorariosOcupados[chave];
           //console.log("comparacao",chave === this.dataC);

          if(chave === this.dataC){
           

              console.log("lista escolhida, lista padrao:",lista,this.ListaPadrao);

              this.HorariosDisponiveis = this.ListaPadrao.filter(itemB => !lista.includes(itemB));
            
              console.log("HorariosDisponiveis,Horarios disponiveis:", this.HorariosDisponiveis);
          
          }

         
          }},
           async efetuarAgendamento(){
            if (!this.dataC || !this.HorarioSelecionado || !this.NomeP || !this.EmailP || !this.MedicoSelecionado || !this.TelefoneP) {
              
              console.error("Por favor, preencha todos os campos antes de agendar.");
              this.showWarningModal = true;
              
              return;
            }
            try {
              const dataCompletaString = this.dataC + " " + this.HorarioSelecionado + ":00:00";
              //const dataCompleta = new Date(dataCompletaString);
              const dataCompleta = moment.utc(dataCompletaString);

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