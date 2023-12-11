import { getDB, insertNewAddress } from '../db';
import { RowDataPacket } from 'mysql2/promise';
import * as mysql from 'mysql';
import { Connection } from 'mysql'
import { promisify } from 'util';

type Prontuario = {
    id: number,
    anamnese: string,
    medicamentos: string,
    atestados: string,
    nome?: string
}

export async function getAllProntuarioRecords() {
    const sql = `
    SELECT ProntuarioEletronico.id, 
           ProntuarioEletronico.anamnese, 
           ProntuarioEletronico.medicamentos, 
           ProntuarioEletronico.atestados, 
           Pessoa.name
    FROM ProntuarioEletronico
    JOIN Paciente ON ProntuarioEletronico.pacienteId = Paciente.id
    JOIN Pessoa ON Pessoa.id = Paciente.pessoaId
    ORDER BY ProntuarioEletronico.id;
`;

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

export async function insertNewProtuarioRecord(prontuario: Prontuario) {
    const sql = `INSERT INTO ProntuarioEletronico (id, anamnese, medicamentos, atestados, pacienteId) VALUES
    (?, ?, ?, ?, ?)`;
    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const greatestId = await getGreatestId();

        if(typeof(greatestId) === `number`) {
            const id = greatestId + 1;
            const values = [ id, prontuario.anamnese, prontuario.medicamentos, prontuario.atestados, prontuario.id ];

            const response = await query({ sql, values });
            console.log("Registro inserido com sucesso!");
            return response;
        }
        else {
            throw new Error(`O ID não é um número`)
        }
    } 
    catch (error) {
        throw error;
    }
}

async function getGreatestId(): Promise<number | undefined> {
    const sql = 'SELECT MAX(id) AS max_id FROM ProntuarioEletronico;';

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const [result] = await query({ sql }) as RowDataPacket[];
        
        if (result && typeof result.max_id === 'number') {
            console.log("Obtido o maior id");
            return result.max_id;
        } else {
            console.error("Erro ao obter o maior id");
            return undefined;
        }
    } 
    catch (error) {
        throw error;
    }
}

export async function getDataFromId(id: number) {
    const sql = 'SELECT * FROM ProntuarioEletronico WHERE id = ?;';
    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);
        const values = [id];

        // Use a dica de tipo com 'as' para informar ao TypeScript sobre o tipo esperado
        const response = await query({ sql, values }) as Prontuario[];
        
        
        // Se houver pelo menos um resultado
        if (response.length > 0) {
            return response;
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