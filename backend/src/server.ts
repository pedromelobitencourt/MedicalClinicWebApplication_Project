import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getDB, insertNewAddress } from './db';
import { getAllProntuarioRecords, insertNewProtuarioRecord } from './controllers/controllerProntuario';
import { getAllPacientNames, getIdFromName } from './controllers/controllerPaciente';

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

  app.get('/handbook', async (req: Request, res: Response) => {
    try {
      const response = await getAllProntuarioRecords();
      res.status(201).json({ response });
      res.send();
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
  })
}
