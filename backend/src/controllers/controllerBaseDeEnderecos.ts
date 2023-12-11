import { getDB } from '../db';
import * as mysql from 'mysql';
import { Connection } from 'mysql'
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