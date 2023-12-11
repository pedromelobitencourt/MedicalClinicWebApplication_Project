import cors from 'cors';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { db, insertNewAddress } from './db';
import { getAllMedicos, insertNewMedico } from './controllers/controllerMedico';
import { getAllFuncionarios, insertNewFuncionario } from './controllers/controllerFuncionario';
import { getAllPacientes, insertNewPaciente } from './controllers/controllerPaciente';
import { getAllPessoas, insertNewPessoa } from './controllers/controllerPessoa';
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

interface CustomError extends Error {
  code?: string; // ou o tipo apropriado da propriedade 'code'
}

const app = express();
const env = process.env;

if(env.PORT !== undefined) {
  const port: number = parseInt(env.PORT);

  app.use(cors());
  app.use(bodyParser.json());

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });

  app.get('/medicos', async (req: Request, res: Response) => {
    try {
      const medicos = await getAllMedicos();
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
      const pessoas = await getAllPessoas();
      res.status(200).send(pessoas);
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

  app.post('/funcionarios', async (req: Request, res: Response) => {
    try {
      const { dataContrato, salario, pessoaId } = req.body;
  
      const funcionario = {  dataContrato, salario, pessoaId };
  
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
}
