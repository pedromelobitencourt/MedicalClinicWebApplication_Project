import { getDB } from '../db';
import { promisify } from 'util';


// type Pessoa = {
//     id: number,
//     nome: string,
//     telefone: string,
//     email: string,
//     enderecoCep: number
// };

// type Funcionario = {
//     id: number,
//     dataContrato: Date,
//     salario: number,
//     pessoaId: number
// };

type Medico = {
    id?: number,
    crm: string,
    especialidade: string,
    funcionarioId: number
};

type MedicoName = {
    name: string
};

async function insertNewMedico(medico: Medico): Promise<void> {
    const sql = 'INSERT INTO Medico (crm, especialidade, funcionarioId) VALUES (?, ?, ?)';
    const values = [medico.crm, medico.especialidade, medico.funcionarioId]; // Replace with your actual column names

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        await query({ sql, values });
        console.log("Médico inserido com sucesso!");
    } 
    catch (error) {
        throw error;
    }
};

async function getMedicoById(id: number): Promise<Medico> {
    const sql = 'SELECT * FROM Medico WHERE id = ?';
    const values = [id];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const medico = await query({ sql, values }) as Medico[];

        if (medico.length > 0) {
            return medico[0];
        } else {
            throw new Error("Médico não encontrado");
        }
    } catch (error) {
        throw error;
    }
}

async function getAllMedicos() {
    const sql = `SELECT P.name AS nomeMedico, M.id, M.crm, M.especialidade
    FROM Medico M JOIN Funcionario F ON M.funcionarioId = F.id
    JOIN Pessoa P ON P.id=F.pessoaId;`;

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);
        
        const response = await query(sql);

        
        return response;
    } catch (error) {
        throw error;
    }
};

async function getMedicosByEspecialidade(especialidade: string) {
    const sql = 'SELECT * FROM Medico WHERE especialidade = ?';
    const values = [especialidade];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const response = await query({ sql, values });


        return response;
    } catch (error) {
        throw error;
    }
};

async function getMedicoNameById(id: number) {
    const sql = `SELECT P.name AS nomeMedico
                FROM Medico M JOIN Funcionario F ON M.funcionarioId = F.id
                JOIN Pessoa P ON P.id=F.pessoaId
                WHERE M.id = ?;`
    const values = [ id ];
    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const response = await query({ sql, values });
        return response;
    }
    catch (error) {
        throw error;
    }
}


async function getMedicosNamesByEspecialidade(especialidade: string) {
    //const sql = 'SELECT * FROM Medico WHERE especialidade = ?';
    const sql = 'select Medico.id, Medico.crm, Medico.especialidade, Medico.funcionarioID, Pessoa.name from Medico inner join Funcionario on Medico.funcionarioId = Funcionario.id inner join Pessoa on Funcionario.pessoaID = Pessoa.id WHERE especialidade = ?';
    const values = [especialidade];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);
        console.log("oioioioiioshouyo9099999")

        const response = await query({ sql, values });


        console.log("Lista retornada com sucesso");
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
}

async function deleteMedico(id: number): Promise<void> {
    const sql = 'DELETE FROM Medico WHERE id = ?';
    const values = [id];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        await query({ sql, values });
    } catch (error) {
        throw error;
    }
}
async function getMedicoIdByFuncionarioId(id: number) {
    const sql = `SELECT M.id AS idMedico
                FROM Medico M JOIN Funcionario F ON M.funcionarioId = F.id
                WHERE F.id = ?;`
    const values = [ id ];
    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const response = await query({ sql, values });
        return response;
    }
    catch (error) {
        throw error;
    }
}

export { insertNewMedico, getMedicoById, getAllMedicos, getMedicosByEspecialidade, getMedicosNamesByEspecialidade, getMedicoNameById, getMedicoIdByFuncionarioId, deleteMedico }
