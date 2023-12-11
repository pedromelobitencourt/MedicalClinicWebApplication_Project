import * as mysql from 'mysql';
import { Connection } from 'mysql'
import { promisify } from 'util';
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });
const env = process.env;

const db_user = env.DB_USER;
const db_password = env.DB_PASSWORD;
const db_host = env.DB_HOST;
const db_database = env.DB_DATABASE;

let db: Connection | undefined;

async function connectToDB(): Promise<Connection> {
    return new Promise<Connection>((resolve, reject) => {
        if (db_user && db_password && db_host && db_database) {
            const connection = mysql.createConnection({
                host: db_host,
                user: db_user,
                password: db_password,
                database: db_database
            });

            connection.connect((err) => {
                if (err) {
                    console.error("Erro de conexão ao MySQL:", err);
                    reject(err);
                } else {
                    console.log("Conectado ao MySQL");
                    resolve(connection);
                }
            });
        } else {
            reject(new Error("Credenciais de banco de dados não fornecidas."));
        }
    });
}




async function getDB(): Promise<Connection> {
    if (!db) {
        db = await connectToDB();
    }

    return db;
}

export { getDB };
