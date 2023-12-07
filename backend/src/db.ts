import mysql from 'mysql';
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });
const env = process.env;

const db_user = env.DB_USER;
const db_password = env.DB_PASSWORD;
const db_host = env.DB_HOST;
const db_database = env.DB_DATABASE;

let db;

if(db_user && db_password && db_host && db_database) {
    const db = mysql.createConnection({
        host: db_host,
        user: db_user,
        password: db_password,
        database: db_database
    });

    db.connect((err) => {
        if(err)
            console.error("Erro de conexão ao MySQL:", err);
        else
            console.log("Conectado ao MySQL");
    });
}

export { db };