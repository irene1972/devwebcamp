import pool from '../config/db.js';

export class Registro {
    async getRegistros() {
        return await pool.query('SELECT * FROM registros');
    }
    async getRegistroByEmail(email) {
        const PAQUETE_GRATUITO=3;
        return await pool.query(`SELECT u.*,r.id as registro_id, r.paquete_id,r.pago_id,r.token,r.usuario_id,r.regalo_id  
                            FROM usuarios u
                            JOIN registros r ON u.id=r.usuario_id 
                            WHERE u.email=? AND r.paquete_id=?`, [email,PAQUETE_GRATUITO]);
    }
    async insertRegistro(paquete, pago, token, usuario) {
        await pool.query('INSERT INTO registros (paquete_id,pago_id,token,usuario_id) VALUES (?,?,?,?)', [paquete, pago, token, usuario]);
    }

}