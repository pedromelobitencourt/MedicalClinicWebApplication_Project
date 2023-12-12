import { getDB } from '../db';
import { promisify } from 'util';

type Address = {
    cep: string,
    estado: string,
    cidade: string,
    bairro: string,
    logradouro: string
};

export async function insertNewAddress(address: Address): Promise<void> {
    const sql = 'INSERT INTO BaseDeEnderecos (cep, estado, cidade, bairro, logradouro) VALUES (?, ?, ?, ?, ?)';
    const values = [address.cep, address.estado, address.cidade, address.bairro, address.logradouro]; // Replace with your actual column names

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        await query({ sql, values });
        console.log("Endereço inserido com sucesso!");
    } 
    catch (error) {
        throw error;
    }
}

export async function getAllEnderecos()  {
    const sql = `SELECT * FROM BaseDeEnderecos;`;
    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);


        const enderecos = await query({ sql });
        console.log("Registros listados com sucesso!");
        console.log(enderecos);
        return enderecos;
    } 
    catch (error) {
        console.log("Pegou erro no getAllEnderecos");
        console.log(error);
        throw error;
    }
}

export async function getEnderecoByCep(cep: string): Promise<Address> {
    const sql = 'SELECT * FROM BaseDeEnderecos WHERE cep = ?';
    const values = [cep];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const endereco = await query({ sql, values }) as Address[];

        if (endereco.length > 0) {
            return endereco[0];
        } else {
            throw new Error("Endereço não encontrado");
        }
    } catch (error) {
        throw error;
    }
}

export async function deleteEnderecoByCep(cep: string) {
    const sql = `DELETE FROM BaseDeEnderecos WHERE cep LIKE ?`; 
    console.log(cep);
    const values = [cep];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const response = await query({ sql, values });
        console.log("Endereço deletado com sucesso!");
    } catch (error) {
        throw error;
    }
}