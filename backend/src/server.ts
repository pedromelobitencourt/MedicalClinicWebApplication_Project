import cors from 'cors';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { getDB } from './db';
import { insertNewAddress, getAllEnderecos, deleteEnderecoByCep, getAllCeps } from './controllers/controllerBaseDeEnderecos';
import { getAllProntuarioRecords, insertNewProtuarioRecord, getDataFromId, getPacientNameFromId } from './controllers/controllerProntuario';
import { updateIdPaciente, updateAnamnese, updateAtestados, updateMedicamentos, deleteProntuario } from './controllers/controllerProntuario';
import { getAllPacientNames, getIdFromName, insertNewPaciente, getAllPacientes , deletePaciente, getPacienteById, updatePaciente } from './controllers/controllerPaciente';
import { getAllAgenda,getAgendaByMedicoId,insertNewAgenda,deleteAgendaById } from './controllers/controllerAgenda';

import { getAllMedicos, insertNewMedico, deleteMedico,getMedicosByEspecialidade,getMedicosNamesByEspecialidade, getMedicoNameById } from './controllers/controllerMedico';
import { getAllFuncionarios, insertNewFuncionario, deleteFuncionario, getFuncionarioById, getAllFuncionariosWithName, getAllFuncionariosNotMedicos, getFuncionarioNameFromId, getFuncionarioIdByEmail, updateSalarioFuncionario, updateDataContratoFuncionario, updateSenhaFuncionario } from './controllers/controllerFuncionario';
import { getAllPessoas, getAllPessoasNotFuncionario, getPessoaIdByName, insertNewPessoa, deletePessoa, getPessoaById, updatePessoaNome, updatePessoaEmail, updatePessoaTelefone, updatePessoaCep } from './controllers/controllerPessoa';
import { validateLogin } from './controllers/controllerLogin';

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

interface CustomError extends Error {
  code?: string; // ou o tipo apropriado da propriedade 'code'
}
process.env.TZ = 'UTC';
const app = express();
const env = process.env;
Intl.DateTimeFormat().resolvedOptions().timeZone = 'UTC';

