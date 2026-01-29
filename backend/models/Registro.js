import pool from '../config/db.js';

export class Registro {
    async getRegistros() {
        return await pool.query('SELECT * FROM registros');
    }
    async getRegistroByEmail(email) {
        return await pool.query(`SELECT * 
                            FROM usuarios u
                            JOIN registros r ON u.id=r.usuario_id 
                            WHERE u.email=?`, [email]);
    }
    async insertRegistro(paquete, pago, token, usuario) {
        await pool.query('INSERT INTO registros (paquete_id,pago_id,token,usuario_id) VALUES (?,?,?,?)', [paquete, pago, token, usuario]);
    }

}