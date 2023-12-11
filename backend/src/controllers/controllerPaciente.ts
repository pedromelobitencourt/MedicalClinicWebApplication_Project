import { getDB, insertNewAddress } from '../db';
import * as mysql from 'mysql';
import { Connection } from 'mysql'
import { promisify } from 'util';

type Paciente = {
    id: number,
    peso: number,
    altura: number
    tipoSanguineo: string
    pessoaId: number
}

type PacienteIdResult = { id: number };
type PacienteNameResult = { nome: string };

async function getAllPacienteRecords() {
    const sql = 'SELECT * FROM Paciente';
    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const response = await query({ sql });
        console.log("Registros listados com sucesso!");
        return response;
    } 
    catch (error) {
        throw error;
    }
}

export async function getAllPacientNames() {
    const sql = 'SELECT name, Paciente.id FROM (Paciente JOIN Pessoa ON Paciente.pessoaId = Pessoa.id)';
    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const response = await query({ sql });
        console.log("Nomes dos pacientes listados com sucesso!", response);
        return response;
    } 
    catch (error) {
        throw error;
    }
}

export async function getIdFromName(name: string): Promise<PacienteIdResult | undefined> {
    const sql = 'SELECT Paciente.id FROM (Paciente JOIN Pessoa ON Paciente.pessoaId = Pessoa.id) WHERE Pessoa.name = ?';
    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);
        const values = [name];

        // Use a dica de tipo com 'as' para informar ao TypeScript sobre o tipo esperado
        const response = await query({ sql, values }) as PacienteIdResult[];
        
        
        // Se houver pelo menos um resultado
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
    } catch (error) {
        throw error;
    }

    // Adicione uma declaração de retorno ao final da função
    return undefined;
}

export async function getNameFromId(id: number): Promise<PacienteNameResult | undefined> {
    const sql = 'SELECT Pessoa.name FROM (Paciente JOIN Pessoa ON Paciente.pessoaId = Pessoa.id) WHERE Paciente.id = ?';
    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);
        const values = [id];

        // Use a dica de tipo com 'as' para informar ao TypeScript sobre o tipo esperado
        const response = await query({ sql, values }) as PacienteNameResult[];
        
        // Se houver pelo menos um resultado
        if (response.length > 0) {
            if ('name' in response[0]) {
                const nome = response[0].name as string;
                return { nome }; // Retorna um objeto com a propriedade 'id'
            } else {
                console.error("Propriedade 'name' não encontrada no objeto de resposta.");
            }
        } else {
            console.error("Nenhum resultado encontrado.");
            return undefined;
        }
    } catch (error) {
        throw error;
    }

    // Adicione uma declaração de retorno ao final da função
    return undefined;
}