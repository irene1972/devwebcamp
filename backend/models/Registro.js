import pool from '../config/db.js';

export class Registro {
    async getRegistros() {
        return await pool.query('SELECT * FROM registros');
    }
    async insertRegistro(){
        await pool.query('INSERT INTO registros (paquete_id,pago_id,token,usuario_id) VALUES (?,?,?,?)',[paquete,pago,token,usuario]);
    }
}