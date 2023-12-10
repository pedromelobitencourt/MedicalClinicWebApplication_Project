import { getDB } from '../db';
import { promisify } from 'util';


type Pessoa = {
    id: number,
    nome: string,
    telefone: string,
    email: string,
    enderecoCep: number
};

async function insertNewPessoa(pessoa: Pessoa): Promise<void> {
    const sql = 'INSERT INTO Pessoa (nome, telefone, email, enderecoCep) VALUES (?, ?, ?, ?)';
    const values = [pessoa.nome, pessoa.telefone, pessoa.email, pessoa.enderecoCep]; // Replace with your actual column names

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        await query({ sql, values });
        console.log("Pessoa inserida com sucesso!");
    } 
    catch (error) {
        throw error;
    }
}

async function getPessoaById(id: number): Promise<Pessoa> {
    const sql = 'SELECT * FROM Pessoa WHERE id = ?';
    const values = [id];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const pessoa = await query({ sql, values });

        if (pessoa.length > 0) {
            return pessoa[0];
        } else {
            throw new Error("Pessoa não encontrada");
        }
    } 
    catch (error) {
        throw error;
    }
}

async function getAllPessoas(): Promise<Pessoa[]> {
    const sql = 'SELECT * FROM Pessoa';

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const pessoas = await query(sql);

        return pessoas;
    } 
    catch (error) {
        throw error;
    }
}