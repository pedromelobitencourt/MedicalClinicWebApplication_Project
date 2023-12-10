import { getDB, insertNewAddress } from '../db';
import { RowDataPacket } from 'mysql2/promise';
import * as mysql from 'mysql';
import { Connection } from 'mysql'
import { promisify } from 'util';

type Prontuario = {
    anamnese: string,
    medicamentos: string,
    atestados: string
}

export async function getAllProntuarioRecords() {
    const sql = 'SELECT * FROM ProntuarioEletronico';
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
    const sql = `INSERT INTO ProntuarioEletronico (id, anamnese, medicamentos, atestados) VALUES
    (?, ?, ?, ?)`;
    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const greatestId = await getGreatestId();

        if(typeof(greatestId) === `number`) {
            const id = greatestId + 1;
            const values = [ id, prontuario.anamnese, prontuario.medicamentos, prontuario.atestados ];

            const response = await query({ sql });
            console.log("Registros listados com sucesso!");
            return response;
        }
        else throw new Error(`O ID não é um número`)
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