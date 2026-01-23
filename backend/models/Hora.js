import pool from '../config/db.js';

export class Hora {
    async getHoras() {
        return await pool.query('SELECT * FROM horas');
    }
}