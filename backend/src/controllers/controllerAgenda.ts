import { getDB } from '../db';
import { promisify } from 'util';

type Agenda = {
    id?: number,
    date: Date,
    horario: string,
    name: string,
    email:string,
    telefone:string,
    medicoID: number
};

async function getAgendaByMedicoId(id: number){
    const sql = 'select * from agenda where medicoId = ?';
    const values = [id];

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

async function getAllAgenda(){
    const sql = 'select * from agenda';
    

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);
        
        const response = await query(sql);

        
        return response;


    } catch (error) {
        throw error;
    }
}

export { getAllAgenda,getAgendaByMedicoId };