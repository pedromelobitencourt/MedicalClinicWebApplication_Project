import { getDB } from '../db';
import { promisify } from 'util';


type Funcionario = {
    id?: number,
    dataContrato: Date,
    salario: number,
    senha: string,
    pessoaId: number
};

type FuncionarioId = {
    id: number
}
type FuncionarioName = {
    name: string
}

interface PasswordRetrievalResult {
    senha: string;
}

async function insertNewFuncionario(funcionario: Funcionario): Promise<void> {
    const sql = 'INSERT INTO Funcionario (dataContrato, salario, pessoaId, senha) VALUES (?, ?, ?, ?)';
    const values = [funcionario.dataContrato, funcionario.salario, funcionario.pessoaId, funcionario.senha]; // Replace with your actual column names

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

        const funcionario = await query({ sql, values }) as Funcionario[];

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

        const funcionarios = await query(sql) as Funcionario[];

        return funcionarios;
    }
    catch (error) {
        throw error;
    }
}

async function getAllFuncionariosWithName(): Promise<Funcionario[]> {
    const sql = "SELECT Funcionario.id, Funcionario.dataContrato, Funcionario.salario, Pessoa.name, Pessoa.id as 'pessoaId' FROM Funcionario JOIN Pessoa ON Funcionario.pessoaId=Pessoa.id;";

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const funcionarios = await query(sql) as Funcionario[];

        return funcionarios;
    }
    catch (error) {
        throw error;
    }
}

async function getFuncionarioIdByName(name: string): Promise<FuncionarioId | undefined> {
    const sql = "SELECT Funcionario.id FROM Funcionario JOIN Pessoa ON Funcionario.pessoaId=Pessoa.id WHERE Pessoa.name = ?;";

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);
        const values = [ name ];

        const response = await query({ sql, values }) as FuncionarioId[];

        if (response.length > 0) {
            if ('id' in response[0]) {
                const id = response[0].id;
                return { id }; // Retorna um objeto com a propriedade 'id'
            } else {
                console.error("Propriedade 'id' não encontrada no objeto de resposta.");
            }
        } else {
            console.error("Nenhum resultado encontrado.");
            return undefined;
        }
    }
    catch (error) {
        throw error;
    }
}

async function getFuncionarioNameFromId(id: number): Promise<FuncionarioName | undefined> {
    const sql = "SELECT Pessoa.name FROM Funcionario JOIN Pessoa ON Funcionario.pessoaId=Pessoa.id WHERE Funcionario.id = ?;";

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);
        const values = [ id ];

        const response = await query({ sql, values }) as FuncionarioName[];

        if (response.length > 0) {
            if ('name' in response[0]) {
                const name = response[0].name;
                return { name }; // Retorna um objeto com a propriedade 'id'
            } else {
                console.error("Propriedade 'id' não encontrada no objeto de resposta.");
            }
        } else {
            console.error("Nenhum resultado encontrado.");
            return undefined;
        }
    }
    catch (error) {
        throw error;
    }
}

async function getFuncionarioSenhaByEmail(email: string) {
    const sql = 'SELECT F.senha FROM Funcionario F JOIN Pessoa P ON F.pessoaId = P.id WHERE P.email = ?';
    const values = [email];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const result: PasswordRetrievalResult[] = await query({ sql, values }) as PasswordRetrievalResult[];

        if (result.length > 0) {
            return result[0].senha;
        } else {
            return null; // E-mail não encontrado
        }
    } catch (error) {
        throw error;
    } 
}

async function getFuncionarioIdByEmail(email: string) {
    const sql = 'SELECT F.id FROM Funcionario F JOIN Pessoa P ON F.pessoaId = P.id WHERE P.email = ?';
    const values = [email];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const result: PasswordRetrievalResult[] = await query({ sql, values }) as PasswordRetrievalResult[];

        if (result.length > 0) {
            return result[0].senha;
        } else {
            return null; // E-mail não encontrado
        }
    } catch (error) {
        throw error;
    } 
}

async function updateSalarioFuncionario(id: number, salario: number) {
    const sql = `UPDATE Funcionario
                    SET salario = ?
                    WHERE id = ?;
                `;
    const values = [ salario, id ];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const response = await query({ sql, values });
        return response;
    } catch (error) {
        throw error;
    }
}

async function updateDataContratoFuncionario(id: number, dataContrato: string) {
    const sql = `UPDATE Funcionario
                    SET dataContrato = ?
                    WHERE id = ?;
                `;
    const values = [ dataContrato, id ];
    
    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const response = await query({ sql, values });
        return response;
    } catch (error) {
        throw error;
    }
}

async function updateSenhaFuncionario(id: number, senha: string) {
    const sql = `UPDATE Funcionario
                    SET senha = ?
                    WHERE id = ?;
                `;
    const values = [ senha, id ];
    
    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const response = await query({ sql, values });
        return response;
    } catch (error) {
        throw error;
    }
}

async function deleteFuncionario(id: number): Promise<void> {
    const sql = 'DELETE FROM Funcionario WHERE id = ?';
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

export { insertNewFuncionario, getFuncionarioById, getAllFuncionarios, getAllFuncionariosWithName, getFuncionarioIdByName, getFuncionarioNameFromId, getFuncionarioSenhaByEmail, getFuncionarioIdByEmail, updateSalarioFuncionario, updateDataContratoFuncionario, updateSenhaFuncionario, deleteFuncionario };