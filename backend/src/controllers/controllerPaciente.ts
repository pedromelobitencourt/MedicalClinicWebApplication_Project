import { getDB } from '../db';
import { promisify } from 'util';


type Pessoa = {
    id: number,
    nome: string,
    telefone: string,
    email: string,
    enderecoCep: number
};

type Paciente = {
    id: number,
    peso: number,
    altura: number,
    tipoSanguineo: string,
    pessoaId: number
};


async function insertNewPaciente(paciente: Paciente): Promise<void> {
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

async function getPacienteById(id: number): Promise<Paciente> {
    const sql = 'SELECT * FROM Paciente WHERE id = ?';
    const values = [id];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const paciente = await query({ sql, values });

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

async function getAllPacientes(): Promise<Paciente[]> {
    const sql = 'SELECT * FROM Paciente';

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const pacientes = await query({ sql });

        return pacientes;
    } 
    catch (error) {
        throw error;
    }
}

export {
    insertNewPaciente,
    getPacienteById,
    getAllPacientes
};