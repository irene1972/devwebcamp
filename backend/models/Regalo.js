import pool from '../config/db.js';

export class Regalo {
    async getRegalos() {
        return await pool.query('SELECT * FROM regalos');
    }

}