if(env.PORT !== undefined) {
  const port: number = parseInt(env.PORT);

  app.use(cors());
  app.use(bodyParser.json());

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log('Fuso horário do Node.js:', process.env.TZ);
  });

  app.post('/addressRegistration', async (req: Request, res: Response) => {
    try {
      const { cep, estado, cidade, bairro, logradouro } = req.body;
  
      const address = { cep, estado, cidade, bairro, logradouro };
  
      await insertNewAddress(address);
  
      res.status(201).json({ message: 'Endereço cadastrado com sucesso' });
      res.send();
    } 
    catch (error) {  
      // Verifique se 'error' é do tipo CustomError
      if ((error as CustomError).code) {
        res.status(500).send((error as CustomError).code);
      } else {
        // Se 'code' não estiver presente, trate de outra forma
        res.status(500).json({ error: 'Erro desconhecido' });
      }
    }
  });

  app.get('/address', async (req: Request, res: Response) => {
    try {
      const response = await getAllEnderecos();

      res.status(201).send({ response });
      //console.log(res.getHeaders());
      console.log("Registros listados com sucesso!");
    } catch (error) {
      console.log("Pegou erro no getAllEnderecos");
      //Verifique se 'error' é do tipo CustomError
      if ((error as CustomError).code) {
        console.log(res.getHeaders());
        console.log((error as CustomError).code)
        console.log("2 repostas ");
        //res.status(500).send((error as CustomError).code);
      } else {
        console.log("3 repostas ");
        // Se 'code' não estiver presente, trate de outra forma
       // res.status(500).json({ error: 'Erro desconhecido' });
      }
    }
  });

  app.delete('/address/:cep', async (req: Request, res: Response) => {
    try {
      const cep = req.params.cep;
      const cepString = cep.toString();
  
      await deleteEnderecoByCep(cepString);
  
      res.status(200).json({ message: 'Endereço deletado com sucesso' });
      res.send();
    } 
    catch (error) {  
      // Verifique se 'error' é do tipo CustomError
      if ((error as CustomError).code) { 
        console.log((error as CustomError).code);
        res.status(500).send((error as CustomError).code);
      } else { 
        console.log(error);
        // Se 'code' não estiver presente, trate de outra forma
        res.status(500).json({ error: 'Erro desconhecido' }); 
      }
    }
  });
  app.get('/medicos/name/:especialidade', async (req: Request, res: Response) => {
    try {
      const especialidade = req.params.especialidade;

      //console.log('Valor da especialidade que chegou no server.ts:',  req.params.//especialidade);
  
      const listaMedicos = await getMedicosNamesByEspecialidade(especialidade);
  
      

      res.status(200).send(listaMedicos);

    } 
    catch (error) { 

      if ((error as CustomError).code) {
        res.status(500).send((error as CustomError).code);
      } else {
        
        res.status(500).json({ error: 'Erro desconhecido' });
      }
    }
  });

  app.get('/agenda/:medicoid', async (req: Request, res: Response) => {
    try {
      const medicoid = parseInt(req.params.medicoid);

      //console.log('valor do medicoId',  req.params.medicoid);
  
      const listaAgenda = await getAgendaByMedicoId(medicoid);
  
      //console.log('ListaAgenda',  listaAgenda);

      res.status(200).send(listaAgenda);

    } 
    catch (error) { 

      if ((error as CustomError).code) {
        res.status(500).send((error as CustomError).code);
      } else {
        
        res.status(500).json({ error: 'Erro desconhecido' });
      }
    }
  });

  app.get('/agenda', async (req: Request, res: Response) => {
    try {
      const agenda = await getAllAgenda();
      res.status(200).send(agenda);
    } catch (error) {
      // Verifique se 'error' é do tipo CustomError
      if ((error as CustomError).code) {
        res.status(500).send((error as CustomError).code);
      } else {
        // Se 'code' não estiver presente, trate de outra forma
        res.status(500).json({ error: 'Erro desconhecido' });
      }
    }
  });

  app.get('/medicos', async (req: Request, res: Response) => {
    try {
      const medicos = await getAllMedicos();
      console.log(medicos);
      res.status(200).send(medicos);
    } catch (error) {
      // Verifique se 'error' é do tipo CustomError
      if ((error as CustomError).code) {
        res.status(500).send((error as CustomError).code);
      } else {
        // Se 'code' não estiver presente, trate de outra forma
        res.status(500).json({ error: 'Erro desconhecido' });
      }
    }
  });

  app.get('/funcionarios', async (req: Request, res: Response) => {
    try {
      const funcionarios = await getAllFuncionarios();
      res.status(200).send(funcionarios);
    } catch (error) {
      // Verifique se 'error' é do tipo CustomError
      if ((error as CustomError).code) {
        res.status(500).send((error as CustomError).code);
      } else {
        // Se 'code' não estiver presente, trate de outra forma
        res.status(500).json({ error: 'Erro desconhecido' });
      }
    }
  });

  app.get('/pacientes', async (req: Request, res: Response) => {
    try {
      const pacientes = await getAllPacientes();
      res.status(200).send(pacientes);
    } catch (error) {
      // Verifique se 'error' é do tipo CustomError
      if ((error as CustomError).code) {
        res.status(500).send((error as CustomError).code);
      } else {
        // Se 'code' não estiver presente, trate de outra forma
        res.status(500).json({ error: 'Erro desconhecido' });
      }
    }
  });

  app.get('/pessoa', async (req: Request, res: Response) => {
    try {
      const response = await getAllPessoas();
      console.log(response);
      res.status(201).json(response);
      console.log("back ok");
    } catch (error) {
      // Verifique se 'error' é do tipo CustomError
      if ((error as CustomError).code) {
        res.status(500).send((error as CustomError).code);
      } else {
        // Se 'code' não estiver presente, trate de outra forma
        res.status(500).json({ error: 'Erro desconhecido' });
      }
    }
  });

  app.post('/medicos', async (req: Request, res: Response) => {
    try {
      const { crm, especialidade, funcionarioId } = req.body;
  
      const medico = { crm, especialidade, funcionarioId };
  
      await insertNewMedico(medico);
  
      res.status(201).json({ message: 'Médico cadastrado com sucesso' });
      res.send();
    } 
    catch (error) {  
      // Verifique se 'error' é do tipo CustomError
      if ((error as CustomError).code) {
        res.status(500).send((error as CustomError).code);
      } else {
        // Se 'code' não estiver presente, trate de outra forma
        res.status(500).json({ error: 'Erro desconhecido' });
      }
    }
  });
  app.post('/agenda', async (req: Request, res: Response) => {
    try {
      const { data, horario,name, email,medicoID,telefone } = req.body;
  
      const agenda = { data, horario,name, email,medicoID,telefone };
  
      console.log("Agenda que chegou no post backend",agenda)

      await insertNewAgenda(agenda);
  
      res.status(201).json({ message: 'Agenda cadastrada com sucesso' });
      res.send();
    } 
    catch (error) {  
      // Verifique se 'error' é do tipo CustomError
      if ((error as CustomError).code) {
        res.status(500).send((error as CustomError).code);
      } else {
        
        res.status(500).json({ error: 'Erro desconhecido' });
      }
    }
  });

  app.post('/funcionarios', async (req: Request, res: Response) => {
    try {
      const { dataContrato, salario, pessoaId, senha } = req.body;
  
      const funcionario = {  dataContrato, salario, pessoaId, senha };
  
      await insertNewFuncionario(funcionario);
  
      res.status(201).json({ message: 'Funcionário cadastrado com sucesso' });
      res.send();
    } 
    catch (error) {  
      // Verifique se 'error' é do tipo CustomError
      if ((error as CustomError).code) {
        res.status(500).send((error as CustomError).code);
      } else {
        // Se 'code' não estiver presente, trate de outra forma
        res.status(500).json({ error: 'Erro desconhecido' });
      }
    }
  });

  app.post('/pacientes', async (req: Request, res: Response) => {
    try {
      const { peso, altura, tipoSanguineo, pessoaId } = req.body;
  
      const paciente = { peso, altura, tipoSanguineo, pessoaId };
  
      await insertNewPaciente(paciente);
  
      res.status(201).json({ message: 'Paciente cadastrado com sucesso' });
      res.send();
    } 
    catch (error) {  
      // Verifique se 'error' é do tipo CustomError
      if ((error as CustomError).code) {
        res.status(500).send((error as CustomError).code);
      } else {
        // Se 'code' não estiver presente, trate de outra forma
        res.status(500).json({ error: 'Erro desconhecido' });
      }
    }
  });

  app.post('/pessoa', async (req: Request, res: Response) => {
    try {
      const { nome, telefone, email, enderecoCep } = req.body;
  
      const pessoa = { nome, telefone, email, enderecoCep };
  
      await insertNewPessoa(pessoa);
  
      res.status(201).json({ message: 'Pessoa cadastrada com sucesso' });
      res.send();
    } 
    catch (error) {  
      // Verifique se 'error' é do tipo CustomError
      if ((error as CustomError).code) {
        res.status(500).send((error as CustomError).code);
      } else {
        // Se 'code' não estiver presente, trate de outra forma
        res.status(500).json({ error: 'Erro desconhecido' });
      }
    }
  });

  app.delete('/medicos/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
  
      await deleteMedico(id);
  
      res.status(200).json({ message: 'Médico deletado com sucesso' });
      res.send();
    } 
    catch (error) {  
      // Verifique se 'error' é do tipo CustomError
      if ((error as CustomError).code) {
        res.status(500).send((error as CustomError).code);
      } else {
        // Se 'code' não estiver presente, trate de outra forma
        res.status(500).json({ error: 'Erro desconhecido' });
      }
    }
  });

  app.delete('/funcionarios/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
  
      await deleteFuncionario(id);
  
      res.status(200).json({ message: 'Funcionário deletado com sucesso' });
      res.send();
    } 
    catch (error) {  
      // Verifique se 'error' é do tipo CustomError
      if ((error as CustomError).code) { 
        res.status(500).send((error as CustomError).code);
      } else { 
        // Se 'code' não estiver presente, trate de outra forma
        res.status(500).json({ error: 'Erro desconhecido' }); 
      }
    }
  });
  app.delete('/agenda/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
  
      await deleteAgendaById(id);
  
      res.status(200).json({ message: 'Agenda deletada com sucesso' });
      res.send();
    } 
    catch (error) {  
      // Verifique se 'error' é do tipo CustomError
      if ((error as CustomError).code) { 
        res.status(500).send((error as CustomError).code);
      } else { 
        // Se 'code' não estiver presente, trate de outra forma
        res.status(500).json({ error: 'Erro desconhecido' }); 
      }
    }
  });

  app.delete('/pacientes/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
  
      await deletePaciente(id);
  
      res.status(200).json({ message: 'Paciente deletado com sucesso' });
      res.send();
    } 
    catch (error) {  
      // Verifique se 'error' é do tipo CustomError
      if ((error as CustomError).code) { 
        res.status(500).send((error as CustomError).code);
      } else { 
        // Se 'code' não estiver presente, trate de outra forma
        res.status(500).json({ error: 'Erro desconhecido' }); 
      }
    }
  });
  
  app.delete('/pessoa/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
  
      await deletePessoa(id);
  
      res.status(200).json({ message: 'Pessoa deletada com sucesso' });
      res.send();
    } 
    catch (error) {  
      // Verifique se 'error' é do tipo CustomError
      if ((error as CustomError).code) { 
        res.status(500).send((error as CustomError).code);
      } else { 
        // Se 'code' não estiver presente, trate de outra forma
        res.status(500).json({ error: 'Erro desconhecido' }); 
      }
    }
  });


  app.get('/handbook', async (req: Request, res: Response) => {
    try {
      const response = await getAllProntuarioRecords();
      res.status(201).json({ response });
      // res.send();
    }
    catch (error) {
      console.error(error);
    }
  });

  app.post('/handbook', async (req: Request, res: Response) => {
    try {
      const { anamnese, medicamentos, atestados, name } = req.body;

      const idResponse = await getIdFromName(name);
      
      if(idResponse) {
        const id = idResponse.id;
        const handbook = { id, anamnese, medicamentos, atestados };

        await insertNewProtuarioRecord(handbook);

        res.status(201).json({ message: 'Endereço cadastrado com sucesso' });
        res.send();
      }
      else throw new Error("ID é undefined")
    }
    catch (error) {
      res.status(500).json({ error });
    }
  });

  app.get('/pacients/name', async (req: Request, res: Response) =>{
    try {
      const response = await getAllPacientNames();

      res.status(201).json({ message: 'Nomes listados com sucesso', response });
      res.send();
    }
    catch (error) {
      res.status(500).json({ error });
    }
  });

  app.get('/handbook/:id/edit', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const numberId = parseInt(id);
      const dataResponse = await getDataFromId(numberId);
      const name = await getPacientNameFromId(numberId);

      console.log(name, numberId);

      if(name !== undefined && dataResponse) {
        const response = { ...dataResponse[0], ...name }

        console.log("handbook response", response)

        res.status(201).json({ message: 'Prontuário com id específico obtido com sucesso', response });
      }
      else throw new Error('name é undefined ou não tem a propriedade name')
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  app.put('/handbook/:id/edit', async (req: Request, res: Response) => {
    try {
      const { anamnese, medicamentos, atestados, name, id } = req.body;
      const pacientId = await getIdFromName(name);
      if(pacientId !== undefined){
        const [ updateIdResponse, updateAnamneseResponse, updateMedicamentosResponse, updateAtestadosResponse ] = 
        await Promise.all
        ([updateIdPaciente(id, pacientId.id), updateAnamnese(id, anamnese), updateMedicamentos(id, medicamentos),
          updateAtestados(id, atestados)]);
        
        return { updateIdResponse, updateAnamneseResponse, updateMedicamentosResponse, updateAtestadosResponse }
      }
      else throw new Error("update handbook error")
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  app.delete('/handbook/:id/delete', async (req: Request, res: Response) => {
    try {
      const handbookId = req.params.id;
      const handbookNumberId = parseInt(handbookId);
      
      await deleteProntuario(handbookNumberId);

      res.status(201).json({ message: `Prontuário com o id ${handbookId} deletado com sucesso` });
      res.send();
    }
    catch(error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  app.get('/employees', async (req: Request, res: Response) => {
    try {
      const response = await getAllFuncionariosWithName();

      res.status(201).json({ response });
      res.send();
    }
    catch (error) {
      console.error(error);
    }
  });

  app.get('/employees/create', async (req: Request, res: Response) => {
    try {
      const response = await getAllPessoasNotFuncionario();

      res.status(201).json({ response });
      res.send();
    }
    catch (error) {
      console.error(error);
    }
  });

  app.post('/employees/name', async (req: Request, res: Response) => {
    try {
      const { anamnese, medicamentos, atestados, name } = req.body;

      const idResponse = await getIdFromName(name);
      
      if(idResponse) {
        const id = idResponse.id;
        const handbook = { id, anamnese, medicamentos, atestados };

        await insertNewProtuarioRecord(handbook);

        res.status(201).json({ message: 'Endereço cadastrado com sucesso' });
        res.send();
      }
      else throw new Error("ID é undefined")
    }
    catch (error) {
      res.status(500).json({ error });
    }
  });

  app.post('/employees', async (req: Request, res: Response) => {
    try {
      const { dataContrato, salario, name, senha } = req.body;
      
      const idResponse = await getPessoaIdByName(name);

      const [year, month, day] = dataContrato.split("-");
      const dateObject = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      const numberSalario = parseInt(salario);
      
      if(idResponse !== undefined && idResponse.id) {
        const id = idResponse.id;
        await insertNewFuncionario({ dataContrato: dateObject, salario: numberSalario, pessoaId: id, senha })

        res.status(201).json({ message: 'Funcionário cadastrado com sucesso' });
        res.send();
      }
      else throw new Error("ID é undefined")
    }
    catch (error) {
      res.status(500).json({ error });
    }
  });

  app.get('/employees/:id/edit', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const numberId = parseInt(id);
      const dataResponse = await getFuncionarioById(numberId);
      const name = await getFuncionarioNameFromId(numberId);

      console.log(name, numberId);

      if(name !== undefined && dataResponse && name.name) {
        const response = { ...dataResponse, ...name };

        console.log("funcionario response", response)

        res.status(201).json({ message: 'Funcionario com id específico obtido com sucesso', response });
      }
      else throw new Error('name é undefined ou não tem a propriedade name')
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  app.put('/employees/:id/edit', async (req: Request, res: Response) => {
    try {
      const { id, pessoaId, name, salario, dataContrato, senha } = req.body;
      console.log(id, pessoaId, name, salario, senha)
      const [ updateSalarioFuncionarioResponse, updateDataContratoFuncionarioResponse, updateSenhaFuncionarioResponse ] = 
      await Promise.all
      ( [updateSalarioFuncionario(id, salario), updateDataContratoFuncionario(id, dataContrato), updateSenhaFuncionario(id, senha) ]);
      
      return { updateSalarioFuncionarioResponse, updateDataContratoFuncionarioResponse, updateSenhaFuncionarioResponse }
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  app.delete('/employees/:id/delete', async (req: Request, res: Response) => {
    try {
      const employeeId = req.params.id;
      const employeeNumberId = parseInt(employeeId);

      console.log('o id eh', employeeNumberId)
      
      await deleteFuncionario(employeeNumberId);

      res.status(201).json({ message: `Funcionário com o id ${employeeNumberId} deletado com sucesso` });
      res.send();
    }
    catch(error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  app.get('/people', async (req: Request, res: Response) => {
    try {
      const response = await getAllPessoas();
      console.log("people", response)

      res.status(201).json({ response });
      res.send();
    }
    catch (error) {
      console.error(error);
    }
  });

  app.post('/person', async (req: Request, res: Response) => {
    try {
      const { nome, email, telefone, enderecoCep } = req.body;
      console.log(nome, email, telefone, enderecoCep);

      const person = { nome, email, telefone, enderecoCep }
      
      await insertNewPessoa(person);

      res.status(201).json({ message: 'Pessoa cadastrada com sucesso' });
      res.send();
    }
    catch (error) {
      res.status(500).json({ error });
    }
  });

  app.get('/person/:id/edit', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const numberId = parseInt(id);
      const dataResponse = await getPessoaById(numberId);

      console.log(dataResponse);

      if(dataResponse) {
        const response = { ...dataResponse};

        console.log("pessoa response", response)

        res.status(201).json({ message: 'Pessoa com id específico obtida com sucesso', response });
      }
      else throw new Error('dataResponse no person é undefined ou não tem a propriedade name')
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  app.put('/person/:id/edit', async (req: Request, res: Response) => {
    try {
      const { id, nome, email, telefone, enderecoCep } = req.body;
      console.log(id, nome, email, telefone, enderecoCep)

      const [ updatePessoaNomeResponse, updatePessoaEmailResponse, updatePessoaTelefoneResponse, updatePessoaCepResponse ] = await
          Promise.all([updatePessoaNome(id, nome), updatePessoaEmail(id, email), updatePessoaTelefone(id, telefone), updatePessoaCep(id, enderecoCep)])

      const response =  { updatePessoaNomeResponse, updatePessoaEmailResponse, updatePessoaTelefoneResponse, updatePessoaCepResponse }
      res.status(201).json({ message: 'Pessoa com id específico modificada com sucesso', response });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  app.get('/ceps', async (req: Request, res: Response) => {
    try {
      const response = await getAllCeps();
      res.status(201).json({ message: 'Ceps obtidos com sucesso', response });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  app.delete('/person/:id/delete', async (req: Request, res: Response) => {
    try {
      const personId = req.params.id;
      const personNumberId = parseInt(personId);

      console.log('o id de person eh', personNumberId)
      
      await deletePessoa(personNumberId);

      res.status(201).json({ message: `Pessoa com o id ${personNumberId} deletado com sucesso` });
      res.send();
    }
    catch(error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  app.post('/login', async (req: Request, res: Response) => {
    const { email, senha } = req.body;
    console.log(email, senha)

    try {
      await validateLogin(email, senha);
      const id = await getFuncionarioIdByEmail(email);
      console.log("id funcionario", id);
      res.status(201).json({ message: `Login realizado com sucesso`, response: { email, senha, id } });
    }
    catch(error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });
  

  app.get('/paciente/:id/edit', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const numberId = parseInt(id);
      console.log(numberId);
      const dataResponse = await getPacienteById(numberId);
      console.log(dataResponse);


      if(dataResponse) {
        const response = dataResponse;

        console.log("paciente response", response)

        res.status(201).json({ message: 'Paciente com id específico obtido com sucesso', response });
      }
      else throw new Error('Não obteve Resposta do banco de dados')
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  app.put('/paciente/:id/edit', async (req: Request, res: Response) => {
    try {
      const  { id } = req.params;
      const numberId = parseInt(id);
      const { peso, altura, tipoSanguineo } = req.body;
      await updatePaciente( peso, altura, tipoSanguineo, numberId);
      res.status(201).send({ message: 'Paciente atualizado com sucesso' });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  app.get('/doctor/create/employees', async (req: Request, res: Response) => {
    try {
      console.log("antes")
      const response = await getAllFuncionariosNotMedicos();
      console.log("depos");
      res.status(201).send({ message: 'Funcionários que não são médicos obtidos', response });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });

  interface BloodType {
    type: string;
  }

  app.get('/people/blood-types', async (req: Request, res: Response) => {
    const bloodTypes: BloodType[] = [
      { type: "A+" },
      { type: "A-" },
      { type: "B+" },
      { type: "B-" },
      { type: "AB+" },
      { type: "AB-" },
      { type: "O+" },
      { type: "O-" }
  ];
  
    res.status(201).send({ bloodTypes });
  });
}
