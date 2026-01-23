import pool from '../config/db.js';

export class Dia {
    async getDias() {
        return await pool.query('SELECT * FROM dias');
    }
}