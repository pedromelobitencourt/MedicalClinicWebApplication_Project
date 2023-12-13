import { getDB } from '../db';
import { promisify } from 'util';

type Agenda = {
    id?: number,
    data: Date,
    horario: string,
    name: string,
    email:string,
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

async function insertNewAgenda(agenda: Agenda): Promise<void> {
    const sql = 'INSERT INTO Agenda (data, horario, name,email,medicoID) VALUES (STR_TO_DATE(?, \'%Y-%m-%d %H:%i:%s\'), ?, ?,?,?)';

    const values = [new Date(agenda.data).toISOString().slice(0, 19).replace('T', ' '), agenda.horario, agenda.name, agenda.email, agenda.medicoID];

    console.log("valores que chegaram no controler da agenda",values);
    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        await query({ sql, values });
        console.log("Agenda inserida com sucesso!");
    } 
    catch (error) {
        console.error("Erro ao executar a query:", error);
        throw error;
    }
};
async function deleteAgendaById(id: number): Promise<void> {
    const sql = 'DELETE FROM Agenda WHERE id = ?';
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

export { getAllAgenda,getAgendaByMedicoId,insertNewAgenda,deleteAgendaById };