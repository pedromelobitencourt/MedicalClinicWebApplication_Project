import express, { Request, Response } from 'express';
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });


const app = express();
const env = process.env;

if(env.PORT !== undefined) {
  const port: number = parseInt(env.PORT);

  console.log(env.DB_USER);
  console.log(env.PORT, typeof(env.PORT));
  console.log(env.DB_PASSWORD);

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
