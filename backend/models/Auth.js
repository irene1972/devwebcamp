import pool from '../config/db.js';

export class Auth {

    async getEmailByEmail(email){
        return await pool.query('SELECT email FROM usuarios WHERE email=?', [email]);
    }

    async getUserByEmail(email) {
        return await pool.query('SELECT * FROM usuarios WHERE email=?', [email]);
    }

    async getUserByToken(token){
        return await pool.query('SELECT * FROM usuarios WHERE token=?',[token]);
    }

    async updateTokenByEmail(token,email){
        await pool.query('UPDATE usuarios SET token=? WHERE email=?',[token,email]);
    }

    async updateConfirmadoAndTokenByEmail(email){
        return await pool.query('UPDATE usuarios SET confirmado=1,token="" WHERE email=?', [email])
    }

    async updatePasswordAndTokenByEmail(nuevoPasswordEncriptado, email){
        pool.query('UPDATE usuarios SET password=?,token="" WHERE email=?', [nuevoPasswordEncriptado, email]);
    }

    async insertUser(nombre, apellido, email, passwordEncriptado, token){
        return await pool.query('INSERT INTO usuarios (nombre,apellido,email,password,confirmado,token) VALUES (?,?,?,?,0,?)', [nombre, apellido, email, passwordEncriptado, token]);
    }
    

}