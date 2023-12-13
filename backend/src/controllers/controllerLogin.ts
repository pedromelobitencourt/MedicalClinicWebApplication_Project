import { getDB } from '../db';
import { promisify } from 'util';
import { getFuncionarioSenhaByEmail } from './controllerFuncionario';

type Login = {
    email: string,
    senha: string,
};

interface EmailCheckResult {
    count: number;
}

class LoginError extends Error {
    code: string;

    constructor(message: string, code: string) {
        super(message);
        this.name = 'CustomError';
        this.code = code;
    }
}

async function emailExists(email: string): Promise<boolean> {
    const sql = 'SELECT COUNT(*) AS count FROM Pessoa WHERE email = ?';
    const values = [email];

    let connection;

    try {
        connection = await getDB();
        const query = promisify(connection.query).bind(connection);

        const result: EmailCheckResult[] = await query({ sql, values }) as EmailCheckResult[];
        const count = result[0].count;

        return count > 0;
    } catch (error) {
        throw error;
    }
}

export async function validateLogin(email: string, senha: string) {
    const emailExistsResponse = await emailExists(email);

    if(emailExistsResponse) {
        const realSenha = await getFuncionarioSenhaByEmail(email);

        if(realSenha === senha) {
            return { email, senha, validate: true };
        }
        else {
            throw new LoginError('Senha inválida', 'WRONG_PASSWORD');
        }
    }
    else {
        throw new LoginError('O email digitado não existe', 'NON_EXISTENT-EMAIL');
    }
}