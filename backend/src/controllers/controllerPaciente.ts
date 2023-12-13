import { getDB } from '../db';
import * as mysql from 'mysql';
import { Connection } from 'mysql'
import { promisify } from 'util';

type Paciente = {
    id?: number,
    peso: number,
    altura: number
    tipoSanguineo: string
    pessoaId: number
}

type PacienteIdResult = { id: number };

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

export async function insertNewPaciente(paciente: Paciente): Promise<void> {
    const sql = 'INSERT INTO Paciente (peso, altura, tipoSanguineo, pessoaId) VALUES (?, ?, ?, ?)';
    const values = [paciente.peso, paciente.altura, paciente.tipoSanguineo, paciente.pessoaId]; // Replace with your actual column names

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        await query({ sql, values });
        console.log("Paciente inserido com sucesso!");
    } 
    catch (error) {
        throw error;
    }
}

export async function getAllPacientes(): Promise<Paciente[] | undefined> {
    const sql = 'SELECT name, Paciente.id, Paciente.peso, Paciente.altura, Paciente.tipoSanguineo FROM (Paciente JOIN Pessoa ON Paciente.pessoaId = Pessoa.id)';

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const pacientes = await query({ sql }) as Paciente[];

        if(pacientes) {
            if(pacientes.length > 0) {
                return pacientes;
            } 
            return undefined;
        }
    } 
    catch (error) {
        throw error;
    }
}

export async function deletePaciente (id: number): Promise<void> {
    const sql = 'DELETE FROM Paciente WHERE id = ?';
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

export async function getPacienteById(id: number) {
    const sql = 'SELECT name, Paciente.id, Paciente.peso, Paciente.altura, Paciente.tipoSanguineo FROM (Paciente JOIN Pessoa ON Paciente.pessoaId = Pessoa.id) WHERE Paciente.id = ?';
    const values = [id];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const paciente = await query({ sql, values }) as Paciente[];

        if (paciente.length > 0) {
            return paciente[0];
        } else {
            throw new Error("Paciente não encontrado");
        }
    } 
    catch (error) {
        throw error;
    }
}


export async function updatePaciente (peso: number, altura: number, tipoSanguineo: string, id: number ): Promise<void> {
    const sql = 'UPDATE Paciente SET peso = ?, altura = ?, tipoSanguineo = ? WHERE id = ?';
    const values = [peso, altura, tipoSanguineo, id];

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

// export async function getNameFromId(id: number): Promise<PacienteNameResult | undefined> {
//     const sql = 'SELECT Pessoa.name FROM (Paciente JOIN Pessoa ON Paciente.pessoaId = Pessoa.id) WHERE Paciente.id = ?';
//     let connection;

//     try {
//         connection = await getDB();
//         const query = promisify(connection.query).bind(connection);
//         const values = [id];

//         // Use a dica de tipo com 'as' para informar ao TypeScript sobre o tipo esperado
//         const response = await query({ sql, values }) as PacienteNameResult[];
        
//         // Se houver pelo menos um resultado
//         if (response.length > 0) {
//             if ('name' in response[0]) {
//                 const nome = response[0].name as string;
//                 return { nome }; // Retorna um objeto com a propriedade 'id'
//             } else {
//                 console.error("Propriedade 'name' não encontrada no objeto de resposta.");
//             }
//         } else {
//             console.error("Nenhum resultado encontrado.");
//             return undefined;
//         }
//     } catch (error) {
//         throw error;
//     }

//     // Adicione uma declaração de retorno ao final da função
//     return undefined;
// }
