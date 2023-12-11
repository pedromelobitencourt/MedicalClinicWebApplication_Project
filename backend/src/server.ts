import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { db, insertNewAddress } from './db';
import { insertNewMedico, getAllMedicos, getMedicosByEspecialidade, deleteMedico} from './controllers/controllerMedico';


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
  app.get('/medico', async (req: Request, res: Response) => {
    try {
      const response = await getAllMedicos();
      res.status(200).json({ response });
      
      
    }
    catch (error) {
      console.error(error);
    }
  });
}
