import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { db } from './db';
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });


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

  app.post('/addressRegistration', (req: Request, res: Response) => {
    try {
      const { cep, estado, cidade, bairro, logradouro } = req.body; // Analisar o corpo da solicitação como JSON

      console.log(cep, estado, cidade, bairro, logradouro);
    }
    catch(error) {
      console.log(error);
    }
  })
}
