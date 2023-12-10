import { getDB } from '../db';
import { promisify } from 'util';


type Pessoa = {
    id: number,
    nome: string,
    telefone: string,
    email: string,
    enderecoCep: number
};

type Funcionario = {
    id: number,
    dataContrato: Date,
    salario: number,
    pessoaId: number
};

async function insertNewFuncionario(funcionario: Funcionario): Promise<void> {
    const sql = 'INSERT INTO Funcionario (dataContrato, salario, pessoaId) VALUES (?, ?, ?)';
    const values = [funcionario.dataContrato, funcionario.salario, funcionario.pessoaId]; // Replace with your actual column names

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        await query({ sql, values });
        console.log("Funcionário inserido com sucesso!");
    } 
    catch (error) {
        throw error;
    }
}

async function getFuncionarioById(id: number): Promise<Funcionario> {
    const sql = 'SELECT * FROM Funcionario WHERE id = ?';
    const values = [id];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const funcionario = await query({ sql, values });

        if (funcionario.length > 0) {
            return funcionario[0];
        } else {
            throw new Error("Funcionário não encontrado");
        }
    }
    catch (error) {
        throw error;
    }
}

async function getAllFuncionarios(): Promise<Funcionario[]> {
    const sql = 'SELECT * FROM Funcionario';

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const funcionarios = await query(sql);

        return funcionarios;
    }
    catch (error) {
        throw error;
    }
}

export { insertNewFuncionario, getFuncionarioById, getAllFuncionarios };