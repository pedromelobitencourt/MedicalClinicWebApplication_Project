import { getDB } from '../db';
import { promisify } from 'util';


type Pessoa = {
    id?: number,
    nome: string,
    telefone: string,
    email: string,
    enderecoCep: string
};

type PessoaId = {
    id: number
}

async function insertNewPessoa(pessoa: Pessoa): Promise<void> {
    const sql = 'INSERT INTO Pessoa (name, email, telefone, enderecoCep) VALUES (?, ?, ?, ?)';
    const values = [pessoa.nome, pessoa.email, pessoa.telefone, pessoa.enderecoCep]; // Replace with your actual column names

    let connection;
//
    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        await query({ sql, values });
        console.log("Pessoa inserida com sucesso!");
    } 
    catch (error) {
        console.log(error);
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

        const pessoa = await query({ sql, values }) as Pessoa[];

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

async function getAllPessoas() {
    const sql = 'SELECT * FROM Pessoa';

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const pessoas = await query(sql) as Pessoa[];

        return pessoas;
    } 
    catch (error) {
        throw error;
    }
}

async function updatePessoaNome(id: number, name: string) {
    const sql = `UPDATE Pessoa
                    SET name = ?
                    WHERE id = ?;
                `;
    const values = [ name, id ];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const pessoas = await query({ sql, values });
        return pessoas;
    } 
    catch (error) {
        throw error;
    }
}

async function updatePessoaEmail(id: number, email: string) {
    const sql = `UPDATE Pessoa
                    SET email = ?
                    WHERE id = ?;    
                `;
    const values = [ email, id ];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const pessoas = await query({ sql, values });
        return pessoas;
    } 
    catch (error) {
        throw error;
    }
}

async function updatePessoaTelefone(id: number, telefone: string) {
    const sql = `UPDATE Pessoa
                    SET telefone = ?
                    WHERE id = ?;    
                `;
    const values = [ telefone, id ];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const pessoas = await query({ sql, values });
        return pessoas;
    } 
    catch (error) {
        throw error;
    }
}

async function updatePessoaCep(id: number, cep: string) {
    const sql = `UPDATE Pessoa
                    SET enderecoCep = ?
                    WHERE id = ?;    
                `;
    const values = [ cep, id ];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const pessoas = await query({ sql, values });
        return pessoas;
    } 
    catch (error) {
        throw error;
    }
}

async function deletePessoa(id: number): Promise<void> {
    const sql = 'DELETE FROM Pessoa WHERE id = ?';
    const values = [id];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        await query({ sql, values });
    } 
    catch (error) {
        throw error;
    }
}

async function getAllPessoasNotFuncionario(): Promise<Pessoa[]> {
    const sql = `SELECT Pessoa.id, Pessoa.name, Pessoa.email, Pessoa.telefone
                    FROM Pessoa
                    LEFT JOIN Funcionario ON Pessoa.id = Funcionario.pessoaId
                    WHERE Funcionario.id IS NULL;
                `
    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const pessoas = await query(sql) as Pessoa[];

        return pessoas;
    } 
    catch (error) {
        throw error;
    }
}

async function getPessoaIdByName(name: string): Promise<PessoaId> {
    const sql = 'SELECT id FROM Pessoa WHERE name = ?';
    const values = [name];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const pessoa = await query({ sql, values }) as PessoaId[];

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

export { insertNewPessoa, getPessoaById, getPessoaIdByName, getAllPessoas, getAllPessoasNotFuncionario, updatePessoaNome, updatePessoaEmail, updatePessoaTelefone, updatePessoaCep, deletePessoa };